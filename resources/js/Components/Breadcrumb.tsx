import { Link } from '@inertiajs/react'
import React from 'react'

export interface BreadcrumbLink {
    link?: string
    label: string
}

const Breadcrumb = ({
    links = []
}: {
        links: BreadcrumbLink[]
    }) => {

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb align-items-center mb-4">
        {/* Home Breadcrumb */}
        <li className="breadcrumb-item fw-semibold d-flex align-items-center">
          <Link className="text-dark d-flex align-items-center" href="/">
            <img src="/images/svgs/icon-home.svg" alt="urpuppy-img" width="16" height="16" />
          </Link>
        </li>

        {/* Other Breadcrumbs */}
        {links.map((link, index) => {
          const isLast = index === links.length - 1;
          return (
            <li
              key={index}
              className={`breadcrumb-item fw-semibold d-flex align-items-center ${isLast ? 'active' : ''}`}
              aria-current={isLast ? 'page' : undefined}
            >
              {isLast ? (
                <span className="text-muted">{link.label}</span>
              ) : (
                <Link className="text-dark d-flex align-items-center" href={link?.link ?? ""}>
                  {link.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumb

