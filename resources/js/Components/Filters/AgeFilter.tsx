import React, { useState } from 'react';
import { FilterBoxProps } from '../FilterBox';
import SelectFilterInput from '../SelectFilterInput';
import SelectMobile from '../SelectMobile';
import { usePage } from '@inertiajs/react';

interface AgeFilterProps {
  setAge: React.Dispatch<React.SetStateAction<FilterBoxProps>>;
    defaultValue?: any
}

const options = [
  { value: '1', label: 'Up to 1 week' },
  { value: '2', label: 'Up to 2 Weeks' },
  { value: '4', label: 'Up to 4 Weeks' },
  { value: '10', label: 'Up to 10 Weeks' },
  { value: '18', label: 'Up to 18 Weeks' },
  { value: '0', label: 'Older than 18 Weeks' },
]

const AgeFilter: React.FC<AgeFilterProps> = ({ setAge, defaultValue }) => {

  const [value, setValue] = useState( options.find((option) => option.value === defaultValue?.value));
  const handleInputChange = (e: any) => {
    setValue(e)
    setAge((prev) => ({
      ...prev,
      age: { label: e.label, value: e.value },
    }));
  };


    const isMobile = usePage().props.isMobile;
    const handleMobileInputChange = (selected: any) => {
        let selectedValue: any = isMobile ? options.find((option) => option?.label === selectedValue)?.value || 0 : selected.value;
        setAge((prev: any) => ({
          ...prev,
          age: {label: selectedValue, value: options.find((option) => option.value === selectedValue?.value) },
        }));
         setValue({
            label: selected.value,
            value: selected.value
        });
    }

  return (
    <>
      <span className="flex-shrink-0">
        <img src="/images/svgs/icon-calendar.svg" alt="" />
      </span>
      <div id="filter-box">
        <h6 className="font-work-sans mb-0">Age</h6>
                <SelectMobile
                    title="Age"
                    handleMobileInputChange={handleMobileInputChange}
                    selectedItem={value}
                    options={options} handleInputChange={handleInputChange}  />
      </div>
    </>
  );
};

export default AgeFilter;

