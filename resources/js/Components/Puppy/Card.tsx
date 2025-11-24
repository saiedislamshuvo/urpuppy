import { Link, usePage } from '@inertiajs/react'
import React, { useEffect } from 'react'
import FavoriteButton from '../FavoriteButton'
import CompareButton from '../CompareButton'
import Gender from '../Gender'


const PuppyCard = ({ puppy, className = "col-md-6 col-lg-4 col-xl-3 mb-4", height = "225px", location = "card" }:
  {
    puppy?: App.Data.PuppyCardData,
    className?: string
    height?: string
    location?: string
  }) => {

  if (!puppy) {
    return null
  }

  // useEffect(() => {
  //     window.scrollTo(0, 0);
  // }, []);
  //
  return (
    <>
      <div className={`${className}`}>
        <div className="h-100 puppy-spotlight-item rounded-1 overflow-hidden" data-aos="fade-up" data-aos-delay="600"
          data-aos-duration="1000">

          <Link prefetch preserveScroll={false} href={`/puppies/${puppy.slug}`} className="puppy-spotlight-img position-relative overflow-hidden d-block d-block">
            <img loading="lazy" src={puppy.image} alt="urpuppy-img" className="w-100 object-fit-cover product-card-responsive-height" style={{ minHeight: "210px" }} />
            <div
              className="d-flex align-items-baseline justify-content-between position-absolute top-0 start-0 w-100 p-3 pb-0">
              <div className="d-flex align-items-center gap-2">
                {
                  puppy.is_new ?
                    <span className="puppy-spotlight-img position-relative overflow-hidden d-block">
                      <span className="badge text-bg-success">NEW</span>
                    </span> : null
                }
              </div>
              <div className="d-flex flex-column gap-2">
                <FavoriteButton uniqueId={location + puppy.id} sellerId={puppy.seller?.id} puppyId={puppy.id} isFavorite={puppy.is_favorite} />
                <CompareButton uniqueId={location + puppy.id} sellerId={puppy.seller?.id} puppyId={puppy.id} isCompared={puppy.is_compared} />
              </div>

            </div>
          </Link>
          <div className="puppy-spotlight-details">
            <div className="p-3">
              {/* <p className="fs-2 mb-1 text-uppercase fw-medium">{puppy.breeds[0]?.name ?? null}</p> */}
              <h3 className="fs-8 font-work-sans">{puppy.name}</h3>
              <div className="row">
                <div className="col-12">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <img loading="lazy" src="/images/svgs/icon-map-pin.svg" alt="urpuppy-img" width="20" height="20" />
                    <p className="mb-0 text-truncate">{`${puppy?.city || ''}${(puppy?.city || '').length > 0 ? ', ' : ''}${puppy?.state || ''}`}</p>
                  </div>
                </div>
                <div className="col-12">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <img loading="lazy" src="/images/svgs/icon-paws-dark.svg" alt="urpuppy-img" width="20" height="20" />
                    <p className="mb-0">{puppy.breeds[0]?.name ?? null}</p>
                  </div>
                </div>
                <div className="col-4">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <img src="/images/svgs/icon-female.svg" alt="urpuppy-img" width="20" height="20" />
                    <p className="mb-0 text-capitalize">{(puppy.gender || '')}</p>
                  </div>
                </div>
                <div className="col-8">
                  <div className="d-flex align-items-center justify-content-end gap-2 mb-2">
                    <img loading="lazy" src="/images/svgs/icon-calendar.svg" alt="urpuppy-img" width="20" height="20" />
                    <p className="mb-0">{puppy.age}</p>
                  </div>
                </div>
                {/* <div className="col-6">
                  <div className="d-flex align-items-center gap-2">
                    <img loading="lazy" src="/images/svgs/icon-eye.svg" alt="urpuppy-img" width="20" height="20" />
                    <p className="mb-0">{puppy.view_count} Views</p>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="p-3 border-top d-flex align-items-center justify-content-between">
              <h3 className="fs-5 font-work-sans">{puppy.formatted_price}</h3>
              <Link prefetch preserveScroll={false} href={`/puppies/${puppy.slug}`} className="btn btn-primary d-flex align-items-center gap-2" >
                <img loading="lazy" src="/images/svgs/icon-paws.svg" alt="urpuppy-img" />
                View more
              </Link>
            </div>
          </div>
        </div>
      </div>


    </>

  )
}

export default PuppyCard;


