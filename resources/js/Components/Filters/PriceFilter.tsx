import React, { useMemo, useCallback, memo } from 'react';
import { getTrackBackground, Range } from 'react-range';
import { usePage } from '@inertiajs/react';

interface FilterBoxProps {
  price?: {
    label: string;
    value: [number, number];
  };
  // Add other filter properties if needed
}

interface PriceFilterProps {
  setPrice: React.Dispatch<React.SetStateAction<FilterBoxProps>>;
  range?: [number, number];
  mobile?: boolean;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ setPrice, range = [1, 10000], mobile = false }) => {
  const { props } = usePage();
  const price_filter_range = props.price_filter_range as [number, number] | undefined;

  const [priceRange, setValues] = React.useState<[number, number]>(
    price_filter_range || range
  );

  // Memoized min and max values
  const [min, max] = useMemo(() => [
    price_filter_range?.[0] ?? range[0],
    price_filter_range?.[1] ?? range[1]
  ], [price_filter_range, range]);

  // Memoized track background
  const trackBackground = useMemo(() => getTrackBackground({
    values: priceRange,
    colors: ['#ccc', 'var(--bs-primary)', '#ccc'],
    min,
    max,
  }), [priceRange, min, max]);

  // Optimized price change handler
  const handlePriceChange = useCallback((values: number[]) => {
    const newValues = values as [number, number];
    setValues(newValues);
    setPrice(prev => ({
      ...prev,
      price: {
        label: `$${Number(newValues[0]).toLocaleString()} - $${Number(newValues[1]).toLocaleString()}`,
        value: newValues
      },
    }));
  }, [setPrice]);

  const renderThumb = useCallback(({ props }: { props: any }) => {
    const { key, ...restProps } = props; // Extract key and keep the rest
    return (
      <div
        key={key}  // Pass key directly
        {...restProps} // Spread the rest
        style={{
          ...restProps.style,
          height: '17px',
          width: '17px',
          borderRadius: '90px',
          boxShadow: '0px 0px 0px 5px rgba(232, 131, 37, 0.2)',
          backgroundColor: 'var(--bs-primary)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    );
  }, []);

  // Memoized track render
  const renderTrack = useCallback(({ props, children }: { props: any; children: React.ReactNode }) => (
    <div
      onMouseDown={props.onMouseDown}
      onTouchStart={props.onTouchStart}
      style={{
        ...props.style,
        height: '50px',
        display: 'flex',
        width: '100%',
      }}
    >
      <div
        ref={props.ref}
        style={{
          height: '8px',
          width: '100%',
          borderRadius: '4px',
          background: trackBackground,
          alignSelf: 'center',
        }}
      >
        {children}
      </div>
    </div>
  ), [trackBackground]);

  // Memoized price display
  const priceDisplay = useMemo(() => (
    `$${priceRange[0].toLocaleString()} - $${priceRange[1].toLocaleString()}`
  ), [priceRange]);

  // Render price range slider directly (mobile)
  const renderDirectRange = () => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        position: 'relative',
        width: '100%',
        paddingTop: '0px',
        paddingBottom: '0px',
      }}
    >
      <Range
        values={priceRange}
        step={1}
        min={min}
        max={max}
        onChange={handlePriceChange}
        renderTrack={renderTrack}
        renderThumb={renderThumb}
      />

      {/* Price labels */}
      <div
        style={{
          position: 'absolute',
          top: '-15px',
          left: '0',
          color: 'var(--bs-secondary)',
          fontSize: '12px',
          fontFamily: 'Arial, Helvetica Neue, Helvetica, sans-serif',
          padding: '4px',
          borderRadius: '4px',
          backgroundColor: 'var(--secondary-color)',
        }}
      >
        ${priceRange[0].toLocaleString()}
      </div>
      <div
        style={{
          position: 'absolute',
          top: '-15px',
          right: '0',
          color: 'var(--bs-secondary)',
          fontSize: '12px',
          fontFamily: 'Arial, Helvetica Neue, Helvetica, sans-serif',
          padding: '4px',
          borderRadius: '4px',
          backgroundColor: 'var(--secondary-color)',
        }}
      >
        ${priceRange[1].toLocaleString()}
      </div>
    </div>
  );

  return (
    <>
      <span className="flex-shrink-0">
        <img src="/images/svgs/icon-dollar.svg" alt="Price filter" />
      </span>
      <div className={`${mobile ? 'w-100' : ''}`}>
        <h6 className={`font-work-sans ${mobile ? 'mb-3' : 'mb-0'}`}>Price Range</h6>
        {mobile ? (
          renderDirectRange()
        ) : (
          <div className="dropdown">
            <button
              type="button"
              className="btn btn-primary p-0 bg-white border-0 text-dark fs-2 fw-normal shadow-none"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-bs-auto-close="outside"
            >
              <span>e.g. ({priceDisplay})</span>
            </button>
            <div className="dropdown-menu p-3">
              {renderDirectRange()}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default memo(PriceFilter);
