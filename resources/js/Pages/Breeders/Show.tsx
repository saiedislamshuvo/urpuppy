import BreederCard from '@/Components/Breeder/BreederCard'
import ReviewCard from '@/Components/Breeder/ReviewCard'
import ReviewForm from '@/Components/Breeder/ReviewForm'
import BreederJsonLd from '@/Components/BreederJsonLd'
import MetaTags from '@/Components/MetaTags'
import GenericModal from '@/Components/Modals/GenericModal'
import PuppyCard from '@/Components/Puppy/Card'
import ReviewSlider from '@/Components/ReviewSlider'
import SellerCard from '@/Components/SellerCard'
import ChatButton from '@/Components/ChatButton'
import Slider from '@/Components/Slider'
import Button from '@/Components/ui/Button'
import VideoPlayer from '@/Components/VideoPlayer'
import Layout from '@/Layouts/Layout'
import { Head, Link, usePage } from '@inertiajs/react'
import React from 'react'

const Show = ({ breeder, puppies, url }: {
  breeder: App.Data.BreederFullData
  puppies: App.Data.PuppyData[],
  url: string
}) => {
  const { auth } = usePage().props;
  const currentUser = auth?.user as any;

  // Format address as: Street number street address city, state ZIP Code (5 digits)
  // Fallback: company fields -> base user fields
  const formatAddress = () => {
    const addressParts: string[] = [];

    // Street number (company_house_no)
    const houseNo = breeder.company_house_no ?? '';

    // Street address (company_street -> street -> company_address -> address)
    const street = breeder.company_street ?? breeder.street ?? breeder.company_address ?? breeder.address ?? '';

    // Combine street number and street address
    const streetAddress = [houseNo, street].filter(Boolean).join(' ').trim();
    if (streetAddress) {
      addressParts.push(streetAddress);
    }

    // City (company_city -> city)
    const city = breeder.company_city ?? breeder.city ?? '';
    if (city) {
      addressParts.push(city.trim());
    }

    // State (company_short_state -> company_state -> short_state -> state)
    const state = breeder.company_short_state ?? breeder.company_state ?? breeder.short_state ?? breeder.state ?? '';
    if (state) {
      // Add comma before state if we have a city
      if (city) {
        addressParts.push(', ' + state.trim());
      } else {
        addressParts.push(state.trim());
      }
    }

    // ZIP Code (company_zip_code -> zip_code, ensure 5 digits only)
    const zipCode = breeder.company_zip_code ?? breeder.zip_code ?? '';
    if (zipCode) {
      const zip = zipCode.replace(/\D/g, '').slice(0, 5);
      if (zip) {
        addressParts.push(zip);
      }
    }

    // Join all parts with spaces: "Street number street address city, state ZIP Code"
    return addressParts.join(' ').trim() || '';
  };

  // Format city and state only for card display
  // Fallback: company fields -> base user fields
  const formatCityState = () => {
    const parts: string[] = [];

    // City (company_city -> city)
    const city = breeder.company_city ?? breeder.city ?? '';
    if (city) {
      parts.push(city.trim());
    }

    // State (company_short_state -> company_state -> short_state -> state)
    const state = breeder.company_short_state ?? breeder.company_state ?? breeder.short_state ?? breeder.state ?? '';
    if (state) {
      if (city) {
        parts.push(', ' + state.trim());
      } else {
        parts.push(state.trim());
      }
    }

    return parts.join('').trim() || '';
  };

  return (
    <Layout>

      <MetaTags url={url} title={breeder.seo_title ?? breeder.full_name} description={breeder.seo_description ?? ""} image={breeder.company_logo ?? "/logo.svg"} />
      <BreederJsonLd breeder={breeder} url={url} />
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
              <Link aria-label='Back' href="/breeders" className="text-primary">Back</Link>

            </div>
            <div className="row">
              <div className="col-lg-8 col-xl-9">
                <div className="card border">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-xl-7 mb-4 mb-md-5 mb-xl-5">
                        <div
                          className="breeders-detail-img position-relative overflow-hidden rounded-1 me-xl-4">
                          <img src={breeder?.company_logo ?? ""} alt="company-logo" className="w-100 object-fit-cover" />
                        </div>
                      </div>
                      <div className="col-xl-5">
                        <div className="top-picks-details">
                          <div className="company-details mb-4 pb-4 border-bottom">
                            <h3 className="mb-6 fs-8">Company Details</h3>
                            <div className="hstack gap-6 mb-6">
                              <p className="mb-0 fw-medium text-dark">Name:</p>
                              <p className="mb-0">{breeder.company_name ?? breeder.full_name ?? ''}</p>
                            </div>
                            <div className="hstack gap-6 mb-6">
                              <p className="mb-0 fw-medium text-dark">Address:</p>
                              <p className="mb-0">{formatAddress() || 'N/A'}</p>
                            </div>
                            <div className="hstack gap-6">
                              <p className="mb-0 fw-medium text-dark">Years in Business:</p>
                              <p className="mb-0">{breeder.company_established_on_label ?? 'N/A'}</p>
                            </div>
                          </div>
                          <div className="about-golden-paws-breeders mb-4 pb-4 border-bottom">
                            <h3 className="mb-3 fs-8">About {breeder.company_name ?? breeder.full_name ?? 'Breeder'}</h3>
                            <p className="mb-6">
                              {breeder.company_about ?? breeder.description ?? 'No description available.'}
                            </p>
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
                          <ReviewSlider slidesPerView={1} children={
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
                  id: breeder.id,
                  slug: breeder.slug,
                  full_name: breeder.full_name,
                  is_breeder: breeder.is_breeder,
                  is_seller: breeder.is_seller,
                  email: breeder.email,
                  avatar: breeder.avatar,
                  phone: breeder.company_phone ?? breeder.phone ?? null,
                  phone_formatted: breeder.company_phone ?? breeder.phone ?? null,
                  address: formatCityState(),
                  short_address: formatCityState(),
                  member_since: breeder.member_since,
                  breeds: breeder.breeds ?? null,
                  social_x: breeder.social_x,
                  social_tiktok: breeder.social_tiktok,
                  social_ig: breeder.social_ig,
                  social_fb: breeder.social_fb,
                  website: breeder.website,
                  kennel_name: null,
                  company_address: null,
                  company_established_on_label: null,
                  company_logo: breeder.company_logo,

                } as App.Data.BreederData} />

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
                            <img src="../images/svgs/icon-play.svg" alt="icon-play" />
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

