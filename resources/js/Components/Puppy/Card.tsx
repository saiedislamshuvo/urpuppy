import { Link, usePage } from '@inertiajs/react'
import React, { useEffect } from 'react'
import FavoriteButton from '../FavoriteButton'
import Gender from '../Gender'


const PuppyCard = ({puppy, className="col-md-6 col-lg-4 col-xl-3 mb-4", height="225px", location = "card"}:
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
            <div className="puppy-spotlight-item rounded-1 overflow-hidden" data-aos="fade-up" data-aos-delay="600"
              data-aos-duration="1000">

              <Link prefetch  preserveScroll={false} href={`/puppies/${puppy.slug}`} className="puppy-spotlight-img position-relative overflow-hidden d-block d-block">
                <img loading="lazy" src={puppy.image} alt="" className="w-100 object-fit-cover product-card-responsive-height"  />
                <div
                  className="d-flex align-items-center justify-content-between position-absolute top-0 start-0 w-100 p-3 pb-0">
                            {
                                puppy.is_new ?
                                    <span className="puppy-spotlight-img position-relative overflow-hidden d-block">
                  <span className="badge text-bg-success">NEW</span>
                  </span> : <div></div>

                            }
                        <FavoriteButton uniqueId={location + puppy.id} sellerId={puppy.seller.id} puppyId={puppy.id} isFavorite={puppy.is_favorite} />

                </div>
              </Link>
              <div className="puppy-spotlight-details">
                <div className="p-3">
                  <p className="fs-2 mb-1 text-uppercase fw-medium">{puppy.breeds[0]?.name ?? null}</p>
                  <h6 className="fs-6 font-work-sans">{puppy.name}</h6>
                  <div className="row">
                    <div className="col-6">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <img loading="lazy" src="/images/svgs/icon-map-pin.svg" alt="" width="20" height="20" />
                        <p className="mb-0 ">{puppy.seller?.short_address}</p>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <img loading="lazy" src="/images/svgs/icon-calendar.svg" alt="" width="20" height="20" />
                        <p className="mb-0">{puppy.age}</p>
                      </div>
                    </div>
                    <div className="col-6">
                      <Gender gender={puppy.gender} />
                    </div>
                    <div className="col-6">
                      <div className="d-flex align-items-center gap-2">
                        <img loading="lazy" src="/images/svgs/icon-eye.svg" alt="" width="20" height="20" />

                        <p className="mb-0">{puppy.view_count} Views</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-top d-flex align-items-center justify-content-between">
                  <h6 className="fs-5 font-work-sans">{puppy.formatted_price}</h6>
                  <Link prefetch preserveScroll={false}   href={`/puppies/${puppy.slug}`} className="btn btn-primary d-flex align-items-center gap-2" >
                    <img loading="lazy" src="/images/svgs/icon-paws.svg" alt="" />
                    View more
                  </Link>
                </div>
              </div>
            </div>
          </div>


        </>

)}

export default PuppyCard;


