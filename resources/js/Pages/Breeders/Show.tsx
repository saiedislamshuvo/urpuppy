import BreederCard from '@/Components/Breeder/BreederCard'
import ReviewCard from '@/Components/Breeder/ReviewCard'
import ReviewForm from '@/Components/Breeder/ReviewForm'
import MetaTags from '@/Components/MetaTags'
import GenericModal from '@/Components/Modals/GenericModal'
import PuppyCard from '@/Components/Puppy/Card'
import ReviewSlider from '@/Components/ReviewSlider'
import SellerCard from '@/Components/SellerCard'
import Slider from '@/Components/Slider'
import Button from '@/Components/ui/Button'
import VideoPlayer from '@/Components/VideoPlayer'
import Layout from '@/Layouts/Layout'
import { Head, Link } from '@inertiajs/react'
import React from 'react'

const Show = ({breeder, puppies} : {
    breeder: App.Data.BreederFullData
    puppies: App.Data.PuppyData[]
}) => {

  return (
            <Layout>

            <MetaTags title={breeder.full_name} description={breeder.company_about ?? ""} image={breeder.company_logo ?? "/logo.svg"} />
  <div className="page-wrapper position-relative overflow-hidden">

    <section className="hero-section position-relative d-flex align-items-center pt-11 pb-10">
      <div className="container position-relative z-1 pt-lg-1 mt-lg-3 mb-lg-4">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <h1 className="text-white text-center fs-11 mb-1" data-aos="fade-up" data-aos-delay="100"
              data-aos-duration="1000">{breeder.full_name}</h1>
          </div>
        </div>
      </div>
    </section>

    <section className="golden-retriever py-7 py-md-5 py-xl-9">
      <div className="container">

                        <div className="mb-2">
        <Link href="/breeders" className="text-primary">Back</Link>

</div>
        <div className="row">
          <div className="col-lg-8 col-xl-9">
            <div className="card border">
              <div className="card-body">
                <div className="row">
                  <div className="col-xl-7 mb-4 mb-md-5 mb-xl-5">
                    <div
style={{
                                                    height: '535px',
                                                }}
                                                    className="breeders-detail-img position-relative overflow-hidden rounded-1 me-xl-4">
                      <img src={breeder?.company_logo ?? ""} alt="" className="w-100 object-fit-cover"/>
                    </div>
                  </div>
                  <div className="col-xl-5">
                    <div className="top-picks-details">
                      <div className="about-golden-paws-breeders mb-4 pb-4 border-bottom">
                        <h3 className="mb-3 fs-8">About {breeder.company_name}</h3>
                        <p className="mb-6">
                             {breeder.company_about}
                        </p>
                      </div>
                      <div className="company-details">
                        <h3 className="mb-6 fs-8">Company Details</h3>
                        <div className="hstack gap-6 mb-6">
                          <p className="mb-0 fw-medium text-dark">Name:</p>
                          <p className="mb-0">{breeder.company_name}</p>
                        </div>
                        <div className="hstack gap-6 mb-6">
                          <p className="mb-0 fw-medium text-dark">Address:</p>
                          <p className="mb-0">{breeder.company_address}</p>
                        </div>
                        <div className="hstack gap-6">
                          <p className="mb-0 fw-medium text-dark">Years in Business:</p>
                          <p className="mb-0">{breeder.company_established_on_label}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="andrews-listings mb-xl-4">

                {puppies.length > 0 &&
                                        <div className="d-flex justify-content-between
                                            align-items-center

                                            ">
              <h5 className="fs-5  ">{breeder.full_name} Listings</h5>
                                            <div>
                                                <Button href={`/all-puppies/${breeder.slug}`} variant="white" >See All Listings</Button>
                                            </div>
                                        </div>

                                    }

              <div className="row">
                {puppies.length > 0 &&
                    puppies.map((puppy: App.Data.PuppyData, index: number) => (
                        <PuppyCard className="col-md-6 col-xl-4 mb-4 mt-4 mb-xl-0" key={index} puppy={puppy} />
                    ))}
              </div>
            </div>

            {breeder.comments && breeder.comments.length > 0 &&
            <div className="card border andrews-reviews">
              <div className="card-body">
                <h5 className="mb-6 fs-5 mb-3 pb-1">{breeder.first_name}'s reviews</h5>
                <div className="andrews-reviews-sloder position-relative">
                  <div className="owl-carousel owl-theme">
                                                <ReviewSlider children={
                                                    breeder.comments?.map((comment: App.Data.CommentData, index: number) => (
                                                        <ReviewCard key={index} comment={comment} />
                                                    ))
                                                }
                                                />
                  </div>

                <div id="review-bullets" className="text-center flex"></div>
                </div>
              </div>
            </div>

                            }
                        <ReviewForm breeder_id={breeder.id} />
          </div>
          <div className="col-lg-4 col-xl-3">
            <SellerCard seller={{
                                    slug: breeder.slug,
                                    full_name: breeder.full_name,
                                    is_breeder: breeder.is_breeder,
                                    email: breeder.email,
                                    avatar: breeder.avatar,
                                    phone: breeder?.phone ?? "",
                                    address: breeder.address,
                                    member_since: breeder.member_since,
                                    social_x: breeder.social_x,
                                    social_tiktok: breeder.social_tiktok,
                                    social_ig: breeder.social_ig,
                                    social_fb: breeder.social_fb,

                                }as App.Data.BreederData} />

                                {breeder.video &&

            <div className="card border">
              <div className="card-body">
                <h5 className="fs-5 mb-3 pb-1">Breeder’s Insight</h5>
                    <div className="breeders-insight position-relative rounded-1 overflow-hidden">
                    <img style={{
                                                    minHeight: "300px",
                                                }} className="w-100 h-100 object-fit-cover" src={breeder.video_thumbnail ?? ""} />
                <GenericModal buttonTitle={
                <button type="button" className="position-absolute top-50 start-50 translate-middle z-2 btn btn-primary p-2 d-flex align-items-center justify-content-center round-72 rounded-circle flex-shrink-0" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  <img src="../images/svgs/icon-play.svg" alt=""/>
                </button>
                    }>
                    <div>
                        <video controls className="w-100 " autoPlay style={{
                                                            height: "auto",
                                                            maxHeight: '60vh',
                                                            objectFit: "contain",
                                                        }}>
                            <source src={breeder.video} />
                        </video>
                    </div>
                </GenericModal>
                    </div>

              </div>
            </div>
}

            <div className="card border">
              <div className="card-body">
                <h5 className="fs-5 mb-3 pb-1">{breeder.first_name}'s Gallery</h5>
                <div className="row gx-6">

                                            {breeder.gallery &&
  breeder.gallery.map((image, index) => {
    // Check if the image index is even or odd
    const isSingleRow = index % 2 === 0; // Every 3rd item starts a new single-row (col-12)

    return isSingleRow ? (
      // Render col-12 for every third item
      <div className="row" key={`row-${index}`}>
        <div className="col-12 mb-3">
          <div className="gallery position-relative overflow-hidden rounded-1">
            <img
              src={image}
              alt={`Gallery image ${index}`}
              className="object-fit-cover w-100 h-100"
            />
          </div>
        </div>
      </div>
    ) : (
      // Render col-6 for the rest
      <div className="row" key={`row-${index}`}>
        <div className="col-6 mb-3">
          <div className="gallery position-relative overflow-hidden rounded-1">
            <img
              src={image}
              alt={`Gallery image ${index}`}
                                                                            style={{
                                                                                minHeight: "100px",
                                                                                height: "100px",
                                                                            }}
              className="object-fit-cover w-100 "
            />

          </div>
        </div>
        {/* Check if there's a next image to pair with */}
        {breeder.gallery[index + 1] && (
          <div className="col-6 mb-3">
            <div className="gallery position-relative overflow-hidden rounded-1">
              <img
                src={breeder.gallery[index + 1]}
                                                                            style={{
                                                                                minHeight: "100px",
                                                                                height: "100px",
                                                                            }}
                alt={`Gallery image ${index + 1}`}
                className="object-fit-cover w-100 "
              />
            </div>
          </div>
        )}
      </div>
    );
  })}


                 </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    </div>
    </Layout>
  )
}

export default Show
