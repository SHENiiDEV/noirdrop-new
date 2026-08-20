<?php

namespace App\Http\Controllers;

use App\Mail\DocumentPaymentMail;
use App\Mail\WalletTopUpMail;
use App\Models\Generation;
use App\Models\Payment;
use App\Services\DeepSeekService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class ProductGeneratorController extends Controller
{
    /**
     * Display the main generator app with history and payments.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        $history = $user ? $user->generations()->take(20)->get() : [];
        $payments = $user ? $user->payments()->take(30)->get() : [];

        return Inertia::render('Dashboard', [
            'tokensBalance' => $user ? $user->tokens_balance : 0,
            'initialHistory' => $history,
            'payments' => $payments,
        ]);
    }

    /**
     * Generate product copy from prompt.
     */
    public function generate(Request $request, DeepSeekService $deepSeekService): JsonResponse
    {
        $request->validate([
            'input_prompt' => 'required|string|min:3|max:3000',
            'is_demo' => 'nullable|boolean',
        ]);

        $user = $request->user();
        $isDemo = $request->boolean('is_demo') || !$user;

        $inputPrompt = $request->input('input_prompt');

        // Sandbox #demo Mode: Uses instant fallback mock generator without token deduction
        if ($isDemo) {
            $drop = $deepSeekService->generateMockDrop($inputPrompt);
            return response()->json([
                'success' => true,
                'is_demo' => true,
                'generation' => [
                    'id' => null,
                    'user_id' => null,
                    'input_prompt' => $inputPrompt,
                    'seo_title' => $drop['title'],
                    'description' => $drop['description'],
                    'features_json' => $drop['bullets'],
                    'social_copy' => $drop['social_post'],
                    'created_at' => now()->toIso8601String(),
                ],
                'tokens_balance' => $user ? $user->tokens_balance : 0,
            ]);
        }

        // Authenticated User Production Generation: Checks balance, calls Live DeepSeek API, charges 1 token, logs payment, sends invoice mail
        if ($user->tokens_balance <= 0) {
            return response()->json([
                'error' => 'You have run out of Drop tokens. Please top up to generate more products.',
                'code' => 'OUT_OF_TOKENS',
            ], 402);
        }

        $drop = $deepSeekService->generateProductDrop($inputPrompt);

        $generation = Generation::create([
            'user_id' => $user->id,
            'input_prompt' => $inputPrompt,
            'seo_title' => $drop['title'],
            'description' => $drop['description'],
            'features_json' => $drop['bullets'],
            'social_copy' => $drop['social_post'],
        ]);

        $user->decrement('tokens_balance');
        $newBalance = $user->fresh()->tokens_balance;

        // Record financial transaction for B2B PDF invoice
        $payment = Payment::create([
            'user_id' => $user->id,
            'type' => 'generation',
            'service_name' => '1-Click Product Copy Generation',
            'amount' => 1.00,
            'currency' => 'EUR',
            'gateway_reference' => 'DROP-' . strtoupper(Str::random(8)),
            'status' => 'paid',
            'tokens_added' => 0,
            'tokens_balance_after' => $newBalance,
        ]);

        // Dispatch email notification with PDF invoice attachment
        try {
            Mail::to($user->email)->send(new DocumentPaymentMail($user, $payment));
        } catch (\Throwable $e) {
            Log::warning('DocumentPaymentMail dispatch failed: ' . $e->getMessage());
        }

        return response()->json([
            'success' => true,
            'is_demo' => false,
            'generation' => $generation,
            'payment' => $payment,
            'tokens_balance' => $newBalance,
        ]);
    }

    /**
     * Fetch user generation history & payment transactions.
     */
    public function history(Request $request): JsonResponse
    {
        $user = $request->user();
        $history = $user ? $user->generations()->take(50)->get() : [];
        $payments = $user ? $user->payments()->take(50)->get() : [];

        return response()->json([
            'history' => $history,
            'payments' => $payments,
        ]);
    }

    /**
     * Top up user tokens (1€ per drop pricing model) & dispatch PDF invoice mail.
     */
    public function buyTokens(Request $request): JsonResponse
    {
        $amount = (int) $request->input('amount', 500);
        if (!in_array($amount, [100, 250, 500, 1000, 1500])) {
            $amount = 500;
        }

        $packageNames = [
            100 => 'Starter Pack (100 Drops)',
            250 => 'Growth Pack (250 Drops)',
            500 => 'Pro Merchant Pack (500 Drops)',
            1000 => 'Scale Suite (1,000 Drops)',
            1500 => 'Enterprise Suite (1,500 Drops)',
        ];

        $user = $request->user();

        if ($user) {
            $user->increment('tokens_balance', $amount);
            $newBalance = $user->fresh()->tokens_balance;

            $payment = Payment::create([
                'user_id' => $user->id,
                'type' => 'topup',
                'service_name' => $packageNames[$amount] ?? "Digital Credit Top-Up ({$amount} Drops)",
                'amount' => (float) $amount,
                'currency' => 'EUR',
                'gateway_reference' => 'TOPUP-' . strtoupper(Str::random(8)),
                'status' => 'paid',
                'tokens_added' => $amount,
                'tokens_balance_after' => $newBalance,
            ]);

            try {
                Mail::to($user->email)->send(new WalletTopUpMail($user, $payment));
            } catch (\Throwable $e) {
                Log::warning('WalletTopUpMail dispatch failed: ' . $e->getMessage());
            }
        } else {
            $newBalance = $amount;
        }

        return response()->json([
            'success' => true,
            'message' => "Successfully added +{$amount} Drops to your balance (€{$amount})!",
            'tokens_balance' => $newBalance,
        ]);
    }

    /**
     * Download official B2B PDF tax invoice for a payment transaction.
     */
    public function downloadInvoice(Request $request, Payment $payment): SymfonyResponse
    {
        $user = $request->user();

        abort_if(!$user || ($payment->user_id !== $user->id && !($user->is_admin ?? false)), 403, 'Unauthorized access to invoice document.');

        $pdf = Pdf::loadView('pdf.wallet_invoice', [
            'payment' => $payment,
            'user' => $payment->user,
        ]);

        $invoiceRef = $payment->gateway_reference ?: ('INV-' . $payment->id);

        return $pdf->download("Invoice_{$invoiceRef}.pdf");
    }
}
