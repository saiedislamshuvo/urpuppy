import React, { useEffect, useState } from 'react'
import { FilterBoxProps } from '../FilterBox';
import { usePage } from '@inertiajs/react';
import { filterStyles } from '../SelectFilterInput';
import { AsyncPaginate } from 'react-select-async-paginate';
import SelectPaginate from '../SelectPaginate';
import SelectFilterInput from '../SelectFilterInput';


interface StateFilterProps {
  setState: React.Dispatch<React.SetStateAction<FilterBoxProps>>;
  title?: string;
  defaultValue?: any;
  mobile?: boolean;
}

const StateFilter: React.FC<StateFilterProps> = ({ setState, defaultValue, mobile = false }) => {

  const [value, setValue] = useState<any>(defaultValue);

  const isMobile = usePage().props.isMobile;

  const [options, setOptions] = useState<any>([]);
  const handleInputChange = (e: any) => {
    setValue(e)
    setState((prev: any) => ({
      ...prev,
      state: { label: e.label, value: e.label },
    }));
  };



  const fetchStates = async (search: any, loadedOptions: any, { page }: any) => {
    try {
      const response = await fetch(
        `/api/puppy/states?page=${page}&search=${search}&all=true`,
      );
      const data = await response.json();


      if (isMobile) {
        setOptions(data.data);
      }

      return {
        options: data.data,
        hasMore: data.current_page !== data.last_page,
        additional: { page: data.current_page + 1 },
      };
    } catch (error) {
      return {
        options: [],
        hasMore: false,
        additional: { page: 1 },
      };
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (mobile) {
      fetchStates("", null, { page: 1 });
    }
  }, [mobile]);

  useEffect(() => {
    if (isModalOpen && !mobile) {
      fetchStates("", null, { page: 1 });
    }
  }, [isModalOpen, mobile]);

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
  };

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <>
      <span className="flex-shrink-0"><img src="/images/svgs/icon-map-pin.svg" alt="urpuppy-img" /></span>
      <div className="filter-box w-100">
        <h6 className="font-work-sans mb-0">State</h6>
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
          <SelectPaginate
            loadOptions={fetchStates}
            selectedItem={value}
            handleInputChange={handleInputChange}
            setIsModalOpen={setIsModalOpen}
            options={options}
          />
        )}
      </div>


    </>
  )
}

export default StateFilter
