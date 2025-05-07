<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Queue\SerializesModels;

class UrpuppyLaunchMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(protected $email)
    {
        //
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Exciting News – Urpuppy.com Has Officially Launched!',
            to: [$this->email],
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $m = (new MailMessage)
            ->greeting("Greetings!")
            ->line('**Urpuppy.com has officially launched!**')
            ->line('**Breeders**: Enjoy an exclusive 60-day free trial')
            ->line('**Sellers**: Get started with a 30-day free trial')
            ->line('What you get:')
            ->lines([
                '• List your puppies in online shows',
                '• Connect directly with buyers',
                '• Build your reputation with a verified profile',
            ])
            ->line('Be one of the first to join the platform built just for you.')
            ->line("[Register as a breeder](https://urpuppy.com/register-breeder)")
            ->line("[Register as a seller](https://urpuppy.com/register-seller)")
            ->line('Don’t miss out—your future buyers are already looking.');


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
