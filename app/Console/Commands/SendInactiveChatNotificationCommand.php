<?php

namespace App\Console\Commands;

use App\Mail\InactiveChatNotification;
use App\Models\ChatMessage;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SendInactiveChatNotificationCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:send-inactive-chat-notification';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send email notifications to users who have unread messages older than 1 hour';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Checking for inactive chat notifications...');

        // Find unread messages that are older than 1 hour and haven't had an inactivity email sent
        $oneHourAgo = now()->subHour();
        
        // Get unread messages grouped by receiver to avoid sending multiple emails to the same user
        $unreadMessages = ChatMessage::where('is_read', false)
            ->where('created_at', '<=', $oneHourAgo)
            ->whereNull('inactivity_email_sent_at')
            ->with(['receiver', 'sender', 'chat'])
            ->orderBy('receiver_id')
            ->orderByDesc('created_at')
            ->get()
            ->groupBy('receiver_id');

        $sentCount = 0;

        foreach ($unreadMessages as $receiverId => $messages) {
            try {
                // Get the most recent unread message for this receiver
                $message = $messages->first();
                
                if (!$message || !$message->receiver) {
                    continue;
                }

                // Check if receiver has notifications enabled
                if (!($message->receiver->enable_notification ?? true)) {
                    continue;
                }

                // Send inactivity email
                Mail::queue(new InactiveChatNotification($message->receiver, $message));

                // Mark all unread messages for this receiver as having sent inactivity email
                // This prevents sending multiple emails for the same user
                ChatMessage::whereIn('id', $messages->pluck('id'))
                    ->update([
                        'inactivity_email_sent_at' => now(),
                    ]);

                $sentCount++;
                $this->info("Sent inactivity notification to user {$message->receiver->id} for message {$message->id}");
            } catch (\Exception $e) {
                Log::error('Error sending inactive chat notification', [
                    'receiver_id' => $receiverId,
                    'error' => $e->getMessage(),
                ]);
                $this->error("Error processing messages for receiver {$receiverId}: {$e->getMessage()}");
            }
        }

        $this->info("Sent {$sentCount} inactivity notification email(s).");

        return Command::SUCCESS;
    }
}
