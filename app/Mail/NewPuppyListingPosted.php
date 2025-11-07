<?php

namespace App\Mail;

use App\Models\Puppy;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Queue\SerializesModels;

class NewPuppyListingPosted extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(protected $user, protected Puppy $puppy)
    {
        //
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your New Puppy Listing Has Been Posted on Urpuppy.com',
            to: [$this->user->email],
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $puppyUrl = route('puppies.show', $this->puppy->slug);
        $support_email = 'support@urpuppy.com';
        $puppyName = $this->puppy->name ?? 'your puppy';

        $m = (new MailMessage)
            ->greeting("Dear {$this->user->full_name}")
            ->line("Great news! Your new puppy listing for **{$puppyName}** has been successfully posted on Urpuppy.com.")
            ->line('Your listing is now live and visible to potential buyers. You can view and manage your listing at any time.')
            ->action('View Your Listing', $puppyUrl)
            ->line("If you have any questions or need assistance with your listing, please contact us at [support@urpuppy.com](mailto:{$support_email}).")
            ->line('Thank you for using Urpuppy.com!');

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

