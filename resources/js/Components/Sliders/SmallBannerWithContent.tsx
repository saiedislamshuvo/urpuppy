import React from 'react'

const SmallBannerWithContent = ({
    children,
    pill = "Featured Breed",
    title = "Ang buhay",
    background_image = '/images/breeds-slider/hero-inner-slider-1.jpg'
}: {
    children?: React.ReactNode
    pill?: string
    title?: string
    background_image?: string

}) => {
  return (
              <div className="item d-flex align-items-end pb-5"
                    style={{
                        backgroundImage: `url(${background_image})`,
                    }}
                >
                <div className="container position-relative z-2 pb-4 pb-lg-0">
                  <div>
                    <span className="badge text-bg-info mb-6">{pill}</span>
                    <h1 className="text-white fs-10 mb-3">{title}</h1>
                    <div className="d-lg-flex align-items-center gap-3">
                        {children}
                    </div>
                  </div>
                </div>
                </div>
  )
}

export default SmallBannerWithContent
