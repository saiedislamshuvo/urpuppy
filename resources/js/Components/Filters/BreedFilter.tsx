import React, { useEffect, useState } from 'react';
import { FilterBoxProps } from '../FilterBox';
import { usePage  } from '@inertiajs/react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { filterStyles } from '../SelectFilterInput';
import GenericModal from '../Modals/GenericModal';
import MobilePicker from '../MobilePicker';
import SelectPaginate from '../SelectPaginate';

interface BreedFilterProps {
  setBreed: React.Dispatch<React.SetStateAction<FilterBoxProps>>;
  title?: string,
  defaultValue?: any
}

const BreedFilter: React.FC<BreedFilterProps> = ({ setBreed, title = "Breed", defaultValue }) => {

    const isMobile = usePage().props.isMobile;
    const [selectedBreed, setSelectedBreed] = useState<any>(defaultValue);
    const [options, setOptions] = useState<any>([]);

    const handleInputChange = (selected: any) => {
      setBreed((prev: any) => ({
        ...prev,
        breed: {label: selected.label, value: selected.label},
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
        fetchBreeds("", null, { page: 1 });
    }, [isModalOpen]);

    const handleMobileInputChange = (selected: any) => {
        setBreed((prev: any) => ({
          ...prev,
          breed: {label: selected.value, value: selected.value},
        }));
         setSelectedBreed({
            label: selected.value,
            value: selected.value
        });
    }


  return (
        <>
      <span className="flex-shrink-0">
        <img src="/images/svgs/icon-breed.svg" alt="Breed Icon" />
      </span>
      <div id="filter-box" style={{
                paddingRight: '20px'
            }}>
        <h6 className="font-work-sans mb-0">{title}</h6>
        <SelectPaginate
                    loadOptions={fetchBreeds}
                    selectedItem={selectedBreed}
                    handleInputChange={handleInputChange}
                    handleMobileInputChange={handleMobileInputChange}
                    setIsModalOpen={setIsModalOpen}
                    options={options}
                />
      </div>
</>
  );
};

export default BreedFilter;

