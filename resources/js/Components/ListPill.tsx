import React from 'react'

const ListPill = ({ name, href, logo, tab}: {
    name: string,
    href: string,
    logo?: string | undefined
    tab: string

}) => {
  return (
                    <li className="nav-item" role="presentation" >
                        <button className={`nav-link d-flex align-items-center gap-3 rounded-pill d-block w-100 fw-medium text-start ${name === tab ? 'active' : '' } `}
                           data-bs-toggle="pill" data-bs-target={href} type="button" role="tab"
                          aria-controls={href} aria-selected="false"><img src={logo} alt="urpuppy-img" width="20"
                            height="20"/><span className="d-none d-md-block">{name}</span> </button>
                    </li>
  )
}

export default ListPill
