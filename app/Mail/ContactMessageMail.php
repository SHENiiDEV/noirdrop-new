<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactMessageMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public array $ticketData)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Support Ticket: {$this->ticketData['subject']} [from {$this->ticketData['name']}]",
            replyTo: [$this->ticketData['email']],
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.contact_message',
            with: [
                'ticket' => $this->ticketData,
            ],
        );
    }
}
