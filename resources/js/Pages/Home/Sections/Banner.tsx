import FilterBox from '@/Components/FilterBox'
import React from 'react'
import { usePage } from '@inertiajs/react'

const Banner = ({
  header,
  subheader,
  backgroundImage,
  enable_filter = true,
  size = "lg"
}: {
  header?: string | undefined,
  subheader?: string | undefined,
  backgroundImage?: string | undefined,
  enable_filter?: boolean,
  size?: 'lg' | 'md'
}) => {
  const { settings } = usePage().props as any;

  // Use settings with fallback to props, then to default values
  const displayHeader = header || settings?.hero_title || "Find Ur Perfect Puppy Today!";
  const displaySubheader = subheader || settings?.hero_subtitle || "Find Your Perfect Pup: Healthy, Happy Puppies from Trusted Breeders!";
  const displayBackground = backgroundImage || settings?.hero_background || '/images/banner-img/banner-bg.jpg';

  return (

    <section
      className={
        size == 'lg' ? "z-30 hero-section position-relative d-flex align-items-center" : "hero-section position-relative d-flex align-items-center pt-11 pb-10"
      }
      style={{
        backgroundImage: `url(${displayBackground})`,
      }}
    >
      <div className={
        size == 'lg' ? "container position-relative z-1" : "container position-relative z-1 mt-lg-3"
      }>
        <div className="row justify-content-center">
          <div className="col-xl-10">

            <h1 className="aos-init aos-animate text-white text-center fs-11 mb-1" data-aos="fade-up" data-aos-delay="100"
              data-aos-duration="1000">{displayHeader}</h1>

            <p className=" aos-init aos-animate text-white text-center fs-7 mb-4 mb-lg-5" data-aos="fade-up" data-aos-delay="200"
              data-aos-duration="1000">{displaySubheader}</p>
            {enable_filter &&
              <FilterBox />
            }

          </div>
        </div>
      </div>
    </section>


  )
}

export default Banner
