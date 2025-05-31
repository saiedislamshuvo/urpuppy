import React, { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import PriceFilter from './Filters/PriceFilter';
import BreedFilter from './Filters/BreedFilter';
import AgeFilter from './Filters/AgeFilter';
import GenderFilter from './Filters/GenderFilter';
import StateFilter from './Filters/StateFilter';
import MobilePicker from './MobilePicker';

type FilterObject = {
    value: number | string | [number, number];
    label: string;
};

export type FilterBoxProps = {
    breed: FilterObject;
    age: FilterObject;
    gender: FilterObject;
    price: FilterObject;
    state: FilterObject;
};

const FilterBox = () => {
    const { props } = usePage();
    const { payload, isMobile } = props as any;


   const initialFilters = React.useMemo(() => ({
        breed: { label: payload?.filter?.breed ?? "e.g. (Breed)", value: payload?.filter?.breed ?? "All" },
        gender: { label: payload?.filter?.gender ?? "e.g. (Male)", value: payload?.filter?.gender ?? "All" },
        age: { label: "1 week", value: payload?.filter?.age ?? "0" },
        price: { label: "$1 - $2,500", value: [1, 250000] },
        state: { label: payload?.filter?.state ?? "e.g. (New York)", value: payload?.filter?.state ?? "All" },
    }), [payload?.filter]) as FilterBoxProps;


    const [filter, setFilter] = useState<FilterBoxProps>(initialFilters);

    const handleSearch = (e: React.MouseEvent) => {
        e.preventDefault();

        const flattenedPayload = Object.entries(filter).reduce((acc, [key, obj]) => {
            acc[key] = obj.value;
            return acc;
        }, {} as Record<string, any>);

        router.visit('/puppies', {
            data: { filter: flattenedPayload },
            only: ['puppies', 'breed_filter_list', 'state_filter_list', 'has_search'],
            method: 'get',
            preserveState: true,
            preserveScroll: true,
        });
    };

    const renderFilterLabel = React.useCallback(() => {
    return Object.entries(filter)
        .filter(([key]) => key !== 'state' && key !== 'price')
        .map(([key, item], index, array) => (
            <React.Fragment key={key}>
                {item.label}
                {index < array.length - 1 && ' ・'}
            </React.Fragment>
        ));
}, [filter]);

    const renderDesktopFilters = React.useCallback(() => (
        <div className="grid-filter d-none d-lg-block">
            <div className="d-flex align-items-center justify-content-between">
                <div className="breed d-flex gap-2 border-end">
                    <BreedFilter setBreed={setFilter} defaultValue={filter.breed} />
                </div>
                <div className="sex d-flex gap-2 border-end">
                    <GenderFilter setGender={setFilter} defaultValue={filter.gender} />
                </div>
                <div className="age d-flex gap-2 border-end">
                    <AgeFilter setAge={setFilter} defaultValue={filter.age} />
                </div>
                <div className="price-range d-flex gap-2 border-end flex-shrink-0">
                    <PriceFilter setPrice={setFilter as any}  />
                </div>
                <div className="state d-flex gap-2">
                    <StateFilter setState={setFilter} defaultValue={filter.state} />
                </div>
                <a
                    onClick={handleSearch}
                    className="btn btn-primary round-48 flex-shrink-0 p-2 d-flex align-items-center justify-content-center"
                >
                    <img src="/images/svgs/icon-search.svg" alt="urpuppy-img" />
                </a>
            </div>
        </div>

), [filter, setFilter, handleSearch]);

const renderMobileFilters = React.useCallback(() => (
        <div className="grid-filter-mobile aos-init aos-animate dropdown d-grid d-lg-none" data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000">
            <button
                type="button"
                className="btn btn-white bg-white py-6 d-flex align-items-center justify-content-between gap-4"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                data-bs-auto-close="outside"
            >
                <div className="breed d-flex gap-2">
                    <span className="flex-shrink-0">
                        <img src="/images/svgs/icon-breed.svg" alt="urpuppy-img" />
                    </span>
                    <div className="text-start">
                        <h6 className="font-work-sans mb-0">Find your puppy</h6>
                        <p className="mb-0 fs-2 text-muted fw-normal">{renderFilterLabel()}</p>
                    </div>
                </div>
                <a
                    onClick={handleSearch}
                    className="btn btn-primary round-48 flex-shrink-0 p-2 d-flex align-items-center justify-content-center"
                >
                    <img src="/images/svgs/icon-search.svg" alt="urpuppy-img" />
                </a>
            </button>
            <div className="dropdown-menu px-4 py-3 w-100 mt-n1" style={{ zIndex: '999999999!important' }}>
                <div className="breed d-flex gap-2 border-bottom py-6">
                    <BreedFilter setBreed={setFilter} defaultValue={filter.breed} />
                </div>
                <div className="sex d-flex gap-2 border-bottom py-6">
                    <GenderFilter setGender={setFilter} defaultValue={filter.gender} />
                </div>
                <div className="age d-flex gap-2 border-bottom py-6">
                    <AgeFilter setAge={setFilter} defaultValue={filter.age} />
                </div>
                <div className="price-range d-flex gap-2 border-bottom py-6">
                    <PriceFilter setPrice={setFilter as any} />
                </div>
                <div className="state d-flex gap-2 py-6">
                    <StateFilter setState={setFilter} defaultValue={filter.state} />
                </div>
                <a onClick={handleSearch} href="#" className="btn btn-primary w-100 d-flex align-items-center justify-content-center mt-3">
                    Search
                </a>
            </div>
        </div>

), [filter, setFilter, handleSearch, renderFilterLabel]);

    return (
        <>
            {isMobile ? renderMobileFilters() : renderDesktopFilters()}
        </>
    );
};

export default FilterBox;
