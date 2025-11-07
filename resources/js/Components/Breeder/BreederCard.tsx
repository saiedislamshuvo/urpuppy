
import { Link } from '@inertiajs/react'
import React from 'react'
import ShareButton from '../ShareButton'


const BreederCard = ({breeder, hasBorder=false }: { breeder: App.Data.BreederFullData, hasBorder?: boolean }) => {
  return (
          <div className="col-lg-6">
            <div className={`card position-relative overflow-hidden ${hasBorder && 'border'}`} data-aos="fade-up" data-aos-delay="300"
              data-aos-duration="1000">
              <div className="row">
                <div className="col-xl-4 d-flex align-items-lg-stretch">
                  <Link aria-label="Click to view breeder" preserveState href={`/breeders/${breeder.slug}`} className="trusted-breeders-img position-relative overflow-hidden w-100">
                    <img loading="lazy" className="w-100 object-fit-cover product-card-responsive-height"
                      src={breeder.company_logo ?? breeder.avatar} alt="urpuppy-img" />
                  </Link>
                </div>
                <div className="col-xl-8 d-flex align-items-lg-stretch">
                  <div
                    className="trusted-breeders-details card-body ps-xl-0 pe-4 d-flex align-items-start justify-content-between gap-3">
                    <div>
                      <Link aria-label="Click to view breeder" preserveState href={`/breeders/${breeder.slug}`}>
                        <h6 className="btn-link fs-5 font-work-sans mb-6">{breeder.company_name}</h6>
                      </Link>
                        {breeder.breeds.length &&
                      <div className="d-flex align-items-center gap-6 mb-6">
                        <img loading="lazy" src="/images/svgs/icon-paws-dark.svg" alt="urpuppy-img" width="24" height="24" />
                        <p className="mb-0">{breeder?.breeds[0]?.name}</p>
                      </div>
    }
                      <div className="d-flex align-items-center gap-6 mb-6">
                        <img loading="lazy" src="/images/svgs/icon-map-pin.svg" alt="urpuppy-img" width="24" height="24" />
                        <p className="mb-0 flex-xl-shrink-1">{breeder.company_address}</p>
                      </div>
                      <div className="d-flex align-items-center gap-6">
                        <img loading="lazy" src="/images/svgs/icon-user-dark.svg" alt="urpuppy-img" width="24" height="24"/>
                        <p className="mb-0">{breeder.full_name}</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-2">

                        <ShareButton slug={breeder.slug} route="breeders" />

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  )
}

export default BreederCard
