<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class VerifyPhoneController extends Controller
{
    /**
     * Mark the user's phone number as verified.
     */
    public function __invoke(Request $request): JsonResponse
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'message' => 'User not authenticated',
            ], 401);
        }

        $request->validate([
            'code' => ['required', 'string', 'size:6'],
            'phone_type' => ['required', 'in:phone,company_phone'],
        ]);

        $code = $request->input('code');
        $phoneType = $request->input('phone_type');

        // Verify the code
        if (!$user->isValidVerificationCode($code, $phoneType)) {
            throw ValidationException::withMessages([
                'code' => ['The verification code is invalid or has expired.'],
            ]);
        }

        // Mark as verified
        if ($phoneType === 'company_phone') {
            if ($user->hasVerifiedCompanyPhone()) {
                return response()->json([
                    'message' => 'Company phone number is already verified.',
                ], 422);
            }

            $user->markCompanyPhoneAsVerified();
        } else {
            if ($user->hasVerifiedPhone()) {
                return response()->json([
                    'message' => 'Phone number is already verified.',
                ], 422);
            }

            $user->markPhoneAsVerified();
        }

        return response()->json([
            'message' => 'Phone number verified successfully.',
            'verified' => true,
        ]);
    }
}
