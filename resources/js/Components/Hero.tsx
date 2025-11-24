import React from 'react'

const Hero = ({ title, bgImage = null, description = null }: { title: string, bgImage?: string | null, description?: string | null }) => {

  return (
    <section
      style={{
        backgroundImage: `url(${bgImage ?? '/images/banner-img/banner-bg.jpg'})`,
      }}
      className="hero-section position-relative d-flex align-items-center pt-11 pb-10">
      <div className="container position-relative z-1 pt-lg-1 mt-lg-3 mb-lg-4">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <h1 className="text-white text-center fs-11 mb-0" data-aos="fade-up" data-aos-delay="100"
              data-aos-duration="1000">{title}</h1>
            {description &&
              <p className="text-white text-center fs-7 mb-0 aos-init aos-animate" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">{description}</p>
            }

          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
