import React from 'react'
import Slider from '../Slider'
import BreedCard from '../Breeds/BreedCard'
import { Link, usePage } from '@inertiajs/react'

const FeaturedBreeds = ({ featured_breeds }: { featured_breeds: App.Data.BreedData[] }) => {
  const { settings } = usePage().props as any;
  const sectionTitle = settings?.featured_section_title || "Featured Breeds";
  const buttonText = settings?.featured_button_text || "View More Breeds";
  const buttonLink = settings?.featured_button_link || "/breeds";

  return (
    <>     <section className="featured-breeds py-7 py-md-9 mb-xl-10">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between mb-4 mb-lg-8">
          <h2 className="mb-0" data-aos="fade-right" data-aos-delay="100" data-aos-duration="1000">{sectionTitle}</h2>
          <Link artia-label="View Details" className="btn btn-outline-extralight btn-white text-dark d-none d-md-flex align-items-center gap-2"
            href={buttonLink} data-aos="fade-left" data-aos-delay="100" data-aos-duration="1000">{buttonText}</Link>
        </div>
        <div className="featured-breeds-slider">
          <div className="owl-carousel owl-theme">


            {featured_breeds && featured_breeds.length > 0 ? (
              <Slider autoplay={true} slidesPerView={1} children={
                featured_breeds.map((breed: App.Data.BreedData) => (
                  <BreedCard key={breed.slug} breed={breed} />
                ))
              } />
            ) : (
              <div className="text-center py-5">
                <p className="mb-0">No featured breeds available at the moment.</p>
              </div>
            )}

          </div>
        </div>
        <Link aria-label="View Details" className="btn btn-outline-extralight btn-white text-dark d-flex d-md-none align-items-center justify-content-center gap-2 mt-4"
          href={buttonLink} data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000">{buttonText}</Link>
      </div>
    </section>
    </>

  )
}

export default FeaturedBreeds
