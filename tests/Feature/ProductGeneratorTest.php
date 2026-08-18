<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductGeneratorTest extends TestCase
{
    use RefreshDatabase;

    public function test_new_user_starts_with_zero_tokens(): void
    {
        $user = User::factory()->create();

        $this->assertEquals(0, $user->tokens_balance);
    }

    public function test_user_can_access_dashboard(): void
    {
        $user = User::factory()->create(['tokens_balance' => 10]);

        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertStatus(200);
    }

    public function test_user_can_generate_product_drop(): void
    {
        $user = User::factory()->create(['tokens_balance' => 10]);

        $response = $this->actingAs($user)->postJson('/generate', [
            'input_prompt' => 'Minimalist Leather Cardholder Wallet',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'tokens_balance' => 9,
            ]);

        $this->assertDatabaseHas('generations', [
            'user_id' => $user->id,
            'input_prompt' => 'Minimalist Leather Cardholder Wallet',
        ]);

        $this->assertEquals(9, $user->fresh()->tokens_balance);
    }

    public function test_out_of_tokens_prevents_generation(): void
    {
        $user = User::factory()->create(['tokens_balance' => 0]);

        $response = $this->actingAs($user)->postJson('/generate', [
            'input_prompt' => 'Wireless Noise Canceling Headphones',
        ]);

        $response->assertStatus(402)
            ->assertJson(['code' => 'OUT_OF_TOKENS']);
    }

    public function test_user_can_top_up_tokens(): void
    {
        $user = User::factory()->create(['tokens_balance' => 2]);

        $response = $this->actingAs($user)->postJson('/buy-tokens', [
            'amount' => 100,
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'tokens_balance' => 102,
            ]);

        $this->assertEquals(102, $user->fresh()->tokens_balance);
    }
}
