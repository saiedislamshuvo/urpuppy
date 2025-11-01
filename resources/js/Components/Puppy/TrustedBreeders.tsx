import React from 'react'
import BreederCard from '../Breeder/BreederCard'
import { Link } from '@inertiajs/react'

const TrustedBreeders = ({breeders} : { breeders: App.Data.BreederFullData[] }) => {
  return (
            <section className="trusted-breeders bg-extralight py-7 py-md-5 py-xl-9">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between mb-4 mb-lg-8">
          <h2 className="mb-0" data-aos="fade-right" data-aos-delay="100" data-aos-duration="1000">Trusted Breeders</h2>
          <Link className="btn btn-outline-extralight btn-white bg-white border text-dark d-none d-md-flex align-items-center gap-2"
            href="/breeders" data-aos="fade-left" data-aos-delay="200" data-aos-duration="1000">Explore All
            Breeders</Link>
        </div>
        <div className="row">
            {
                        breeders.map((breeder: App.Data.BreederFullData) => (
                            <BreederCard key={breeder.slug} breeder={breeder} />
                        ))
                    }
        </div>
        <Link className="btn btn-outline-extralight btn-white bg-white border text-dark d-flex d-md-none align-items-center justify-content-center gap-2"
          href="/breeders" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000">Explore All Breeders</Link>
      </div>
    </section>
    )
    }


export default TrustedBreeders
