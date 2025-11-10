import React from 'react'
import BreederCard from '../Breeder/BreederCard'
import { Link, usePage } from '@inertiajs/react'

const TrustedBreeders = ({ breeders }: { breeders: App.Data.BreederFullData[] }) => {
  const { settings } = usePage().props as any;
  const sectionTitle = settings?.trusted_section_title || "Trusted Breeders";
  const buttonText = settings?.trusted_button_text || "Explore All Breeders";
  const buttonLink = settings?.trusted_button_link || "/breeders";

  return (
    <section className="trusted-breeders bg-extralight py-7 py-md-5 py-xl-9">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between mb-4 mb-lg-8">
          <h2 className="mb-0" data-aos="fade-right" data-aos-delay="100" data-aos-duration="1000">{sectionTitle}</h2>
          <Link className="btn btn-outline-extralight btn-white bg-white border text-dark d-none d-md-flex align-items-center gap-2"
            href={buttonLink} data-aos="fade-left" data-aos-delay="200" data-aos-duration="1000">{buttonText}</Link>
        </div>
        {breeders && breeders.length > 0 ? (
          <div className="row">
            {
              breeders.map((breeder: App.Data.BreederFullData) => (
                <BreederCard key={breeder.slug} breeder={breeder} />
              ))
            }
          </div>
        ) : (
          <div className="text-center py-5">
            <p className="mb-0">No trusted breeders available at the moment.</p>
          </div>
        )}
        <Link className="btn btn-outline-extralight btn-white bg-white border text-dark d-flex d-md-none align-items-center justify-content-center gap-2"
          href={buttonLink} data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000">{buttonText}</Link>
      </div>
    </section>
  )
}


export default TrustedBreeders
