<?php

namespace App\Models\Traits;

use Carbon\Carbon;

trait MustVerifyPhone
{
    /**
     * Determine if the user has verified their phone number.
     */
    public function hasVerifiedPhone(): bool
    {
        return ! is_null($this->phone_verified_at);
    }

    /**
     * Determine if the user has verified their company phone number.
     */
    public function hasVerifiedCompanyPhone(): bool
    {
        return ! is_null($this->company_phone_verified_at);
    }

    /**
     * Mark the given user's phone as verified.
     */
    public function markPhoneAsVerified(): bool
    {
        return $this->forceFill([
            'phone_verified_at' => $this->freshTimestamp(),
            'phone_verification_code' => null,
            'phone_verification_code_expires_at' => null,
        ])->save();
    }

    /**
     * Mark the given user's company phone as verified.
     */
    public function markCompanyPhoneAsVerified(): bool
    {
        return $this->forceFill([
            'company_phone_verified_at' => $this->freshTimestamp(),
            'company_phone_verification_code' => null,
            'company_phone_verification_code_expires_at' => null,
        ])->save();
    }

    /**
     * Get the phone number that should be used for verification.
     */
    public function getPhoneForVerification(): ?string
    {
        return $this->phone;
    }

    /**
     * Get the company phone number that should be used for verification.
     */
    public function getCompanyPhoneForVerification(): ?string
    {
        return $this->company_phone;
    }

    /**
     * Check if the verification code is valid and not expired.
     */
    public function isValidVerificationCode(string $code, string $type = 'phone'): bool
    {
        $codeField = $type === 'company_phone' ? 'company_phone_verification_code' : 'phone_verification_code';
        $expiresField = $type === 'company_phone' ? 'company_phone_verification_code_expires_at' : 'phone_verification_code_expires_at';

        if ($this->$codeField !== $code) {
            return false;
        }

        if ($this->$expiresField && Carbon::parse($this->$expiresField)->isPast()) {
            return false;
        }

        return true;
    }

    /**
     * Set the verification code for phone.
     */
    public function setPhoneVerificationCode(string $code, int $expiresInMinutes = 10): bool
    {
        return $this->forceFill([
            'phone_verification_code' => $code,
            'phone_verification_code_expires_at' => now()->addMinutes($expiresInMinutes),
        ])->save();
    }

    /**
     * Set the verification code for company phone.
     */
    public function setCompanyPhoneVerificationCode(string $code, int $expiresInMinutes = 10): bool
    {
        return $this->forceFill([
            'company_phone_verification_code' => $code,
            'company_phone_verification_code_expires_at' => now()->addMinutes($expiresInMinutes),
        ])->save();
    }
}

