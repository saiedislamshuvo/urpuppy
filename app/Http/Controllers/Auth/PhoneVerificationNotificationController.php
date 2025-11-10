<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\TwilioService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class PhoneVerificationNotificationController extends Controller
{
    protected $twilioService;

    public function __construct(TwilioService $twilioService)
    {
        $this->twilioService = $twilioService;
    }

    /**
     * Send a new phone verification notification.
     */
    public function store(Request $request): JsonResponse
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'message' => 'User not authenticated',
            ], 401);
        }

        $request->validate([
            'phone_type' => ['required', 'in:phone,company_phone'],
            'phone' => ['nullable', 'string'],
        ]);

        $phoneType = $request->input('phone_type');
        
        // Get phone number from request first (in case user just entered it), fallback to user model
        $phoneNumber = $request->input('phone');
        if (!$phoneNumber) {
            $phoneNumber = $phoneType === 'company_phone' ? $user->company_phone : $user->phone;
        }

        if (!$phoneNumber) {
            throw ValidationException::withMessages([
                'phone' => ['Phone number is required. Please update your profile with a phone number first.'],
            ]);
        }

        // Check if already verified
        if ($phoneType === 'company_phone' && $user->hasVerifiedCompanyPhone()) {
            return response()->json([
                'message' => 'Company phone number is already verified.',
            ], 422);
        }

        if ($phoneType === 'phone' && $user->hasVerifiedPhone()) {
            return response()->json([
                'message' => 'Phone number is already verified.',
            ], 422);
        }

        // Format phone number
        $formattedPhone = $this->twilioService->formatPhoneNumber($phoneNumber);

        if (!$this->twilioService->isValidPhoneNumber($formattedPhone)) {
            throw ValidationException::withMessages([
                'phone' => ['Invalid phone number format. Please use a valid phone number.'],
            ]);
        }

        // Generate 6-digit verification code
        $code = str_pad((string) random_int(0, 999999), 6, '0', STR_PAD_LEFT);

        // Save verification code to user
        if ($phoneType === 'company_phone') {
            $user->setCompanyPhoneVerificationCode($code);
        } else {
            $user->setPhoneVerificationCode($code);
        }

        // Send SMS via Twilio
        $result = $this->twilioService->sendVerificationCode($formattedPhone, $code);

        if ($result !== true) {
            Log::error('Failed to send phone verification code', [
                'user_id' => $user->id,
                'phone' => $formattedPhone,
                'error' => $result,
            ]);

            return response()->json([
                'message' => 'Failed to send verification code. Please try again later.',
                'error' => config('app.debug') ? $result : null,
            ], 500);
        }

        return response()->json([
            'message' => 'Verification code sent successfully to your phone number.',
        ]);
    }
}
