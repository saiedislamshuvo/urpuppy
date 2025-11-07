import React from 'react'
import PuppyCard from './Card'
import { Link } from '@inertiajs/react'

const NewArrivals = ({ new_arrivals }: { new_arrivals: App.Data.PuppyCardData[] }) => {
  return (
    <section className="new-arrivals py-5 ">
      <div className="container py-xl-9">
        <div className="d-flex align-items-center justify-content-between mb-4 mb-lg-8">
          <h2 className="mb-0" data-aos="fade-right" data-aos-delay="100" data-aos-duration="1000">New Arrivals!</h2>
          <Link className="btn btn-outline-extralight btn-white bg-white border text-dark d-none d-md-flex align-items-center gap-2"
            href="/puppies" data-aos="fade-left" data-aos-delay="100" data-aos-duration="1000">Discover new</Link>
        </div>
        <div className="row">
          {new_arrivals.map((puppy: App.Data.PuppyCardData, index) => (
            <PuppyCard location="new-arrivals" key={puppy.slug} className="col-md-6 col-xl-3 mb-4 mb-xl-0" puppy={puppy} height="310px" />
          ))}

        </div>
        <Link className="btn btn-outline-extralight btn-white bg-white border text-dark d-flex d-md-none align-items-center justify-content-center gap-2"
          href="/breeds" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000">View More
          Breeds</Link>
      </div>
    </section>


  )
}

export default NewArrivals
