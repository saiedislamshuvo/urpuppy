import React, { useState, useEffect } from 'react'
import { FilterBoxProps } from '../FilterBox';
import SelectFilterInput from '../SelectFilterInput';
import SelectMobile from '../SelectMobile';
import { usePage } from '@inertiajs/react';

interface GenderFilterProps {
  setGender: React.Dispatch<React.SetStateAction<FilterBoxProps>>;
  defaultValue?: any;
  mobile?: boolean;
}

const options = [
  { value: 'All', label: 'All' },
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
]

const mobileSelectStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderRadius: '5px',
    border: '1px solid #ddd',
    width: '100%',
    minHeight: '40px',
    backgroundColor: 'white',
    padding: '0px 8px',
    boxShadow: 'none',
    fontSize: '1rem',
  }),
  menu: (provided: any) => ({
    ...provided,
    zIndex: 9999,
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? 'var(--bs-primary)' : 'white',
    color: state.isFocused ? 'white' : 'black',
    padding: '12px',
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: 'var(--bs-secondary)',
  }),
}

const GenderFilter: React.FC<GenderFilterProps> = ({ setGender, defaultValue, mobile = false }) => {
  const [selectedAge, setSelectedAge] = useState<any>(defaultValue);
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  const handleInputChange = (e: any) => {
    setValue(e)
    setGender((prev) => ({
      ...prev,
      gender: { label: e.label, value: e.value },
    }));
  };

  const isMobile = usePage().props.isMobile;

  return (
    <>
      <span className="flex-shrink-0"><img src="/images/svgs/icon-gender.svg" alt="urpuppy-img" /></span>
      <div className="filter-box w-100">
        <h6 className="font-work-sans mb-0">Sex</h6>
        {mobile ? (
          <div className="w-100">
            <SelectFilterInput
              options={options}
              onChange={handleInputChange}
              value={value}
              styles={mobileSelectStyles}
            />
          </div>
        ) : (
          <SelectMobile
            key="gender"
            title="Gender"
            handleMobileInputChange={handleInputChange}
            selectedItem={value}
            options={options}
            handleInputChange={handleInputChange}
            value={value}
          />
        )}
      </div>
    </>
  )
}

export default GenderFilter
