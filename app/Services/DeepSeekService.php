<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class DeepSeekService
{
    protected string $apiKey;
    protected string $baseUrl;

    public function __construct()
    {
        $this->apiKey = config('services.deepseek.key', env('DEEPSEEK_API_KEY', ''));
        $this->baseUrl = config('services.deepseek.url', env('DEEPSEEK_API_URL', 'https://api.deepseek.com/chat/completions'));
    }

    /**
     * Generate product copy from raw input string.
     *
     * @param string $inputPrompt
     * @return array{title: string, description: string, bullets: array<int, string>, social_post: string}
     */
    public function generateProductDrop(string $inputPrompt): array
    {
        if (empty($this->apiKey)) {
            Log::info('DeepSeek API key missing, utilizing mock generation.');
            return $this->generateMockDrop($inputPrompt);
        }

        $systemPrompt = <<<PROMPT
You are an elite e-commerce B2B copywriter and storytelling expert.
The user provides raw product information (title, specifications, SKU, or manufacturer notes).

Your job is to generate high-converting e-commerce product copy.
Respond ONLY with a valid JSON object matching this exact schema (no markdown wrap, no markdown codeblocks, just raw JSON):

{
  "title": "SEO Optimized Product Title (max 180 characters, captivating and keyword rich)",
  "description": "<p>Paragraph 1: Atmospheric storytelling introduction capturing emotion and pain points.</p><p>Paragraph 2: Detailed specifications breakdown highlighting premium build, key tech, and materials with <b>bold callouts</b>.</p><p>Paragraph 3: Compelling closing call-to-action urging purchase.</p>",
  "bullets": [
    "Key Feature 1: Clear, tangible benefit statement",
    "Key Feature 2: Highlighting quality or precision engineering",
    "Key Feature 3: Performance, compatibility or luxury detail",
    "Key Feature 4: Guarantee or versatile usage scenario"
  ],
  "social_post": "Engaging, high-converting Instagram & TikTok caption with emojis and relevant hashtags."
}
PROMPT;

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/json',
            ])
            ->timeout(30)
            ->post($this->baseUrl, [
                'model' => 'deepseek-chat',
                'messages' => [
                    ['role' => 'system', 'content' => $systemPrompt],
                    ['role' => 'user', 'content' => "Product input: " . $inputPrompt],
                ],
                'temperature' => 0.7,
                'response_format' => ['type' => 'json_object'],
            ]);

            if ($response->successful()) {
                $content = $response->json('choices.0.message.content');
                $parsed = json_decode($content, true);
                if (is_array($parsed) && isset($parsed['title'], $parsed['description'], $parsed['bullets'], $parsed['social_post'])) {
                    return [
                        'title' => (string) $parsed['title'],
                        'description' => (string) $parsed['description'],
                        'bullets' => (array) $parsed['bullets'],
                        'social_post' => (string) $parsed['social_post'],
                    ];
                }
            }

            Log::warning('DeepSeek API returned non-JSON response or HTTP error: ' . $response->body());
        } catch (\Throwable $e) {
            Log::error('DeepSeek API connection exception: ' . $e->getMessage());
        }

        return $this->generateMockDrop($inputPrompt);
    }

    /**
     * Fallback mockup generator for sandbox/demo testing.
     */
    public function generateMockDrop(string $inputPrompt): array
    {
        $cleanPrompt = trim($inputPrompt);
        $titleSeed = mb_strlen($cleanPrompt) > 40 ? mb_substr($cleanPrompt, 0, 40) . '...' : $cleanPrompt;

        return [
            'title' => "Masterpiece Edition: " . ucwords($titleSeed) . " — Premium Craftsmanship & Precision Engineering",
            'description' => "<p>Immerse yourself in the extraordinary with <b>" . e($titleSeed) . "</b>. Designed for connoisseurs of fine design and uncompromising fidelity, this item elevates your daily routine into a curated aesthetic experience.</p><p>Forged with state-of-the-art materials and engineered for maximum durability, every surface reflects meticulous attention to detail. Experience <b>unrivaled tactile satisfaction</b> and effortless operation, tested under rigorous quality control standards.</p><p>Elevate your collection today. Order now to secure your piece of timeless innovation with complimentary express delivery and lifetime warranty backing.</p>",
            'bullets' => [
                "Premium Materials: Built from aerospace-grade alloy & high-density finishes for long-lasting performance.",
                "Ergonomic Precision: Custom-engineered profile ensuring seamless intuitive handling and comfort.",
                "Versatile Compatibility: Works out-of-the-box with all standard setups and modern accessories.",
                "Signature Aesthetics: Ultra-minimalist matte black finish with laser-etched detailing."
            ],
            'social_post' => "Unboxing pure perfection. ✨ The all-new " . $titleSeed . " is finally here to upgrade your setup. Tactile, sleek, and timeless. Which detail is your favorite? 👇\n\nShop the official collection now via link in bio! 📦🚀\n\n#Ecommerce #ProductDrop #LuxuryDesign #TechEssentials #Noirdrop #Unboxing",
        ];
    }
}
