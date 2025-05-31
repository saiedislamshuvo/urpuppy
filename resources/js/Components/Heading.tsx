import React from 'react'

const Heading = ({title, description} : {
    title: string,
    description?: string
}) => {
  return (
    <div>
      <h1 className="mb-1 fs-8">{title}</h1>
        {description &&
      <p className="mb-0">{description}</p>
        }
    </div>
  )
}

export default Heading
