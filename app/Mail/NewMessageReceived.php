<?php

namespace App\Mail;

use App\Models\ChatMessage;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Queue\SerializesModels;

class NewMessageReceived extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(protected $receiver, protected ChatMessage $message)
    {
        //
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        $senderName = $this->message->sender->name ?? 'Someone';
        return new Envelope(
            subject: "New Message from {$senderName} on Urpuppy.com",
            to: [$this->receiver->email],
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $senderName = $this->message->sender->name ?? 'Someone';
        $chatUrl = route('chat.index');
        $support_email = 'support@urpuppy.com';

        $messagePreview = $this->message->message 
            ? (strlen($this->message->message) > 150 
                ? substr($this->message->message, 0, 150) . '...' 
                : $this->message->message)
            : 'You have received a new message with attachments.';

        $m = (new MailMessage)
            ->greeting("Dear {$this->receiver->full_name}")
            ->line("You have received a new message from **{$senderName}** on Urpuppy.com.")
            ->line('**Message:**')
            ->line($messagePreview)
            ->action('View Message', $chatUrl)
            ->line("If you have any questions or need assistance, please contact us at [support@urpuppy.com](mailto:{$support_email}).")
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

