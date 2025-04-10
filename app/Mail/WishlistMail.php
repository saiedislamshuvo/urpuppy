<?php

namespace App\Mail;

use App\Data\PuppyData;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\HtmlString;

class WishlistMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(protected User $user, protected $puppies)
    {
        //
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'We got new puppies',
            to: [$this->user->email],
        );
    }

    public function content(): Content
    {

        $supportEmail = 'support@urpuppy.com';

        $puppies = PuppyData::collect($this->puppies);

        return new Content(view: 'emails.wish', with: [
            'items' => $puppies,
            'name' => $this->user->first_name,
            'header' => new HtmlString(view('vendor.mail.html.header')),
            'footer' => new HtmlString(view('vendor.mail.html.footer')),
            'slot' => '',
            'supportEmail' => $supportEmail,
        ]);

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
