import React, { useState, useEffect } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateInput = ({ setData, value, name }: { setData: any, value: any, name: string }) => {
    // Convert string value to Date object for the picker
    const [selectedDate, setSelectedDate] = useState<Date | null>(() => {
        if (!value) return null;
        // Try to parse the value as a date
        const date = new Date(value);
        return isNaN(date.getTime()) ? null : date;
    });

    // Update selectedDate when value prop changes
    useEffect(() => {
        if (!value) {
            setSelectedDate(null);
        } else {
            const date = new Date(value);
            setSelectedDate(isNaN(date.getTime()) ? null : date);
        }
    }, [value]);

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        // Format date as YYYY-MM-DD for form submission
        if (date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            setData(name, `${year}-${month}-${day}`);
        } else {
            setData(name, '');
        }
    };

    return (
        <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            className="form-control w-100"
            placeholderText="Select date"
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
            maxDate={new Date()} // Prevent future dates for birth dates
            isClearable
            name={name}
        />
    );
}

export default DateInput
