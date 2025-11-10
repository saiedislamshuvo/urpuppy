import { Link } from '@inertiajs/react'
import React from 'react'
import InitialName from '../InitialName'
import Avatar from '../Avatar'

const AccountDropdownButton = ({ user }: { user: App.Data.UserData }) => {
  // Determine the user's role
  const getRole = (): string => {
    // Fallback to role determination based on flags
    if (user.is_breeder) {
      return 'Breeder';
    }
    if (user.is_seller) {
      return 'Seller';
    }
    if(user.is_superadmin) {
      return 'Super Admin';
    }
    if(user.is_admin) {
      return 'Admin';
    }
    return 'Buyer';
  };

  const role = getRole();

  return (

    <div className="dropdown position-relative user-profile-dropdown">
      <a rel='nofollow' className="btn btn-primary p-0 round-44 overflow-hidden rounded-circle d-flex align-items-center justify-content-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <Avatar image_url={user.avatar} initial_name={user.initial_name} size={'sm'} />
      </a>
      <ul className="dropdown-menu dropdown-menu-end p-3" style={{
        width: 'max-content'
      }} >
        <div className="border-bottom pb-2">
          <h5 className="mb-0">{role} Profile</h5>
        </div>
        <div className="d-flex align-items-center gap-6 my-4">
          <Avatar image_url={user.avatar} initial_name={user.initial_name} size={'sm'} />
          <div>
            <h6 className="mb-0">{user.full_name}</h6>
            <p className="mb-0 fs-2 d-flex align-items-center gap-2">
              <img src="/images/svgs/icon-mail-dark.svg" alt="urpuppy-img" width="14" />
              <a rel='nofollow' className="text-muted" href="mailto:support@urpuppy.com">{user.email}</a>
            </p>
          </div>
        </div>
        {
          (user?.is_seller || user?.is_breeder) &&
          <li><Link aria-label="Dashboard" prefetch className="dropdown-item rounded py-2" href="/dashboard">Dashboard</Link></li>
        }
        <li><Link aria-label="Settings" prefetch className="dropdown-item rounded py-2" href="/profile">Settings</Link></li>
        {
          (user?.is_seller || user?.is_breeder) &&
          <li><Link aria-label="My Subscription" className="dropdown-item rounded py-2" href="/my-subscription">My Subscriptions</Link></li>
        }
        {
          !(user?.is_seller || user?.is_breeder) &&
          <li><Link aria-label="Saved Search" className="dropdown-item rounded py-2" href="/profile?tab=Saved Search">Saved Search</Link></li>
        }
        {

          (user?.is_seller || user?.is_breeder) &&
          <li><Link aria-label="My Puppies" className="dropdown-item rounded py-2" href="/profile?tab=My Puppies">My Puppies</Link></li>
        }

        <div className="mt-3">
          <Link
            aria-label="Logout"
            method="post"
            as="button"
            href="/logout"
            className="btn btn-primary d-block w-100"
          >
            Logout
          </Link>
        </div>
      </ul>
    </div>
  )
}

export default AccountDropdownButton
