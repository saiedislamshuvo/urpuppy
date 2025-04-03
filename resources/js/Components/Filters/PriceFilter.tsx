import React from "react";
import { getTrackBackground, Range } from "react-range";
import { FilterBoxProps } from "../FilterBox";
import { usePage } from "@inertiajs/react";

interface AgeFilterProps {
  setPrice: React.Dispatch<React.SetStateAction<FilterBoxProps>>;
  range?: [number, number]
}

const PriceFilter: React.FC<AgeFilterProps> = ( {setPrice, range = [1, 10000] }) => {

  const price_filter_range = usePage().props.price_filter_range as number[];

  const [priceRange, setValues] = React.useState(price_filter_range);

  const handlePriceChange = (values: any) => {
    setValues(values);
        setPrice((prev) => ({

            ...prev,
            price: { label: `$${ Number(values[0]).toLocaleString() } - $${Number(values[1]).toLocaleString()}`, value: values },


        }))
  };

  return (
  <>
                  <span className="flex-shrink-0"><img src="/images/svgs/icon-dollar.svg" alt="" /></span>
                  <div>
                    <h6 className="font-work-sans mb-0">Price range</h6>
                    <div className="dropdown">
                      <button type="button"
                        className="btn btn-primary p-0 bg-white border-0 text-dark fs-2 fw-normal shadow-none"
                        data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                        <span>e.g. (   ${priceRange[0] } - ${priceRange[1] }   )</span>
                      </button>
                      <div className="dropdown-menu p-3">
    <div
      className="mx-2"
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        position: "relative", // Position relative to contain the labels
      }}
    >
      <Range
        values={priceRange}
        step={0.1}
        min={price_filter_range ? price_filter_range[0] : range[0]}
        max={price_filter_range ? price_filter_range[1] : range[1]}
        onChange={handlePriceChange}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "36px",
              display: "flex",
              width: "100%",
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "5px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values: priceRange,
                  colors: ["#ccc", "var(--bs-primary)", "#ccc"],
                  min: price_filter_range ? price_filter_range[0] : range[0],
                  max: price_filter_range ? price_filter_range[1] : range[1],
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "17px",
              width: "17px",
              borderRadius: "90px",
              boxShadow: "0px 0px 0px 5px rgba(232, 131, 37, 0.2)",
              backgroundColor: "var(--bs-primary)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        )}
      />

      {/* Static Labels */}
      <div
        style={{
          position: "absolute",
          top: "-15px", // Adjust above the slider
          left: "0",
          color: "var(--bs-secondary)",
          fontSize: "12px",
          fontFamily: "Arial, Helvetica Neue, Helvetica, sans-serif",
          padding: "4px",
          borderRadius: "4px",
          backgroundColor: "var(--secondary-color)",
        }}
      >
        <span>$</span>
        {priceRange[0].toLocaleString()}
      </div>
      <div
        style={{
          position: "absolute",
          top: "-15px", // Adjust above the slider
          right: "0",
          color: "var(--bs-secondary)",
          fontSize: "12px",
          fontFamily: "Arial, Helvetica Neue, Helvetica, sans-serif",
          padding: "4px",
          borderRadius: "4px",
          backgroundColor: "var(--secondary-color)",
        }}
      >
        <span>$</span>
        {priceRange[1].toLocaleString()}
      </div>
    </div>
                      </div>
                    </div>
                  </div>
       </>
  );
};

export default PriceFilter;

