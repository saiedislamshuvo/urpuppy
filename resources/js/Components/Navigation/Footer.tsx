import { Link, usePage } from '@inertiajs/react'
import React from 'react'

const Footer = () => {
    const user = usePage().props.auth.user
  return (
        <footer className="footer bg-secondary">
    <div className="container">
      <div className="footer-wrapper pt-7 pt-md-9 pt-lg-10 pb-md-5 pb-lg-5">
        <div className="row">
          <div className="col-md-4 col-lg-2 mb-7 pb-1 pb-lg-0 mb-lg-0">
            <div className="footer-logo">
              <Link href="/">
                <img loading="lazy" src="/logo.svg" alt="urpuppy-img" />
              </Link>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-2 mb-7 pb-1 pb-lg-0 mb-lg-0 ps-lg-7">
            <h6 className="fw-semibold font-work-sans mb-6 text-white">Find A Puppy</h6>
            <ul className="list-unstyled footer-memu mb-0">
              <li className="mb-6">
                <Link href="/puppies" className="fs-3 d-block fw-normal">View All Puppies</Link>
              </li>
              <li>
                <Link href="/breeds" className="fs-3 d-block fw-normal">View All Breeds</Link>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md-4 col-lg-2 mb-7 pb-1 pb-lg-0 mb-lg-0">
            <h6 className="fw-semibold font-work-sans mb-6 text-white">Customers</h6>
            <ul className="list-unstyled footer-memu mb-0">
                {
                     (user?.roles?.includes('breeder') || !user) &&

              <li>
               <Link href="/breeders/create" className="fs-3 d-block fw-normal">Breeder Register</Link>
              </li>

                                }
            </ul>
          </div>
          <div className="col-6 col-md-4 col-lg-2 mb-7 pb-1 pb-lg-0 mb-lg-0">
            <h6 className="fw-semibold font-work-sans mb-6 text-white">About urpuppy</h6>
            <ul className="list-unstyled footer-memu mb-0">
              <li className="mb-6">
                <Link href="/posts" className="fs-3 d-block fw-normal">Blog</Link>
              </li>
              <li className="mb-6">
                <Link href="/about-us" className="fs-3 d-block fw-normal">About Us</Link>
              </li>
              <li>
                <Link href="/contact-us" className="fs-3 d-block fw-normal">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md-4 col-lg-2 mb-7 pb-1 pb-lg-0 mb-lg-0">
            <h6 className="fw-semibold font-work-sans mb-6 text-white">Other</h6>
            <ul className="list-unstyled footer-memu mb-0">
              <li className="mb-6">
                <Link href="/privacy-policy" className="fs-3 d-block fw-normal">Privacy Policy</Link>
              </li>
              <li className="mb-6">
                <Link href="/terms-of-use" className="fs-3 d-block fw-normal">Terms of Use</Link>
              </li>

            </ul>
          </div>
          <div className="col-md-4 col-lg-2 mb-7 pb-1 pb-lg-0 mb-lg-0">
            <h6 className="fw-semibold font-work-sans mb-6 text-white">Socials</h6>
            <ul className="list-unstyled d-flex align-items-center gap-6 social-icon mb-0">
              <li>
                <a href="https://x.com/UrpuppyDotCom" data-bs-toggle="tooltip" data-bs-title="Twitter" className="bg-white bg-opacity-10 d-flex align-items-center justify-content-center round-40 rounded-circle">
                  <img loading="lazy" src="/images/svgs/icon-twitter.svg" alt="urpuppy-img" />
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/UrPuppyLLC" target="_blank" data-bs-toggle="tooltip" data-bs-title="Facebook" className="bg-white bg-opacity-10 d-flex align-items-center justify-content-center round-40 rounded-circle">
                  <img loading="lazy" src="/images/svgs/icon-facebook.svg" alt="urpuppy-img" />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/urpupppydotcom" data-bs-toggle="tooltip" data-bs-title="Instagram" className="bg-white bg-opacity-10 d-flex align-items-center justify-content-center round-40 rounded-circle">
                  <img loading="lazy" src="/images/svgs/icon-instagram.svg" alt="urpuppy-img" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-top   border-white border-opacity-10 py-3 d-md-flex align-items-center justify-content-center">
        <p className="d-flex align-items-center gap-2  mb-md-0 text-white fw-normal  opacity-50"><span> ©2025 Urpuppy.com, LLC. All Rights Reserved </span>


                    </p>


      </div>
    </div>
  </footer>

  )
}

export default Footer
