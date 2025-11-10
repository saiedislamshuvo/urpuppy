<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use Twilio\Rest\Client;
use Twilio\Exceptions\TwilioException;

class TwilioService
{
    protected $client;
    protected $from;

    public function __construct()
    {
        $accountSid = config('services.twilio.account_sid');
        $authToken = config('services.twilio.auth_token');
        $fromNumber = config('services.twilio.from');
        
        // Format the from number to E.164 format if provided
        if ($fromNumber) {
            $this->from = $this->formatPhoneNumber($fromNumber);
        } else {
            $this->from = null;
        }

        if ($accountSid && $authToken) {
            try {
                $this->client = new Client($accountSid, $authToken);
            } catch (\Exception $e) {
                Log::error('Twilio client initialization failed: ' . $e->getMessage());
                $this->client = null;
            }
        } else {
            $this->client = null;
            Log::warning('Twilio credentials not configured');
        }
    }

    /**
     * Send SMS message
     *
     * @param string $to Phone number in E.164 format (e.g., +1234567890)
     * @param string $message Message content
     * @return bool|string Returns true on success, error message on failure
     */
    public function sendSms(string $to, string $message): bool|string
    {
        if (!$this->client) {
            Log::error('Twilio client not initialized. Check your Twilio credentials.');
            return 'Twilio service not configured';
        }

        if (!$this->from) {
            Log::error('Twilio from number not configured');
            return 'Twilio from number not configured';
        }

        // Validate from number format
        if (!$this->isValidPhoneNumber($this->from)) {
            Log::error('Twilio from number is not in valid E.164 format', ['from' => $this->from]);
            return 'Twilio from number is not in valid format. Please use E.164 format (e.g., +12032314921)';
        }

        try {
            $message = $this->client->messages->create(
                $to,
                [
                    'from' => $this->from,
                    'body' => $message,
                ]
            );

            Log::info('SMS sent successfully', [
                'to' => $to,
                'message_sid' => $message->sid,
            ]);

            return true;
        } catch (TwilioException $e) {
            Log::error('Twilio SMS sending failed', [
                'to' => $to,
                'error' => $e->getMessage(),
                'code' => $e->getCode(),
            ]);

            return $e->getMessage();
        } catch (\Exception $e) {
            Log::error('Unexpected error sending SMS', [
                'to' => $to,
                'error' => $e->getMessage(),
            ]);

            return $e->getMessage();
        }
    }

    /**
     * Send verification code via SMS
     *
     * @param string $to Phone number in E.164 format
     * @param string $code Verification code
     * @return bool|string Returns true on success, error message on failure
     */
    public function sendVerificationCode(string $to, string $code): bool|string
    {
        $message = "Your verification code is: {$code}. This code will expire in 10 minutes.";
        
        return $this->sendSms($to, $message);
    }

    /**
     * Verify if phone number is valid format (E.164)
     *
     * @param string $phoneNumber
     * @return bool
     */
    public function isValidPhoneNumber(string $phoneNumber): bool
    {
        // E.164 format: + followed by 1-15 digits
        return preg_match('/^\+[1-9]\d{1,14}$/', $phoneNumber) === 1;
    }

    /**
     * Format phone number to E.164 format
     * This is a basic formatter - you may want to use a library like libphonenumber for better formatting
     *
     * @param string $phoneNumber
     * @return string
     */
    public function formatPhoneNumber(string $phoneNumber): string
    {
        // Remove all non-digit characters except +
        $cleaned = preg_replace('/[^\d+]/', '', $phoneNumber);

        // If it doesn't start with +, assume US number and add +1
        if (!str_starts_with($cleaned, '+')) {
            // Remove leading 1 if present
            if (str_starts_with($cleaned, '1') && strlen($cleaned) === 11) {
                $cleaned = substr($cleaned, 1);
            }
            $cleaned = '+1' . $cleaned;
        }

        return $cleaned;
    }
}

