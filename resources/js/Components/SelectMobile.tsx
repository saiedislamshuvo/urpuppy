import { usePage } from '@inertiajs/react';
import { AsyncPaginate } from 'react-select-async-paginate';
import React from 'react'
import SelectFilterInput, { filterStyles } from './SelectFilterInput';
import GenericModal from './Modals/GenericModal';
import MobilePicker from './MobilePicker';

const SelectMobile = ({
    loadOptions,
    selectedItem,
    handleInputChange,
    setIsModalOpen,
    options,
    handleMobileInputChange

}: any) => {

    const isMobile = usePage().props.isMobile;

  return (
           !isMobile ?
           <SelectFilterInput options={options} onChange={handleInputChange} value={selectedItem} />
        : <GenericModal title="Choose breed" setIsModalOpen={setIsModalOpen} centered buttonTitle={
                        <div style={{
                        }} className="filter-custom-label">{selectedItem?.label}</div>
                    } >
                        <MobilePicker value={selectedItem} setMobileFilter={handleMobileInputChange}  options={options} />
                    </GenericModal>
  )
}

export default SelectMobile
