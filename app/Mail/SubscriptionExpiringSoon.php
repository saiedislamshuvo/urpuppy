<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Queue\SerializesModels;

class SubscriptionExpiringSoon extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(protected $user, protected $daysUntilExpiration)
    {
        //
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        $days = $this->daysUntilExpiration;
        $subject = $days == 1 
            ? 'Your Urpuppy.com Subscription Expires Tomorrow'
            : "Your Urpuppy.com Subscription Expires in {$days} Days";

        return new Envelope(
            subject: $subject,
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
        $days = $this->daysUntilExpiration;

        $expirationText = $days == 1 
            ? 'tomorrow'
            : "in {$days} days";

        $m = (new MailMessage)
            ->greeting("Dear {$this->user->full_name}")
            ->line("This is a friendly reminder that your **Urpuppy.com** subscription will expire {$expirationText}.")
            ->line('To continue enjoying all the benefits of your subscription, please renew before the expiration date.')
            ->action('Renew Your Subscription', $subscription_url)
            ->line("If you have any questions or need assistance with your subscription, please contact us at [support@urpuppy.com](mailto:{$support_email}).")
            ->line('Thank you for being a valued member of the Urpuppy community!');

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

