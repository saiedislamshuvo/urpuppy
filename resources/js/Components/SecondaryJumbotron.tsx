import React from 'react'

const SecondaryJumbotron = () => {
  return (
                <div className="row">
          <div className="col-lg-4">
            <h2 className="fs-10 mb-5 mb-lg-0">Why Choose UrPuppy.com?</h2>
          </div>
          <div className="col-lg-8">
            <div className="row">
              <div className="col-md-4 mb-7 mb-md-0">
                <img src="../images/svgs/icon-reach-thousands-buyers.svg" alt="urpuppy-img" />
                <h5 className="fs-5 font-work-sans mt-3">Reach Thousands of Buyers</h5>
                <p className="mb-0">Our platform connects you with
                  eager pet lovers nationwide.</p>
              </div>
              <div className="col-md-4 mb-7 mb-md-0">
                <img src="../images/svgs/icon-easy-to-use-tool.svg" alt="urpuppy-img" />
                <h5 className="fs-5 font-work-sans mt-3">Easy-to-Use Tools</h5>
                <p className="mb-0">Upload photos, videos, and descriptions seamlessly.</p>
              </div>
              <div className="col-md-4">
                <img src="../images/svgs/icon-boosted-visibility.svg" alt="urpuppy-img" />
                <h5 className="fs-5 font-work-sans mt-3">Boosted Visibility</h5>
                <p className="mb-0">Featured listings help you
                  stand out from the competition.</p>
              </div>
            </div>
          </div>
        </div>
  )
}

export default SecondaryJumbotron
