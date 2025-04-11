import React from 'react'
import PuppyCard from './Card'
import { Link } from '@inertiajs/react'

const PuppySpotlight = ({puppy_spotlights}: { puppy_spotlights: App.Data.PuppyCardData[] }) => {
  return (
      <section className="puppy-spotlight bg-extralight py-7 py-md-5 py-xl-9">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between mb-4 mb-lg-8">
          <h2 className="mb-0" data-aos="fade-right" data-aos-delay="100" data-aos-duration="1000">Puppy Spotlight</h2>
          <Link className="btn btn-outline-extralight btn-white bg-white border text-dark d-none d-md-flex align-items-center gap-2"
            href="/puppies" data-aos="fade-left" data-aos-delay="100" data-aos-duration="1000">View More
            Breeds</Link>
        </div>
        <div className="row">
            {puppy_spotlights.map((puppy: App.Data.PuppyCardData) => (
                <PuppyCard location="puppy-spotlight" key={puppy.slug} className="col-md-6 col-xl-3 mb-4 mb-xl-0" puppy={puppy} height="310px" />
            ))}

        </div>
        <Link className="btn btn-outline-extralight btn-white bg-white border text-dark d-flex d-md-none align-items-center justify-content-center gap-2"
          href="/puppies" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000">View More
          Breeds</Link>
      </div>
    </section>


  )
}

export default PuppySpotlight
