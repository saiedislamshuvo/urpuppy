<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Queue\SerializesModels;

class AdminNotifyMail extends Mailable
{
    use Queueable, SerializesModels;

    protected array $payload;

    /**
     * Create a new message instance.
     */
    public function __construct(array $payload)
    {
        $this->payload = $payload;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->payload['subject'],
            to: [config('custom.support')],
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $message = (new MailMessage)
            ->greeting('Hello Admin,')
            ->line('**Message:**')
            ->line($this->payload['message']);
        /* ->line('**Contact Email:** ' . $this->payload['email']); // Added email for better context. */

        return new Content(htmlString: $message->render());
    }

    /**
     * Get the attachments for the message.
     */
    public function attachments(): array
    {
        return []; // You can add attachments if necessary
    }
}
