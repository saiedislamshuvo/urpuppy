<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Queue\SerializesModels;

class SupportTeamEmailResponseMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(protected string $name, protected string $email)
    {
        //
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'We\'ve Received Your Request',
            to: [$this->email],
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        /* $get_started_url = route('listing.create'); */
        $support_email = 'support@urpuppy.com';

        $m = (new MailMessage)
            ->greeting("Dear {$this->name},")
            ->line('Thank you for contacting Urpuppy.com! We have received your email and appreciate you reaching out to us.')

            ->line('Our team works diligently to respond to inquiries, and we will get back to you within the next 24 hours. If your matter is urgent, please feel free to indicate that in your message, and we will do our best to prioritize your request.')

            ->line('Thank you for your patience!')

            ->line('Best regards,');

        return new Content(htmlString: $m->render());
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
