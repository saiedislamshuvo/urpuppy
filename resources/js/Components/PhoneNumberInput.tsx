"use client"

import React, { useState } from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const PhoneNumberInput = ({...props}) => {
  const [value, setValue] = useState<string>()

  return (
  <PhoneInput
        onChange={setValue}
        countries={['US']}
        addInternationalOption={false}
        limitMaxLength={true}
        className="form-control"
        country="US"
        style={{
            }}
        defaultCountry="US"
        placeholder="Enter phone number"
        value={value}
        {...props}
        />
  )
}

export default PhoneNumberInput
