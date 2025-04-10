<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Queue\SerializesModels;

class AccountDeletionMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(protected $user)
    {
        //
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your Urpuppy.com Account Has Been Deleted',
            to: [$this->user->email],
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $support_email = 'support@urpuppy.com';

        $m = (new MailMessage)
            ->greeting("Hi {$this->user->full_name},")
            ->line('Your [Urpuppy.com](https://urpuppy.com) buyer account has been successfully deleted as requested. We’re sorry to see you go, but we understand your decision and hope to have the opportunity to serve you again in the future.')
            ->line("If you have any questions or need assistance, feel free to reach out to our support team at [support@urpuppy.com](mailto:{$support_email}).")

            ->line('Thank you for being a part of the Urpuppy community!');

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
