import React from 'react'

const SemiHeading = ({ title, isRequired }: { title: string, isRequired?: boolean }) => {
  return (
    <h6 className="fs-5 mb-3 pb-1">
      {title}
      {isRequired && <span className="text-danger ms-1">*</span>}
    </h6>
  )
}

export default SemiHeading
