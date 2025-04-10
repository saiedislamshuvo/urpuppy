<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\HtmlString;

class NewBreederSpecialAccountMail extends Mailable
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
            subject: 'Welcome to Urpuppy.com – Breeder Special Account',
            to: [$this->user->email],
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $get_started_url = route('breeders.create');
        $support_email = 'support@urpuppy.com';

        $listItems = [
            'Create a professional <strong>Breeder Profile Page</strong> showcasing your company’s information.',
            'Upload images, videos, and links to your social media profiles.',
            'Share your services and connect with dog lovers effortlessly.',
        ];

        $listHtml = '<ul style="list-style-type: disc; padding-left: 20px;">';
        foreach ($listItems as $item) {
            $listHtml .= "<li>{$item}</li>";
        }
        $listHtml .= '</ul>';

        $m = (new MailMessage)
            ->greeting("Dear {$this->user->full_name}")
            ->line('Thank you for registering for the  **Urpuppy.com Breeder Special Account!** We’re thrilled to have you join our community.')

            ->line('With this account, you can:')
            ->line(new HtmlString($listHtml)) // Use HtmlString to include raw HTML

            ->line('Your profile makes it easy for dog lovers to learn about your company and services with just one click!')

            ->line("[Get Started Now]({$get_started_url})")
            ->line("If you have any questions or need support, feel free to contact us at [support@urpuppy.com](mailto:{$support_email}).")

            ->line(' Thank you for choosing **Urpuppy.com** to grow your business!');

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
