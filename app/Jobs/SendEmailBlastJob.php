<?php

namespace App\Jobs;

use App\Mail\UrpuppyLaunchMail;
use App\Models\Discount;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
// Replace with your actual model
// Create or use your existing mail class
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SendEmailBlastJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $recordId;

    public function __construct($recordId)
    {
        $this->recordId = $recordId;
    }

    public function handle()
    {
        $record = Discount::find($this->recordId);

        if (! $record) {
            Log::error('Record not found for email blast', ['id' => $this->recordId]);

            return;
        }

        $recipients = $this->getRecipients($record);

        foreach ($recipients as $index => $recipient) {

            Mail::to($recipient)->queue(
                (new UrpuppyLaunchMail($recipient))->delay(now()->addMinutes(1 * $index))
            );

        }

        Log::info('Email blast scheduled', [
            'record_id' => $this->recordId,
            'recipients_count' => count($recipients),
        ]);
    }

    protected function getRecipients($record)
    {
        if (empty($record->targeted_emails)) {
            Log::info('No target emails found', ['record_id' => $record->id]);

            return [];
        }

        $rawEmails = explode("\n", $record->targeted_emails);
        Log::info('Raw email entries found', ['count' => count($rawEmails)]);

        $validEmails = [];
        $invalidEmails = [];
        $processedEmails = [];

        foreach ($rawEmails as $email) {
            $email = trim($email);

            if (empty($email)) {
                continue;
            }

            $cleanedEmail = rtrim($email, '.');

            if (in_array($cleanedEmail, $processedEmails)) {
                Log::info('Duplicate email skipped', ['email' => $cleanedEmail]);

                continue;
            }

            if (filter_var($cleanedEmail, FILTER_VALIDATE_EMAIL)) {
                $validEmails[] = $cleanedEmail; // Add the cleaned email
                $processedEmails[] = $cleanedEmail; // Mark this email as processed

                if ($cleanedEmail !== $email) {
                    Log::info('Email cleaned before validation', [
                        'original' => $email,
                        'cleaned' => $cleanedEmail,
                    ]);
                }
            } else {
                $invalidEmails[] = $email;
            }
        }

        if (! empty($invalidEmails)) {
            Log::warning('Some email addresses were invalid', [
                'record_id' => $record->id,
                'invalid_emails' => $invalidEmails,
            ]);
        }

        Log::info('Valid emails collected', ['count' => count($validEmails)]);

        return array_unique($validEmails); // Extra safety to ensure uniqueness
    }
}
