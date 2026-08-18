<?php

namespace App\Http\Controllers;

use App\Models\Generation;
use App\Services\DeepSeekService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductGeneratorController extends Controller
{
    /**
     * Display the main generator app.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        $history = $user ? $user->generations()->take(20)->get() : [];

        return Inertia::render('Dashboard', [
            'tokensBalance' => $user ? $user->tokens_balance : 0,
            'initialHistory' => $history,
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

        // Authenticated User Production Generation: Checks balance, calls Live DeepSeek API, and charges 1 token
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

        return response()->json([
            'success' => true,
            'is_demo' => false,
            'generation' => $generation,
            'tokens_balance' => $user->fresh()->tokens_balance,
        ]);
    }

    /**
     * Fetch user generation history.
     */
    public function history(Request $request): JsonResponse
    {
        $user = $request->user();
        $history = $user ? $user->generations()->take(50)->get() : [];

        return response()->json([
            'history' => $history,
        ]);
    }

    /**
     * Top up user tokens (1€ per drop pricing model).
     */
    public function buyTokens(Request $request): JsonResponse
    {
        $amount = (int) $request->input('amount', 500);
        if (!in_array($amount, [100, 250, 500, 1000, 1500])) {
            $amount = 500;
        }

        $user = $request->user();

        if ($user) {
            $user->increment('tokens_balance', $amount);
            $newBalance = $user->fresh()->tokens_balance;
        } else {
            $newBalance = $amount;
        }

        return response()->json([
            'success' => true,
            'message' => "Successfully added +{$amount} Drops to your balance (€{$amount})!",
            'tokens_balance' => $newBalance,
        ]);
    }
}
