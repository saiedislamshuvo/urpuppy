<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\HtmlString;

class PremiumAccountMail extends Mailable
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
            subject: 'Welcome to Premium Membership – Enjoy Unlimited Benefits!',
            to: [$this->user->email],
        );
    }

    /**
     * Get the message content definition.
     */

    public function content(): Content
{
        $support_email = "support@urpuppy.com";


          $listItems = [
            '<b>Unlimited Posting</b> – Share and explore without limits.',
            '<b>Exclusive Features</b> – Unlock tools to enhance your experience.',
            '<b>Priority Support</b> – Get help when you need it, fast.

'
    ];

    $listHtml = '<ul style="list-style-type: disc; padding-left: 20px;">';
    foreach ($listItems as $item) {
        $listHtml .= "<li>{$item}</li>";
    }
    $listHtml .= '</ul>';


    $m = (new MailMessage)
        ->greeting("Dear {$this->user->full_name},")
        ->line('Thank you for upgrading your membership with **Urpuppy.com!** We’re thrilled to have you as a premium member.')
        ->line('As a valued premium member, you now have access to:')
        ->line(new HtmlString($listHtml))

        ->line("We’re excited to help you get the most out of your upgraded membership. If you have any questions or need assistance, don’t hesitate to contact us at [support@urpuppy.com](mailto:{$support_email})")
        ->line('Start exploring today and make the most of your new premium benefits!');

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
