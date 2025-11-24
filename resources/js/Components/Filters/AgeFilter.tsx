import React, { useMemo, useCallback, memo, useEffect } from 'react';
import { FilterBoxProps } from '../FilterBox';
import { getTrackBackground, Range } from 'react-range';
import { usePage } from '@inertiajs/react';

interface AgeFilterProps {
  setAge: React.Dispatch<React.SetStateAction<FilterBoxProps>>;
  range?: [number, number];
  mobile?: boolean;
  defaultValue?: any;
}

const AgeFilter: React.FC<AgeFilterProps> = ({ setAge, range = [0, 18], mobile = false, defaultValue }) => {
  const { props } = usePage();
  const age_filter_range = props.age_filter_range as [number, number] | undefined;

  // Ensure values are valid and sorted
  const normalizeRange = (val: [number, number] | undefined): [number, number] => {
    if (!val || !Array.isArray(val) || val.length !== 2) {
      return [0, 18];
    }
    const [a, b] = [Number(val[0]) || 0, Number(val[1]) || 18];
    // Ensure values are sorted (first <= second)
    return a <= b ? [a, b] : [b, a];
  };

  const [ageRange, setValues] = React.useState<[number, number]>(() => {
    // Priority: defaultValue > age_filter_range > range
    if (defaultValue?.value && Array.isArray(defaultValue.value)) {
      return normalizeRange(defaultValue.value);
    }
    return normalizeRange(age_filter_range || range);
  });

  // Update when defaultValue or age_filter_range changes (only from props, not from user interaction)
  useEffect(() => {
    if (defaultValue?.value && Array.isArray(defaultValue.value)) {
      const normalized = normalizeRange(defaultValue.value);
      setValues(normalized);
    } else if (age_filter_range) {
      const normalized = normalizeRange(age_filter_range);
      setValues(normalized);
    }
  }, [defaultValue, age_filter_range]);

  // Memoized min and max values
  const [min, max] = useMemo(() => [
    0,
    18
  ], []);

  // Memoized track background
  const trackBackground = useMemo(() => getTrackBackground({
    values: ageRange,
    colors: ['#ccc', 'var(--bs-primary)', '#ccc'],
    min,
    max,
  }), [ageRange, min, max]);

  // Optimized age change handler
  const handleAgeChange = useCallback((values: number[]) => {
    // Ensure values are sorted and valid
    const sortedValues = [...values].sort((a, b) => a - b) as [number, number];
    setValues(sortedValues);

    const ageLabel = sortedValues[1] >= 18
      ? `0 - 18 MONTHS+`
      : `${sortedValues[0]} - ${sortedValues[1]} MONTHS`;

    setAge(prev => ({
      ...prev,
      age: {
        label: ageLabel,
        value: sortedValues
      },
    }));
  }, [setAge]);

  const renderThumb = useCallback(({ props }: { props: any }) => {
    const { key, ...restProps } = props;
    return (
      <div
        key={key}
        {...restProps}
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

  const renderTrack = useCallback(({ props, children }: { props: any; children: React.ReactNode }) => {
    const { ref, onMouseDown, onTouchStart, style, ...restProps } = props;
    return (
      <div
        {...restProps}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        style={{
          ...style,
          height: '50px',
          display: 'flex',
          width: '100%',
        }}
      >
        <div
          ref={ref}
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
    );
  }, [trackBackground]);

  // Memoized age display
  const ageDisplay = useMemo(() => {
    if (ageRange[1] >= 18) {
      return '0 - 18 MONTHS+';
    }
    return `${ageRange[0]} - ${ageRange[1]} MONTHS`;
  }, [ageRange]);

  // Render age range slider
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
        values={ageRange && ageRange.length === 2 ? ageRange : [0, 18]}
        step={1}
        min={min}
        max={max}
        onChange={handleAgeChange}
        renderTrack={renderTrack}
        renderThumb={renderThumb}
        allowOverlap={false}
      />

      {/* Age labels */}
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
        {ageRange[0]} Months
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
        {ageRange[1] >= 18 ? '18 Months+' : `${ageRange[1]} Months`}
      </div>
    </div>
  );

  return (
    <>
      <span className="flex-shrink-0">
        <img src="/images/svgs/icon-calendar.svg" alt="urpuppy-img" />
      </span>
      <div className={`${mobile ? 'w-100' : ''}`}>
        <h6 className={`font-work-sans ${mobile ? 'mb-3' : 'mb-0'}`}>Age Range</h6>
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
              <span>e.g. ({ageDisplay})</span>
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

export default memo(AgeFilter);

