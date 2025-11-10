"use client"

import React, { useState, useEffect } from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const PhoneNumberInput = ({ value: controlledValue, onChange, ...props }: any) => {
  const [internalValue, setInternalValue] = useState<string | undefined>(controlledValue)

  // Update internal value when controlled value changes
  useEffect(() => {
    setInternalValue(controlledValue)
  }, [controlledValue])

  const handleChange = (val: string | undefined) => {
    setInternalValue(val)
    if (onChange) {
      // Call onChange with the value directly (not as event)
      onChange(val || '')
    }
  }

  return (
    <PhoneInput
      onChange={handleChange}
      countries={['US']}
      addInternationalOption={false}
      limitMaxLength={true}
      className="form-control"
      country="US"
      style={{
        display: 'flex',
      }}
      defaultCountry="US"
      placeholder="Enter phone number"
      value={internalValue}
      {...props}
    />
  )
}

export default PhoneNumberInput
