import React from 'react'
import PuppyCard from './Card'
import { Link, usePage } from '@inertiajs/react'
import { FaPaw } from 'react-icons/fa'

const NewArrivals = ({ new_arrivals }: { new_arrivals: App.Data.PuppyCardData[] }) => {
  const { settings } = usePage().props as any;
  const sectionTitle = settings?.arrivals_section_title || "New Arrivals!";
  const buttonText = settings?.arrivals_button_text || "Discover new";
  const buttonLink = settings?.arrivals_button_link || "/puppies";

  return (
    <section className="new-arrivals py-5 ">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h2 className="mb-0" data-aos="fade-right" data-aos-delay="100" data-aos-duration="1000">{sectionTitle}</h2>
          {new_arrivals && new_arrivals.length > 0 && (
            <Link className="btn btn-outline-extralight btn-white bg-white border text-dark d-none d-md-flex align-items-center gap-2"
              href={buttonLink} data-aos="fade-left" data-aos-delay="100" data-aos-duration="1000">{buttonText}</Link>
          )}
        </div>
        {!new_arrivals || new_arrivals.length === 0 ? (
          <div className="text-center py-5" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000">
            <FaPaw className="text-primary mb-3" style={{ fontSize: '3rem', opacity: 0.5 }} />
            <p className="mb-4">No new arrivals at the moment. Check out our available puppies!</p>
            <Link className="btn btn-outline-extralight btn-white bg-white border text-dark d-inline-flex align-items-center gap-2"
              href="/puppies">
              View Puppies for Sale
            </Link>
          </div>
        ) : (
          <>
            <div className="row">
              {new_arrivals.map((puppy: App.Data.PuppyCardData, index) => (
                <PuppyCard location="new-arrivals" key={puppy.slug} className="col-md-6 col-xl-3 mb-4 mb-xl-0" puppy={puppy} height="310px" />
              ))}
            </div>
            <Link className="btn btn-outline-extralight btn-white bg-white border text-dark d-flex d-md-none align-items-center justify-content-center gap-2"
              href={buttonLink} data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000">{buttonText}</Link>
          </>
        )}
      </div>
    </section>


  )
}

export default NewArrivals
