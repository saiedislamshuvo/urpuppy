import React, { useState } from 'react'
import { FilterBoxProps } from '../FilterBox';
import SelectFilterInput from '../SelectFilterInput';
import SelectMobile from '../SelectMobile';

interface GenderFilterProps {
  setGender: React.Dispatch<React.SetStateAction<FilterBoxProps>>;
  defaultValue?: any
}

const options = [
  { value: 'All', label: 'All' },
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
]

const GenderFilter: React.FC<GenderFilterProps> = ({setGender, defaultValue}) => {


    const [selectedAge, setSelectedAge] = useState<any>(defaultValue);
    const [value, setValue] = useState(defaultValue);
    const handleInputChange = (e: any) => {
    setValue(e)
    setGender((prev) => ({
      ...prev,
      gender: { label: e.label, value: e.value },
    }));
  };

    const handleMobileInputChange = (selected: any) => {
        setGender((prev: any) => ({
          ...prev,
          gender: {label: selected.value, value: selected.value},
        }));
         setValue({
            label: selected.value,
            value: selected.value
        });
    }

  return (
  <>
                  <span className="flex-shrink-0"><img src="/images/svgs/icon-gender.svg" alt="urpuppy-img" /></span>
                  <div id="filter-box">
                    <h6 className="font-work-sans mb-0">Sex</h6>

                <SelectMobile
                    key="gender"
                    title="Gender"
                    handleMobileInputChange={handleMobileInputChange}
                    selectedItem={value}
                    options={options} handleInputChange={handleInputChange} value={value} />

                  </div>

        </>
  )
}

export default GenderFilter
