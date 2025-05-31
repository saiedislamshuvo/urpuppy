import React from 'react'
import Slider from '../Slider'
import BreedCard from '../Breeds/BreedCard'
import { Link } from '@inertiajs/react'

const FeaturedBreeds = ({featured_breeds}: { featured_breeds: App.Data.BreedData[] }) => {
  return (
<>     <section className="featured-breeds py-7 py-md-9 mb-xl-10">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between mb-4 mb-lg-8">
          <h2 className="mb-0" data-aos="fade-right" data-aos-delay="100" data-aos-duration="1000">Featured Breeds</h2>
          <Link artia-label="View Details" className="btn btn-outline-extralight btn-white text-dark d-none d-md-flex align-items-center gap-2"
            href="/breeds" data-aos="fade-left" data-aos-delay="100" data-aos-duration="1000">View More
            Breeds</Link>
        </div>
        <div className="featured-breeds-slider">
          <div className="owl-carousel owl-theme">


            <Slider autoplay={true} slidesPerView={1} children={
                        featured_breeds.map((breed: App.Data.BreedData) => (
                            <BreedCard key={breed.slug} breed={breed} />
                        ))
                        }/>

          </div>
        </div>
        <Link aria-label="View Details" className="btn btn-outline-extralight btn-white text-dark d-flex d-md-none align-items-center justify-content-center gap-2 mt-4"
          href="/breeds" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000">View More
          Breeds</Link>
      </div>
    </section>
</>

  )
}

export default FeaturedBreeds
