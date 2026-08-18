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
        ]);

        $user = $request->user();

        if ($user && $user->tokens_balance <= 0) {
            return response()->json([
                'error' => 'You have run out of Drop tokens. Please top up to generate more products.',
                'code' => 'OUT_OF_TOKENS',
            ], 402);
        }

        $inputPrompt = $request->input('input_prompt');
        $drop = $deepSeekService->generateProductDrop($inputPrompt);

        $generation = Generation::create([
            'user_id' => $user?->id,
            'input_prompt' => $inputPrompt,
            'seo_title' => $drop['title'],
            'description' => $drop['description'],
            'features_json' => $drop['bullets'],
            'social_copy' => $drop['social_post'],
        ]);

        $newBalance = $user ? $user->tokens_balance : 0;

        if ($user) {
            $user->decrement('tokens_balance');
            $newBalance = $user->fresh()->tokens_balance;
        }

        return response()->json([
            'success' => true,
            'generation' => $generation,
            'tokens_balance' => $newBalance,
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
