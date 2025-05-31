import { Link } from '@inertiajs/react'
import React from 'react'

const Card = ({post} : {
    post: App.Data.PostData
}) => {
  return (
  <>
                      <div className="col-md-6 col-lg-4 col-xl-3 mb-4">
            <div className="puppy-spotlight-item rounded-1 overflow-hidden" data-aos="fade-up" data-aos-delay="600"
              data-aos-duration="1000">

              <Link aria-label="View Details" prefetch  preserveScroll={false} href={`/posts/${post.slug}`} className="puppy-spotlight-img position-relative overflow-hidden d-block d-block">
                <img loading="lazy" src={post.banner_url} alt="urpuppy-img" className="w-100 object-fit-cover product-card-responsive-height"  />
                <div
                  className="d-flex align-items-center justify-content-between position-absolute top-0 start-0 w-100 p-3 pb-0">
                </div>
              </Link>
              <div className="puppy-spotlight-details">
                <div className="p-3">
                  <p className="fs-2 mb-1 text-uppercase fw-medium">{post.category.name}</p>

              <Link aria-label='View Details' prefetch  preserveScroll={false} href={`/posts/${post.slug}`} className="puppy-spotlight-img position-relative overflow-hidden d-block d-block">
                  <h3 className="fs-6 font-work-sans">{post.title}</h3>
              </Link>
                  <div className="row">


                    <div className="col-12">

                                    {
                                        post.excerpt &&

                     <p className="mb-3">{post.excerpt.length > 100 ? post.excerpt.substring(0, 93) + '...' : post.excerpt}</p>
                                    }
                    </div>

                    <div className="col-12">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <img loading="lazy" src="/images/svgs/icon-user-circle.svg" alt="urpuppy-img" className="rounded-circle" width="18"  height="18" />
                        <p className="mb-0">{post.author.name}</p>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <img loading="lazy" src="/images/svgs/icon-calendar.svg" alt="urpuppy-img" width="20" height="20" />
                        <p className="mb-0">{post.published_at_formatted}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>



        </>

  )
}

export default Card
