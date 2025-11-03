import { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '../ApplicationLogo';
import AccountDropdownButton from './AccountDropdownButton';

const Navbarv2 = ({ type }: { type?: string | undefined }) => {

  const [isSticky, setIsSticky] = useState(false);
  const [_, setIsOffcanvasVisible] = useState(false);
  let offcanvasInstance: any = null;

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const sidebar = document.getElementById('offcanvasSidebar');
      if (sidebar) {
        import('bootstrap').then(({ Offcanvas }) => {
          offcanvasInstance = Offcanvas.getOrCreateInstance(sidebar);
        });
      }
    }
  }, []); // This effect runs only once when the component mounts

  const page = usePage().url;

  const toggleOffcanvas = () => {
    if (typeof document !== 'undefined') {
      const sidebar = document.getElementById('offcanvasSidebar');
      if (!sidebar) {
        return;
      }

      setIsOffcanvasVisible((prev) => !prev);
    }
  };


  const closeOffcanvas = () => {
    setIsOffcanvasVisible(false);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsSticky(window.scrollY > 50);
    }

    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    // Add scroll event listener with passive mode for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const user = usePage().props.auth.user;

  return (
    <header className={`main-header ${type == 'secondary' ? 'information-header' : ''} ${isSticky ? 'sticky' : ''}`}>
      <div className="container">
        <nav className="navbar navbar-expand-xl py-0">
          <div className="logo">

            <ApplicationLogo />
          </div>
          <div className="d-xl-none d-flex align-items-center gap-3">

            {(user?.roles?.includes('buyer')) && <>
              <Link aria-label="Favorites" className="position-relative me-1 d-xl-none" href="/favorites">
                <img src="/icon-heart-white.svg" alt="urpuppy-img" />
              </Link>
              <AccountDropdownButton user={user} /> </>}
            <span
              className="d-inline-block d-xl-none nav-toggler text-decoration-none fs-9 text-white"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasSidebar"
              aria-controls="offcanvasSidebar"
              onClick={toggleOffcanvas}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-menu-2"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 6l16 0" /><path d="M4 12l16 0" /><path d="M4 18l16 0" /></svg>
            </span>
          </div>
          <div className="collapse navbar-collapse justify-content-between" id="menu-scroll">
            <ul className="navbar-nav align-items-center">
              <li className="nav-item nav-item-line ms-4"></li>
              <li className="nav-item">
                <Link aria-label="Puppies for Sale" prefetch className={`nav-link ${page.startsWith('/puppies') ? 'active' : ''}`} href="/puppies">
                  Puppies for Sale
                </Link>
              </li>
              <li className="nav-item">
                <Link aria-label="Breeds" prefetch className={`nav-link ${page.startsWith('/breeds') ? 'active' : ''}`} href="/breeds">
                  Breeds
                </Link>
              </li>
              <li className="nav-item">
                <Link aria-label="Breeders" prefetch className={`nav-link ${page.startsWith('/breeders') ? 'active' : ''}`} href="/breeders">
                  Breeders
                </Link>
              </li>

              {
                (user?.is_breeder || user?.is_seller || !user) &&
                <li className="nav-item">
                  <Link aria-label="List Ur Puppy" prefetch className={`nav-link ${page == '/seller/create' ? 'active' : ''}`} aria-current="page" href="/seller/create">
                    + List Ur Puppy
                  </Link>
                </li>
              }
            </ul>
            <div className="d-flex align-items-center gap-6">


              {user ? (
                <>
                  <Link aria-label="Favorites" className="position-relative me-1" href="/favorites">
                    <img src="/icon-heart-white.svg" alt="urpuppy-img" />
                  </Link>

                  <AccountDropdownButton user={user} />
                </>
              ) : (
                <>
                  {!user && <>
                    <Link aria-label="Login" preserveScroll={false} prefetch className="btn btn-white bg-white text-dark" href="/login">
                      Login
                    </Link>
                    <Link aria-label="Sign Up" preserveScroll={false} prefetch className="btn btn-primary d-flex align-items-center gap-2" href="/register">
                      <img src="/icon-user.svg" alt="urpuppy-img" /> Sign Up
                    </Link>

                  </>}

                </>
              )
              }
            </div>
          </div>
        </nav>
      </div>

      <div
        className={`offcanvas offcanvas-start `}

        tabIndex={-1}
        id="offcanvasSidebar" aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header">
          <div className="logo">
            <Link aria-label='urpuppy' className="navbar-brand py-0 me-0" href="/">
              <img src="/logo.svg" alt="urpuppy-img" />
            </Link>
          </div>
          <button
            type="button"
            className="btn-close shadow-none text-reset ms-auto btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={closeOffcanvas}
          ></button>
        </div>
        <div className="offcanvas-body pt-0">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link aria-label="Puppies for Sale" prefetch className="nav-link text-white" href="/puppies">
                Puppies for Sale
              </Link>
            </li>
            <li className="nav-item">
              <Link aria-label="Breeds" prefetch className="nav-link text-white" href="/breeds">
                Breeds
              </Link>
            </li>
            <li className="nav-item">
              <Link aria-label="Breeders" prefetch className="nav-link text-white" href="/breeders">
                Breeders
              </Link>
            </li>
            {
              (user?.roles?.includes('seller') || !user) &&
              <li className="nav-item">
                <Link aria-label="List Ur Puppy" prefetch className="nav-link text-white" href="/seller/create">
                  + List Ur Puppy
                </Link>
              </li>
            }

            {user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" href="/profile">
                    Profile
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    method="post"
                    as="button"
                    href="/logout"
                    style={{
                      background: 'transparent',
                      color: 'white',
                      margin: '0',
                      padding: '0',
                      border: 'none'
                    }}
                  >
                    Logout
                  </Link>
                </li>
              </>
            )

            }
          </ul>

          {!user && (

            <div className="d-flex align-items-center flex-column gap-3 mt-4">

              <Link aria-label="Login" preserveScroll={false} prefetch className="btn btn-white bg-white text-dark w-100" href="/login">
                Login
              </Link>
              <Link aria-label="Sign Up" preserveScroll={false} prefetch className="btn btn-primary d-flex align-items-center justify-content-center gap-2 w-100" href="/register">
                <img src="/icon-user.svg" alt="urpuppy-img" /> Sign Up
              </Link>
            </div>

          )}
        </div>
      </div>
    </header>
  );
};

export default Navbarv2;

