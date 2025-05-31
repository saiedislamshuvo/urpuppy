import React from 'react'

const List = ({label}: {
    label: string
}) => {
  return (
    <div className="hstack gap-3">
      <img src="/images/svgs/icon-check.svg" alt="urpuppy-img" />
      <p className="mb-0">{label}</p>
    </div>
  )
}

export default List
