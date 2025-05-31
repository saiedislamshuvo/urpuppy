import React from 'react'
import GenericModal from '../Modals/GenericModal'

const FooterVideos = ({videos} : { videos: App.Data.VideoData[] }) => {
  return (
            <section className="bringing-through-puppies bg-extralight py-7 py-md-5 py-xl-9">
            <div className="container">
        <div className="d-flex align-items-center justify-content-between mb-4 mb-lg-8">
          <h2 className="mb-0 aos-init aos-animate" data-aos="fade-right" data-aos-delay="100" data-aos-duration="1000">Bringing Joy Through
            Puppies</h2>
        </div>
        <div className="row">
                    {
                        videos.map((video: App.Data.VideoData) => (
          <div className="col-lg-4" key={video.url}>
            <div className="bringing-through-puppies-blog position-relative overflow-hidden rounded-1 mb-4 mb-lg-0 aos-init aos-animate" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
              <img loading="lazy" src={video.video_thumbnail ?? ""} alt="urpuppy-img"/>
              <div className="d-flex align-items-center gap-3 position-relative z-1 position-absolute bottom-0 start-0 w-100 p-4 pt-0">

                <GenericModal buttonTitle={
                <button type="button" className="btn btn-primary p-2 d-flex align-items-center justify-content-center round-48 rounded-circle flex-shrink-0" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  <img loading="lazy" src="../images/svgs/icon-play.svg" alt="urpuppy-img"/>
                </button>
                    }>
                    <div>
                        <video controls className="w-100" autoPlay
                            style={{
                                                            height: "auto",
                                                            maxHeight: '60vh',
                                                            objectFit: "contain",
                                                        }}
                                                >
                            <source src={video.url} />
                        </video>
                    </div>
                </GenericModal>

                <h4 className="mb-0 text-white fs-8">{video.title}</h4>
              </div>
            </div>
          </div>

                        ))
                    }
        </div>
      </div>
    </section>
  )
}

export default FooterVideos
