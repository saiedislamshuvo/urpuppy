import FilterBox from '@/Components/FilterBox'
import React from 'react'

const Banner = ({
    header = "Find Ur Perfect Puppy Today!",
    subheader = "Find Your Perfect Pup: Healthy, Happy Puppies from Trusted Breeders!",
    enable_filter = true,
    size = "lg"
}: {
        header?: string | undefined,
        subheader?: string | undefined,
        enable_filter?: boolean,
        size?: 'lg' | 'md'
    }) => {
  return (

                    <section className={
                size == 'lg' ? "z-30 hero-section position-relative d-flex align-items-center" : "hero-section position-relative d-flex align-items-center pt-11 pb-10"
            }>
                                    <div className={
                size == 'lg' ? "container position-relative z-1" : "container position-relative z-1 mt-lg-3"
            }>
        <div className="row justify-content-center">
          <div className="col-xl-10">

            <h1 className="aos-init aos-animate text-white text-center fs-11 mb-1" data-aos="fade-up" data-aos-delay="100"
              data-aos-duration="1000">{header}</h1>

            <p className=" aos-init aos-animate text-white text-center fs-7 mb-4 mb-lg-5" data-aos="fade-up" data-aos-delay="200"
              data-aos-duration="1000">{subheader}</p>
                    {enable_filter &&
                        <FilterBox/>
                        }

          </div>
        </div>
      </div>
    </section>


  )
}

export default Banner
