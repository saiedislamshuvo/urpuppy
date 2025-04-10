<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\HtmlString;

class RenewBreederMail extends Mailable
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
            subject: 'Thank You for Renewing Your Breeder Account Subscription!',
            to: [$this->user->email],
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        /* $get_started_url = route('listing.create'); */
        $support_email = 'support@urpuppy.com';

        $listItems = [
            'You can cancel or renew your subscription at any time.',
            'If you cancel before your expiration date, your subscription will remain active until the end of the current subscription period.',
        ];

        $listHtml = '<ul style="list-style-type: disc; padding-left: 20px;">';
        foreach ($listItems as $item) {
            $listHtml .= "<li>{$item}</li>";
        }
        $listHtml .= '</ul>';

        $m = (new MailMessage)
            ->greeting("Dear {$this->user->full_name}")
            ->line('Thank you for renewing your **Breeder Account** subscription on **Urpuppy.com!** Your account is now active for the next **12 months.**')
            ->line(new HtmlString($listHtml))

            ->line("We’re delighted to continue supporting your business and helping you connect with dog lovers. If you have any questions or need assistance, feel free to contact us at [support@urpuppy.com](mailto:{$support_email})")
            ->line('Thank you for being a valued part of the **Urpuppy.com** community!');

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
