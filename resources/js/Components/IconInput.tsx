import React from 'react'

const IconInput = ({icon, onChange, value} : {icon: string, onChange: any, value?: any}) => {
  return (
  <div className="dropdown">
    <button type="button"
      className="btn btn-secondary p-0 shadow-none bg-white border d-flex align-items-center justify-content-center round-36 rounded-circle flex-shrink-0"
      data-bs-toggle="dropdown" aria-expanded="false">
      <img src={icon} alt="urpuppy-img" />
    </button>
    <ul className="dropdown-menu dropdown-menu-end social-icon px-6 shadow-sm"
                    style={{minWidth: "max-content"}}>
      <input value={value} onChange={onChange} type="text" name="ContactPerson" id="ContactPerson" className="form-control" />
    </ul>
  </div>
  )
}

export default IconInput
