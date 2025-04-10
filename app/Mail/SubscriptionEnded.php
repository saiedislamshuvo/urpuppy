<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Queue\SerializesModels;

class SubscriptionEnded extends Mailable
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
            subject: 'We\'re Sorry to See You Go',
            to: [$this->user->email],
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $m = (new MailMessage)
            ->greeting("Dear {$this->user->full_name}")
            ->line('We\'re sorry to see that you\'ve decided to cancel your account on Urpuppy.com. Your feedback is important to us, and we would love to hear about your experience.')
            ->line('Please note that your subscription will continue until the end of your term. If you have any questions or if there\'s anything we can do to improve our service, please let us know.')
            ->line('Thank you for being a part of the Urpuppy community. We hope to have the opportunity to serve you again in the future!');

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
