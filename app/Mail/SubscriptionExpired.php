<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Queue\SerializesModels;

class SubscriptionExpired extends Mailable
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
            subject: 'Your Urpuppy.com Subscription Has Expired',
            to: [$this->user->email],
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $support_email = 'support@urpuppy.com';
        $subscription_url = route('subscriptions.index');

        $m = (new MailMessage)
            ->greeting("Dear {$this->user->full_name}")
            ->line('We wanted to let you know that your **Urpuppy.com** subscription has expired.')
            ->line('Your account access has been updated accordingly. If you would like to continue enjoying our premium features, you can renew your subscription at any time.')
            ->action('Renew Your Subscription', $subscription_url)
            ->line("If you have any questions or need assistance, please don't hesitate to contact us at [support@urpuppy.com](mailto:{$support_email}).")
            ->line('Thank you for being a part of the Urpuppy community. We hope to see you again soon!');

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

