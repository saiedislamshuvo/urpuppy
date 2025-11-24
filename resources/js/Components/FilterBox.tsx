import React, { useState, useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';
import PriceFilter from './Filters/PriceFilter';
import BreedFilter from './Filters/BreedFilter';
import AgeFilter from './Filters/AgeFilter';
import GenderFilter from './Filters/GenderFilter';
import StateFilter from './Filters/StateFilter';
import Modal from 'react-bootstrap/Modal';

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


    const initialFilters = React.useMemo(() => {
        // Clamp price values to valid range (100-4000)
        let priceValue: [number, number] = [100, 4000];
        if (payload?.filter?.price && Array.isArray(payload.filter.price)) {
            priceValue = [
                Math.max(1, Math.min(payload.filter.price[0], 4000)),
                Math.max(1, Math.min(payload.filter.price[1], 4000))
            ] as [number, number];
        }

        // Clamp age values to valid range (0-18 months) and ensure sorted
        let ageValue: [number, number] = [0, 18];
        if (payload?.filter?.age && Array.isArray(payload.filter.age) && payload.filter.age.length === 2) {
            const val1 = Math.max(0, Math.min(Number(payload.filter.age[0]) || 0, 18));
            const val2 = Math.max(0, Math.min(Number(payload.filter.age[1]) || 18, 18));
            // Ensure sorted (first <= second)
            ageValue = val1 <= val2 ? [val1, val2] : [val2, val1];
        }

        const ageLabel = ageValue[1] >= 18
            ? '0 - 18 MONTHS+'
            : `${ageValue[0]} - ${ageValue[1]} MONTHS`;

        return {
            breed: { label: payload?.filter?.breed ?? "e.g. (Breed)", value: payload?.filter?.breed ?? "All" },
            gender: { label: payload?.filter?.gender ?? "e.g. (Male)", value: payload?.filter?.gender ?? "All" },
            age: { label: ageLabel, value: ageValue },
            price: { label: `$${priceValue[0].toLocaleString()} - $${priceValue[1] >= 4000 ? '4,000+' : priceValue[1].toLocaleString()}`, value: priceValue },
            state: { label: payload?.filter?.state ?? "e.g. (New York)", value: payload?.filter?.state ?? "All" },
        } as FilterBoxProps;
    }, [payload?.filter]);


    const [filter, setFilter] = useState<FilterBoxProps>(initialFilters);
    const [showMobileModal, setShowMobileModal] = useState(false);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (showMobileModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showMobileModal]);

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
                <div className="breed d-flex gap-2 border-end align-items-center">
                    <BreedFilter setBreed={setFilter} defaultValue={filter.breed} />
                </div>
                <div className="sex d-flex gap-2 border-end align-items-center">
                    <GenderFilter setGender={setFilter} defaultValue={filter.gender} />
                </div>
                <div className="age d-flex gap-2 border-end flex-shrink-0 align-items-center" style={{ minWidth: '220px' }}>
                    <AgeFilter setAge={setFilter} defaultValue={filter.age} mobile={false} />
                </div>
                <div className="price-range d-flex gap-2 border-end flex-shrink-0 align-items-center" style={{ minWidth: '210px' }}>
                    <PriceFilter setPrice={setFilter as any} mobile={false} />
                </div>
                <div className="state d-flex gap-2 align-items-center">
                    <StateFilter setState={setFilter} defaultValue={filter.state} />
                </div>
                <span
                    onClick={handleSearch}
                    className="btn btn-primary round-48 flex-shrink-0 p-2 d-flex align-items-center justify-content-center align-items-center"
                >
                    <img src="/images/svgs/icon-search.svg" alt="urpuppy-img" />
                </span>
            </div>
        </div>

    ), [filter, setFilter, handleSearch]);

    const handleMobileSearch = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowMobileModal(false);
        handleSearch(e);
    };

    const renderMobileFilters = React.useCallback(() => (
        <>
            <div className="grid-filter-mobile aos-init aos-animate d-grid d-lg-none" data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000">
                <button
                    type="button"
                    className="btn btn-white bg-white py-6 d-flex align-items-center justify-content-between gap-4"
                    onClick={() => setShowMobileModal(true)}
                >
                    <div className="breed d-flex gap-2">
                        <span className="flex-shrink-0">
                            <img src="/images/svgs/icon-breed.svg" alt="urpuppy-img" />
                        </span>
                        <div className="text-start">
                            <h2 className="font-work-sans mb-0">Find your puppy</h2>
                            <p className="mb-0 fs-2 text-muted fw-normal">{renderFilterLabel()}</p>
                        </div>
                    </div>
                    <span
                        onClick={(e) => {
                            e.stopPropagation();
                            handleSearch(e);
                        }}
                        className="btn btn-primary round-48 flex-shrink-0 p-2 d-flex align-items-center justify-content-center"
                    >
                        <img src="/images/svgs/icon-search.svg" alt="urpuppy-img" />
                    </span>
                </button>
            </div>

            <Modal
                show={showMobileModal}
                onHide={() => setShowMobileModal(false)}
                fullscreen
                className="d-lg-none"
                style={{ zIndex: 9999 }}
            >
                <Modal.Header className="d-flex align-items-center justify-content-between border-bottom px-4 py-3 bg-white">
                    <h2 className="font-work-sans mb-0" style={{ color: 'var(--bs-primary)' }}>Find Ur puppy</h2>
                    <button
                        type="button"
                        onClick={() => setShowMobileModal(false)}
                        aria-label="Close"
                        style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '2rem',
                            color: 'var(--bs-primary)',
                            cursor: 'pointer',
                            padding: '0',
                            lineHeight: '1',
                            fontWeight: '300'
                        }}
                    >
                        ×
                    </button>
                </Modal.Header>
                <Modal.Body className="px-4 py-3" style={{ backgroundColor: '#f5f5f0' }}>
                    <div className="breed d-flex gap-2 border-bottom py-6">
                        <BreedFilter setBreed={setFilter} defaultValue={filter.breed} mobile={true} />
                    </div>
                    <div className="sex d-flex gap-2 border-bottom py-6">
                        <GenderFilter setGender={setFilter} defaultValue={filter.gender} mobile={true} />
                    </div>
                    <div className="age d-flex gap-2 border-bottom py-6">
                        <AgeFilter setAge={setFilter} defaultValue={filter.age} mobile={true} />
                    </div>
                    <div className="price-range d-flex gap-2 border-bottom py-6">
                        <PriceFilter setPrice={setFilter as any} mobile={true} />
                    </div>
                    <div className="state d-flex gap-2 py-6">
                        <StateFilter setState={setFilter} defaultValue={filter.state} mobile={true} />
                    </div>
                </Modal.Body>
                <Modal.Footer className="border-top px-4 py-3" style={{ backgroundColor: '#f5f5f0' }}>
                    <button
                        onClick={handleMobileSearch}
                        className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
                        style={{ backgroundColor: 'var(--bs-primary)', color: 'white', padding: '12px' }}
                    >
                        SEARCH
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    ), [filter, setFilter, handleSearch, renderFilterLabel, showMobileModal, handleMobileSearch]);

    return (
        <>
            {isMobile ? renderMobileFilters() : renderDesktopFilters()}
        </>
    );
};

export default FilterBox;
