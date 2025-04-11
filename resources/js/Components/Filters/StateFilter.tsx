import React, { useEffect, useState } from 'react'
import { FilterBoxProps } from '../FilterBox';
import { usePage } from '@inertiajs/react';
import { filterStyles } from '../SelectFilterInput';
import { AsyncPaginate } from 'react-select-async-paginate';
import SelectPaginate from '../SelectPaginate';


interface StateFilterProps {
  setState: React.Dispatch<React.SetStateAction<FilterBoxProps>>;
  title?: string;
  defaultValue?: any;
}

const StateFilter: React.FC<StateFilterProps> = ({setState,  defaultValue}) => {

  const [value, setValue] = useState<any>(defaultValue);

    const isMobile = usePage().props.isMobile;

    const [options, setOptions] = useState<any>([]);
  const handleInputChange = (e: any) => {
    setValue(e)
    setState((prev: any) => ({
      ...prev,
      state: {label: e.label, value: e.label},
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
        fetchStates("", null, { page: 1 });
    }, [isModalOpen]);

   const handleMobileInputChange = (selected: any) => {
        setState((prev: any) => ({
          ...prev,
          state: {label: selected.value, value: selected.value},
        }));
         setValue({
            label: selected.value,
            value: selected.value
        });
    }

  return (
  <>
                  <span className="flex-shrink-0"><img src="/images/svgs/icon-map-pin.svg" alt="" /></span>
                  <div id="filter-box">
                    <h6 className="font-work-sans mb-0">State</h6>
                <SelectPaginate
                    loadOptions={fetchStates}
                    selectedItem={value}
                    handleInputChange={handleInputChange}
                    handleMobileInputChange={handleMobileInputChange}
                    setIsModalOpen={setIsModalOpen}
                    options={options}
                />


                  </div>


        </>
  )
}

export default StateFilter
