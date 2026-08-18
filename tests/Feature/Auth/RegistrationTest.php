<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_screen_can_be_rendered(): void
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
    }

    public function test_new_users_can_register(): void
    {
        $response = $this->post('/register', [
            'name' => 'John',
            'surname' => 'Smith',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'phone_number' => '+447911123456',
            'date_of_birth' => '1990-01-01',
            'street_address' => '10 Downing Street',
            'city' => 'London',
            'country' => 'United Kingdom',
            'postal_code' => 'SW1A 2AA',
            'terms' => true,
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('dashboard', absolute: false));
    }

    public function test_registration_fails_for_forbidden_country(): void
    {
        $response = $this->post('/register', [
            'name' => 'John',
            'surname' => 'Smith',
            'email' => 'forbidden@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'phone_number' => '+123456789',
            'date_of_birth' => '1990-01-01',
            'street_address' => '123 Main St',
            'city' => 'Tehran',
            'country' => 'Iran',
            'postal_code' => '12345',
            'terms' => true,
        ]);

        $response->assertSessionHasErrors('country');
        $this->assertGuest();
    }
}
