import { useState } from 'react';
import React from 'react';
import Picker from 'react-mobile-picker';

// Define the type for the selections object
type Selections = {
  value: string[];
};

// Define the type for the picker value
type PickerValue = {
  value: string;
};

function MobilePicker({ options, title = "value", setMobileFilter, value }: any) {
  const initialValue = value?.label || value?.value || (options && options.length > 0 ? options[0].label : 'All');
  const [pickerValue, setPickerValue] = useState<PickerValue>({
    value: initialValue,
  });

  React.useEffect(() => {
    const newValue = value?.label || value?.value || (options && options.length > 0 ? options[0].label : 'All');
    if (newValue !== pickerValue.value) {
      setPickerValue({ value: newValue });
    }
  }, [value, options]);

  const handleChange = (value: any) => {
    setPickerValue(value);
    setMobileFilter(value)
    // setFilter((prev: any) => ({
    //     ...prev,
    //     [title]: {label: value.value, value: value.value},
    // }));
  };

  return (
    <Picker value={pickerValue} onChange={handleChange}>
      <Picker.Column key={'key'} name={title}>
        {options?.map(({ label, value }: {
          label: string;
          value: any;
        }) => (
          <Picker.Item key={value} value={label}>
            {label}
          </Picker.Item>
        ))}
      </Picker.Column>
    </Picker>
  );
}

export default MobilePicker;
