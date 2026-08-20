<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMessageMail;
use Tests\TestCase;

class ContactTest extends TestCase
{
    use RefreshDatabase;

    public function test_contact_page_can_be_rendered(): void
    {
        $response = $this->get('/contact');

        $response->assertStatus(200);
    }

    public function test_how_it_works_page_can_be_rendered(): void
    {
        $response = $this->get('/how-it-works');

        $response->assertStatus(200);
    }

    public function test_support_page_can_be_rendered(): void
    {
        $response = $this->get('/support');

        $response->assertStatus(200);
    }

    public function test_about_page_can_be_rendered(): void
    {
        $response = $this->get('/about');

        $response->assertStatus(200);
    }

    public function test_contact_ticket_form_submits_mail(): void
    {
        Mail::fake();

        $response = $this->post('/contact', [
            'name' => 'John Merchant',
            'email' => 'john@merchantstore.com',
            'subject' => 'Question about B2B Tax Invoice',
            'message' => 'Hello, I would like to confirm my tax details for INCHWARD LIMITED.',
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('success');

        Mail::assertSent(ContactMessageMail::class);
    }
}
