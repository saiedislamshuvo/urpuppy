import React from 'react'

const Jumbotron = ({title, description, image} : { title: string, description: string, image: string }) => {
  return (
                <div className="get-started-today p-4 p-lg-5 pe-0 pe-lg-0 bg-primary rounded-1 overflow-hidden bg-opacity-25">
          <div className="row align-items-center justify-content-between">
            <div className="col-lg-5 mb-8 mb-lg-0">
              <div className="pe-4 pe-lg-0">
                <h2>{title}</h2>
                <p className="fs-4">
                            {description}
                </p>
                <a href="#"
                  className="link text-decoration-underline fs-4 text-dark fw-semibold d-flex align-items-center gap-6">Subscribe Now
                  <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 7.5H15M15 7.5L9 13.5M15 7.5L9 1.5" stroke="#08314E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
            <div className="col-lg-5 me-n1 text-end">
              <img src={image} alt="urpuppy-img"/>
            </div>
          </div>
        </div>
    )}

export default Jumbotron
