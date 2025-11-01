import { LabelHTMLAttributes, ReactNode } from 'react';

export default function InputLabel({
    value,
    className = '',
    isRequired = false,
    children,
    ...props
}: LabelHTMLAttributes<HTMLLabelElement> & { value?: string | ReactNode, isRequired?: boolean }) {
    return (
        <>
        <label
            {...props}
            className={
                `form-label` +
                className
            }
        >
            {value ? value : children}
        </label>
        {isRequired && <span className="text-danger"> *</span>}
        </>
    );
}
