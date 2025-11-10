"use client"

import React, { useState, useEffect } from 'react'
import { router, usePage } from '@inertiajs/react'
import TextInput from './TextInput'
import InputLabel from './InputLabel'
import InputError from './InputError'
import PhoneNumberInput from './PhoneNumberInput'
import Button from './ui/Button'

interface PhoneVerificationProps {
    phoneNumber: string | null | undefined
    phoneType: 'phone' | 'company_phone'
    isVerified: boolean
    onVerified?: () => void
    onPhoneChange?: (phone: string) => void
    className?: string
    label?: string
    required?: boolean
}

const PhoneVerification: React.FC<PhoneVerificationProps> = ({
    phoneNumber,
    phoneType,
    isVerified,
    onVerified,
    onPhoneChange,
    className = '',
    label,
    required = false,
}) => {
    const [phone, setPhone] = useState<string>(phoneNumber || '')
    const [code, setCode] = useState('')
    const [isSending, setIsSending] = useState(false)
    const [isVerifying, setIsVerifying] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [codeError, setCodeError] = useState<string | null>(null)
    const [codeSent, setCodeSent] = useState(false)
    const csrf = usePage().props.csrf_token as string

    // Update phone when prop changes
    useEffect(() => {
        if (phoneNumber) {
            setPhone(phoneNumber)
        }
    }, [phoneNumber])

    const handlePhoneChange = (value: string | undefined) => {
        const phoneValue = value || ''
        setPhone(phoneValue)
        setError(null)
        setCodeSent(false)
        setCode('')
        if (onPhoneChange) {
            onPhoneChange(phoneValue)
        }
    }

    const sendVerificationCode = async () => {
        if (!phone || phone.trim() === '') {
            setError('Phone number is required')
            return
        }

        setIsSending(true)
        setError(null)
        setCodeError(null)

        try {
            const response = await fetch('/phone/verification-notification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': csrf,
                },
                credentials: 'same-origin',
                body: JSON.stringify({
                    phone_type: phoneType,
                    phone: phone,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                if (response.status === 422) {
                    setError(data.errors?.phone?.[0] || data.message || 'Failed to send verification code')
                } else {
                    setError(data.message || 'Failed to send verification code')
                }
            } else {
                setCodeSent(true)
                setCode('')
                setError(null)
            }
        } catch (error) {
            setError('An error occurred. Please try again.')
        } finally {
            setIsSending(false)
        }
    }

    const verifyCode = async () => {
        if (!code || code.length !== 6) {
            setCodeError('Please enter a valid 6-digit code')
            return
        }

        setIsVerifying(true)
        setCodeError(null)
        setError(null)

        try {
            const response = await fetch('/phone/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': csrf,
                },
                credentials: 'same-origin',
                body: JSON.stringify({
                    code,
                    phone_type: phoneType,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                if (response.status === 422) {
                    setCodeError(data.errors?.code?.[0] || data.message || 'Verification failed')
                } else {
                    setCodeError(data.message || 'Verification failed')
                }
            } else {
                setCodeError(null)
                setCode('')
                if (onVerified) {
                    onVerified()
                }
                // Reload the page to update verification status
                router.reload({ only: ['auth'] })
            }
        } catch (error) {
            setCodeError('An error occurred. Please try again.')
        } finally {
            setIsVerifying(false)
        }
    }

    // If verified, show verified status
    if (isVerified) {
        return (
            <div className={`mb-4 ${className}`}>
                <InputLabel value={label || `Phone Number`} isRequired={required} />
                <PhoneNumberInput
                    value={phone}
                    onChange={handlePhoneChange}
                    className="phone-input form-control"
                    disabled={true}
                />
                <div className="d-flex align-items-center gap-2 mt-2">
                    <span className="text-success">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                    </span>
                    <span className="text-success fw-semibold">Phone number verified</span>
                </div>
            </div>
        )
    }

    // Show phone input and send button
    if (!codeSent) {
        return (
            <div className={`mb-4 ${className}`}>
                <InputLabel value={label || `Phone Number`} isRequired={required} />
                <div className="d-flex flex-column flex-md-row gap-2 align-items-start">
                    <div className="flex-grow-1 w-100">
                        <PhoneNumberInput
                            value={phone}
                            onChange={handlePhoneChange}
                            className="phone-input form-control"
                            disabled={isVerified}
                        />
                        {error && <InputError message={error} />}
                    </div>
                    <div className="flex-shrink-0">
                        <Button
                            type="button"
                            onClick={sendVerificationCode}
                            disabled={isSending || !phone || phone.trim() === ''}
                            variant="primary"
                            size="md"
                            className=""
                        >
                            {isSending ? 'Sending...' : 'Send Code'}
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    // Show OTP input after code is sent
    return (
        <div className={`mb-4 ${className}`}>
            <InputLabel value={`Enter verification code sent to ${phone}`} isRequired={required} />
            <div className="d-flex flex-column flex-md-row gap-2 align-items-start">
                <div className="flex-grow-1 w-100">
                    <TextInput
                        type="text"
                        value={code}
                        onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 6)
                            setCode(value)
                            setCodeError(null)
                        }}
                        placeholder="000000"
                        maxLength={6}
                        className={codeError ? 'is-invalid' : ''}
                    />
                    {codeError && <InputError message={codeError} />}
                </div>
                <div className="flex-shrink-0">
                    <Button
                        type="button"
                        onClick={verifyCode}
                        disabled={isVerifying || code.length !== 6}
                        variant="primary"
                        size="md"
                        className=""
                    >
                        {isVerifying ? 'Verifying...' : 'Verify'}
                    </Button>
                </div>
            </div>
            <div className="mt-2">
                <button
                    type="button"
                    onClick={() => {
                        setCodeSent(false)
                        setCode('')
                        setCodeError(null)
                    }}
                    className="btn btn-link p-0 text-decoration-none text-primary"
                    style={{ fontSize: '0.875rem' }}
                >
                    Change phone number
                </button>
            </div>
        </div>
    )
}

export default PhoneVerification
