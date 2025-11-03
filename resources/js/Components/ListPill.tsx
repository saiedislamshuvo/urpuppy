import React from 'react'
import { Link, usePage } from '@inertiajs/react'

const ListPill = ({ name, href, logo, tab, isRoute = false }: {
  name: string,
  href: string,
  logo?: string | undefined
  tab: string
  isRoute?: boolean
}) => {
  const { url } = usePage();

  // Determine if this tab is active
  let isActive = false;
  if (isRoute) {
    if (href.startsWith('/dashboard')) {
      isActive = url.startsWith('/dashboard');
    } else if (href.includes('tab=')) {
      const tabParam = href.split('tab=')[1].split('&')[0]; // Get tab value, ignoring any additional params
      // Check if URL contains the tab parameter matching this tab name
      isActive = url.includes(`tab=${encodeURIComponent(tabParam)}`) ||
        url.includes(`tab=${encodeURIComponent(name)}`) ||
        (url === '/profile' && name === 'Account Settings' && tab === 'Account Settings');
    } else if (href === '/profile') {
      // Default profile route without tab param should be Account Settings
      isActive = (url === '/profile' && name === 'Account Settings' && !url.includes('tab=')) ||
        (url.includes('/profile') && tab === name);
    } else {
      isActive = url === href || name === tab;
    }
  } else {
    isActive = name === tab;
  }

  if (isRoute) {
    return (
      <li className="nav-item" role="presentation">
        <Link
          href={href}
          className={`nav-link d-flex align-items-center gap-3 rounded-pill d-block w-100 fw-medium text-start ${isActive ? 'active' : ''}`}
          role="tab"
          aria-selected={isActive}
        >
          {logo && <img src={logo} alt="urpuppy-img" width="20" height="20" />}
          <span className="d-none d-md-block">{name}</span>
        </Link>
      </li>
    );
  }

  return (
    <li className="nav-item" role="presentation">
      <button
        className={`nav-link d-flex align-items-center gap-3 rounded-pill d-block w-100 fw-medium text-start ${isActive ? 'active' : ''}`}
        data-bs-toggle="pill"
        data-bs-target={href}
        type="button"
        role="tab"
        aria-controls={href}
        aria-selected={isActive}
      >
        {logo && <img src={logo} alt="urpuppy-img" width="20" height="20" />}
        <span className="d-none d-md-block">{name}</span>
      </button>
    </li>
  )
}

export default ListPill
