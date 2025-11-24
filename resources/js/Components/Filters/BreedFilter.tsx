import React, { useEffect, useState } from 'react';
import { FilterBoxProps } from '../FilterBox';
import { usePage } from '@inertiajs/react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { filterStyles } from '../SelectFilterInput';
import GenericModal from '../Modals/GenericModal';
import SelectPaginate from '../SelectPaginate';
import SelectFilterInput from '../SelectFilterInput';

interface BreedFilterProps {
  setBreed: React.Dispatch<React.SetStateAction<FilterBoxProps>>;
  title?: string,
  defaultValue?: any;
  mobile?: boolean;
}

const BreedFilter: React.FC<BreedFilterProps> = ({ setBreed, title = "Breed", defaultValue, mobile = false }) => {

  const isMobile = usePage().props.isMobile;
  const [selectedBreed, setSelectedBreed] = useState<any>(defaultValue);
  const [options, setOptions] = useState<any>([]);

  const handleInputChange = (selected: any) => {
    setBreed((prev: any) => ({
      ...prev,
      breed: { label: selected.label, value: selected.label },
    }));
    setSelectedBreed(selected);
  };

  const fetchBreeds = async (search: any, loadedOptions: any, { page }: any) => {
    try {
      const response = await fetch(
        `/api/puppy/breeds?page=${page}&search=${search}&all=true`,
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
      fetchBreeds("", null, { page: 1 });
    }
  }, [mobile]);

  useEffect(() => {
    if (isModalOpen && !mobile) {
      fetchBreeds("", null, { page: 1 });
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
      setSelectedBreed(defaultValue);
    }
  }, [defaultValue]);

  return (
    <>
      <span className="flex-shrink-0 ${mobile ? '' : 'd-flex align-items-center'}">
        <img src="/images/svgs/icon-breed.svg" alt="Breed Icon" />
      </span>
      <div className="filter-box w-100">
        <h6 className="font-work-sans mb-0">{title}</h6>
        {mobile ? (
          <div className="w-100">
            <SelectFilterInput
              options={options}
              onChange={handleInputChange}
              value={selectedBreed}
              styles={mobileSelectStyles}
            />
          </div>
        ) : (
          <SelectPaginate
            loadOptions={fetchBreeds}
            selectedItem={selectedBreed}
            handleInputChange={handleInputChange}
            setIsModalOpen={setIsModalOpen}
            options={options}
          />
        )}
      </div>
    </>
  );
};

export default BreedFilter;

