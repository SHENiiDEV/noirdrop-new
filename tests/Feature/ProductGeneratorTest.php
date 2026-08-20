<?php

namespace Tests\Feature;

use App\Models\Payment;
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

        $this->assertDatabaseHas('payments', [
            'user_id' => $user->id,
            'type' => 'generation',
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

        $this->assertDatabaseHas('payments', [
            'user_id' => $user->id,
            'type' => 'topup',
            'amount' => 100.00,
        ]);

        $this->assertEquals(102, $user->fresh()->tokens_balance);
    }

    public function test_user_can_download_own_invoice(): void
    {
        $user = User::factory()->create();
        $payment = Payment::create([
            'user_id' => $user->id,
            'type' => 'topup',
            'service_name' => 'Starter Pack (100 Drops)',
            'amount' => 100.00,
            'currency' => 'EUR',
            'gateway_reference' => 'TOPUP-TEST1234',
            'status' => 'paid',
            'tokens_added' => 100,
            'tokens_balance_after' => 100,
        ]);

        $response = $this->actingAs($user)->get("/wallet/invoice/{$payment->id}");

        $response->assertStatus(200)
            ->assertHeader('content-type', 'application/pdf');
    }

    public function test_user_cannot_download_other_users_invoice(): void
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();

        $payment = Payment::create([
            'user_id' => $user1->id,
            'type' => 'topup',
            'service_name' => 'Starter Pack (100 Drops)',
            'amount' => 100.00,
            'currency' => 'EUR',
            'gateway_reference' => 'TOPUP-SECRET123',
            'status' => 'paid',
            'tokens_added' => 100,
            'tokens_balance_after' => 100,
        ]);

        $response = $this->actingAs($user2)->get("/wallet/invoice/{$payment->id}");

        $response->assertStatus(403);
    }
}
