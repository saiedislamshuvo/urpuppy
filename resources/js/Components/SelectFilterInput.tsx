import React, { PropsWithChildren } from 'react'
import Select from 'react-select'
import { Option } from './SelectInput'


export const filterStyles = {
    control: (provided: any, state: any) => ({
        ...provided,
        borderRadius: '5px',
        border: 'none',
        width: '100%',
        height: '21px',
        minHeight: 'unset',
        backgroundColor: 'transparent',
        padding: '0px',
        boxShadow: 'none',
        fontSize: '0.875rem',
    }),
    input: (provided: any, state: any) => ({
        ...provided,
        height: '21px',

        width: '150px',
        padding: '0px',
        margin: '0px'
    }),

    singleValue: (provided: any, state: any) => ({
        ...provided,
        color: 'var(--bs-secondary)',
        height: '21px'
    }),


    group: (provided: any, state: any) => ({
        ...provided,
        height: '21px'
    }),



    indicatorsContainer: (provided: any, state: any) => ({
        display: 'none',
        height: '21px'
    }),



    option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isFocused ? 'var(--bs-primary)' : null,
        color: state.isFocused ? 'white' : null,
    }),
}



const SelectFilterInput = ({ options, onChange, styles, ...props }: PropsWithChildren<{
    options: Option[]
    onChange: any
    value?: any
    styles?: any
}>) => {
    return (
        <Select
            styles={styles || filterStyles}
            onChange={onChange}
            value={props.value}
            options={options} />
    )
}

export default SelectFilterInput
