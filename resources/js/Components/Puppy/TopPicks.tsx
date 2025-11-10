import React from 'react'
import ImageSlider from '../ImageSlider'
import { Link, usePage } from '@inertiajs/react'
import FavoriteButton from '../FavoriteButton'
import CompareButton from '../CompareButton'
import ShareButton from '../ShareButton'
import Gender from '../Gender'
import List from '../List'

const TopPicks = ({ puppy }: { puppy: App.Data.PuppyData }) => {
  const { settings } = usePage().props as any;
  const sectionTitle = settings?.picks_section_title || "Top Picks For You";

  return (
    <section className="top-picks py-5 pb-4 py-md-9 mb-xl-10">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between mb-4 mb-lg-8">
          <h2 className="mb-0" data-aos="fade-right" data-aos-delay="100" data-aos-duration="1000">{sectionTitle}</h2>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="top-picks-slider mb-4 mb-lg-0" data-aos="fade-right" data-aos-delay="100"
              data-aos-duration="1000">
              <div id="sync1" className="owl-carousel owl-theme mb-4">

                <ImageSlider images={puppy.preview_images || []} />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="top-picks-details ms-xl-8" data-aos="fade-left" data-aos-delay="200" data-aos-duration="1000">
              <div className="d-flex align-items-start justify-content-between">
                <div>
                  <h2 className="fs-10">{puppy.name}</h2>
                </div>
                <div className="d-flex align-items-center gap-6">
                  <CompareButton uniqueId={"top-picks" + puppy.id} sellerId={puppy.seller?.id} puppyId={puppy.id} isCompared={puppy.is_compared} />
                  <FavoriteButton uniqueId={"top-picks" + puppy.id} sellerId={puppy.seller?.id} puppyId={puppy.id} isFavorite={puppy.is_favorite} />

                  <ShareButton slug={puppy.slug} />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-12">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <img src="/images/svgs/icon-map-pin.svg" alt="urpuppy-img" width="20" height="20" />
                    <p className="mb-0">{puppy.state || puppy.seller?.address || 'Location not available'}</p>
                  </div>
                </div>
                <div className="col-12">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <img src="/images/svgs/icon-paws-dark.svg" alt="urpuppy-img" width="20" height="20" />
                    <p className="mb-0">{puppy.breeds[0]?.name}</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center gap-2">
                    <img src="/images/svgs/icon-calendar.svg" alt="urpuppy-img" width="20" height="20" />
                    <p className="mb-0">{puppy.age}</p>
                  </div>
                </div>
                <div className="col-6">
                  <Gender gender={puppy.gender} />
                </div>
                <div className="col-12">
                  <div className="d-flex align-items-center gap-2">
                    <img src="/images/svgs/icon-eye.svg" alt="urpuppy-img" width="20" height="20" />
                    <p className="mb-0">{puppy.view_count} Views</p>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center gap-4 pb-4 mb-4 border-bottom">
                <div>
                  <p className="mb-0 fs-2 fw-medium">Our price</p>
                  <h2 className="mb-0">{puppy.formatted_price}</h2>
                </div>

                <Link prefetch className="btn btn-primary d-flex align-items-center gap-2" href={`/puppies/${puppy.slug}`}>
                  <img src="/images/svgs/icon-paws.svg" alt="urpuppy-img" />
                  View more
                </Link>
              </div>
              <h3 className="mb-3 fs-8">About {puppy.name}</h3>
              <p className="mb-3">{puppy.description}</p>
              {puppy.features && puppy.features.length > 0 &&
                <div className="rounded-pill px-3 py-6 d-flex align-items-center align-items-start gap-6 bg-extralight mb-3">
                  <img src="/images/svgs/icon-heart-plus.svg" alt="urpuppy-img" />
                  <div className="d-flex flex-column gap-2">
                    {puppy.features.map((feature: string, index: number) => (
                      <List label={feature} key={index} />
                    ))}
                  </div>
                </div>
              }
            </div>
          </div>
        </div>

      </div>
    </section>

  )
}

export default TopPicks
