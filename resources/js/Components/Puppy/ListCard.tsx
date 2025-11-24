import { Link, usePage } from '@inertiajs/react'
import React from 'react'
import FavoriteButton from '../FavoriteButton'
import CompareButton from '../CompareButton'
import Gender from '../Gender'

const ListCard = ({ puppy, className = "mb-3", location = "list" }:
    {
        puppy?: App.Data.PuppyCardData,
        className?: string
        location?: string
    }) => {

    if (!puppy) {
        return null
    }

    return (
        <div className={`${className}`}>
            <div className="puppy-spotlight-item rounded-1 overflow-hidden bg-white shadow-sm" data-aos="fade-up" data-aos-delay="600"
                data-aos-duration="1000">
                <div className="d-flex">
                    {/* Image Section */}
                    <Link prefetch preserveScroll={false} href={`/puppies/${puppy.slug}`} className="puppy-spotlight-img position-relative overflow-hidden d-block flex-shrink-0" style={{ width: '150px', minWidth: '140px' }}>
                        <img loading="lazy" src={puppy.image} alt="urpuppy-img" className="w-100 h-100 object-fit-cover" style={{ minHeight: "140px" }} />
                        <div className="d-flex align-items-baseline justify-content-between position-absolute top-0 start-0 w-100 p-2">
                            <div className="d-flex align-items-center gap-1 flex-wrap">
                                {
                                    puppy.is_new ?
                                        <span className="badge text-bg-success" style={{ fontSize: '0.65rem' }}>NEW</span> : null
                                }
                                {/* {
                                    (puppy.state || (puppy.seller as any)?.short_state || (puppy.seller as any)?.company_short_state) ?
                                        <span className="badge text-bg-success" style={{ fontSize: '0.65rem' }}>
                                            {puppy.state || (puppy.seller as any)?.short_state || (puppy.seller as any)?.company_short_state}
                                        </span> : null
                                } */}
                                
                            </div>
                        </div>
                    </Link>

                    {/* Content Section */}
                    <div className="puppy-spotlight-details flex-grow-1 d-flex flex-column">
                        <div className="px-3 pt-2 flex-grow-1 d-flex flex-column">
                            {/* Header with Favorite and Compare buttons */}
                            <div className="d-flex align-items-center justify-content-between mb-0">
                                <h3 className="fs-8 font-work-sans mb-0 flex-grow-1">{puppy.name}</h3>
                                <div className="d-flex gap-1 flex-shrink-0">
                                    <FavoriteButton uniqueId={location + puppy.id} sellerId={puppy.seller?.id} puppyId={puppy.id} isFavorite={puppy.is_favorite} />
                                    <CompareButton uniqueId={location + puppy.id} sellerId={puppy.seller?.id} puppyId={puppy.id} isCompared={puppy.is_compared} />
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="row g-2 mb-2">
                                <div className="col-12">
                                    {/* Location */}
                                    <div className="d-flex align-items-center gap-2 mb-0">
                                        <img loading="lazy" src="/images/svgs/icon-map-pin.svg" alt="urpuppy-img" width="16" height="16" />
                                        <p className="mb-0 small">{`${puppy?.city || ''}${(puppy?.city || '').length > 0 ? ', ' : ''}${puppy?.state || ''}`}</p>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="d-flex align-items-center gap-2">
                                        <img loading="lazy" src="/images/svgs/icon-paws-dark.svg" alt="urpuppy-img" width="16" height="16" />
                                        <p className="mb-0 small">{puppy.breeds[0]?.name ?? null}</p>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="d-flex align-items-center gap-2">
                                        <img src="/images/svgs/icon-female.svg" alt="urpuppy-img" width="16" height="16" />
                                        <p className="mb-0 small text-capitalize">{puppy.gender}</p>
                                    </div>
                                </div>
                                <div className="col-8">
                                    <div className="d-flex align-items-center justify-content-end gap-2">
                                        <img loading="lazy" src="/images/svgs/icon-calendar.svg" alt="urpuppy-img" width="16" height="16" />
                                        <p className="mb-0 small">{puppy.age}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer with Price and Button */}
                        <div className="px-3 py-2 border-top d-flex align-items-center justify-content-between gap-2">
                            <h3 className="fs-5 font-work-sans mb-0">{puppy.formatted_price}</h3>
                            <Link prefetch preserveScroll={false} href={`/puppies/${puppy.slug}`} className="btn btn-primary btn-sm d-flex align-items-center gap-1 flex-shrink-0" >
                                <img loading="lazy" src="/images/svgs/icon-paws.svg" alt="urpuppy-img" width="14" height="14" />
                                <span>View</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListCard;

