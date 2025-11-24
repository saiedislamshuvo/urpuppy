import React from 'react';
import ImageSlider from '@/Components/ImageSlider';
import PuppyCard from '@/Components/Puppy/Card';
import Layout from '@/Layouts/Layout';
import SiblingCard from '@/Components/Puppy/SiblingCard';
import SocialMediaButtons from '@/Components/SocialMediaButtons';
import FavoriteButton from '@/Components/FavoriteButton'
import CompareButton from '@/Components/CompareButton'
import ShareButton from '@/Components/ShareButton';
import SellerCard from '@/Components/SellerCard';
import List from '@/Components/List';
import { Head, Link } from '@inertiajs/react';
import MetaTags from '@/Components/MetaTags';
import Tooltip from '@/Components/Tooltip';
import PuppyJsonLd from '@/Components/PuppyJsonLd';

const Show = ({ related_puppies, puppy, siblings, url }: {
  url: string
  related_puppies: App.Data.PuppyData[]
  puppy: App.Data.PuppyData,
  siblings: App.Data.PuppyData[]
}) => {

  return (
    <Layout>
      <MetaTags url={url} title={`${puppy?.breeds[0]?.name} - ${puppy.seo_title}`} description={puppy.seo_description ?? ""} image={puppy.preview_images[0]} />
      <PuppyJsonLd puppy={puppy} url={url} />

      <div className="page-wrapper position-relative overflow-hidden">

        <section
          className="hero-section position-relative d-flex align-items-center pt-11 pb-10">
          <div className="container position-relative z-1 pt-lg-1 mt-lg-3 mb-lg-4">
            <div className="row justify-content-center">
              <div className="col-xl-10">
                <h1 className="text-white text-center fs-11 mb-1" data-aos="fade-up" data-aos-delay="100"
                  data-aos-duration="1000">{puppy?.breeds[0]?.name}</h1>
              </div>
            </div>
          </div>
        </section>


        <section className="golden-retriever py-7 py-md-5 py-xl-9">
          <div className="container">
            <div className="mb-2">
              <Link href="/puppies" className="text-primary">Back</Link>
            </div>
            <div className="row">
              <div className="col-lg-8 col-xl-9">
                <div className="card border">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-xl-7 mb-4 mb-md-5 mb-xl-0">
                        <div className="top-picks-slider me-xl-4">
                          <div id="sync1" className="owl-carousel owl-theme mb-4">
                            <ImageSlider videos={[puppy.video ?? ""]} images={puppy.preview_images} />

                          </div>

                        </div>
                      </div>
                      <div className="col-xl-5">
                        <div className="top-picks-details">
                          <div className="d-flex align-items-start justify-content-between mb-4">
                            <h2 className="fs-10 mb-0">{puppy.name}</h2>
                            <div className="d-flex gap-2">

                              <FavoriteButton sellerId={puppy.seller?.id} puppyId={puppy.id} isFavorite={puppy.is_favorite} />
                              <CompareButton sellerId={puppy.seller?.id} puppyId={puppy.id} isCompared={puppy.is_compared} />

                              <Tooltip content={
                                <a

                                  onClick={() => {
                                    if (typeof window !== 'undefined') {
                                      window.print();
                                    }
                                  }}
                                  href="#" data-bs-toggle="tooltip" data-bs-title="Print"
                                  className="bg-white border d-flex align-items-center justify-content-center round-40 rounded-circle">
                                  <img src="/images/svgs/icon-print.svg" alt="print" />
                                </a>} id={`print`} tooltipMessage="Print" />

                              <ShareButton
                                slug={puppy.slug}
                              />

                            </div>
                          </div>

                          <div className="col-12">
                              <div className="d-flex align-items-center gap-2 mb-2">
                                <img src="../images/svgs/icon-map-pin.svg" alt="map" width="20" height="20" />
                                <p className="mb-0 ">{`${puppy?.city || ''}${(puppy?.city || '').length > 0 ? ', ' : ''}${puppy?.state || ''}`}</p>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="d-flex align-items-center gap-2 mb-2">
                               <img loading="lazy" src="/images/svgs/icon-paws-dark.svg" alt="urpuppy-img" width="20" height="20" />
                                <p className="mb-0">{puppy.breeds?.[0]?.name ?? ""}</p>
                            </div>
                          </div>
                          <div className="row mb-2">
                          <div className="col-6">
                              <div className="d-flex align-items-center gap-2 mb-2">
                                <img src="../images/svgs/icon-female.svg" alt="Female" width="18" height="18" />
                                <p className="mb-0 text-capitalize">{puppy.gender}</p>
                              </div>
                            </div>

                            <div className="col-6">
                              <div className="d-flex align-items-center gap-2 mb-2">
                                <img src="../images/svgs/icon-calendar.svg" alt="calendar" width="18" height="18" />
                                <p className="mb-0 ">{puppy.age}</p>
                              </div>
                            </div>
                            </div>

                            <div className="row mb-2">
                            <div className="col-6">
                              <div className="d-flex align-items-center gap-2 mb-2">
                                <img src="../images/svgs/icon-time.svg" alt="time" width="18" height="18" />
                                <p className="mb-0 ">{puppy.published_at}</p>
                              </div>
                            </div>
                            
                            <div className="col-6">
                              <div className="d-flex align-items-center gap-2 mb-2">
                                <img src="../images/svgs/icon-eye.svg" alt="eye" width="18" height="18" />
                                <p className="mb-0 ">{puppy.view_count} Views</p>
                              </div>
                            </div>
                          </div> 

                          <p className="mb-1 fs-2 fw-medium">Our price</p>
                          <h2 className="mb-4">{puppy.formatted_price}</h2>
                          <div className="hstack gap-6 mb-3">
                            <p className="mb-0 fw-medium">Pattern:</p>
                            <p className="mb-0">{puppy.patterns}</p>
                          </div>
                          <div className="colors hstack gap-6 mb-4 pb-4 border-bottom">
                            <p className="mb-0 fw-medium">Colors:</p>
                            <div className="hstack gap-6">
                              {puppy.puppy_colors && puppy.puppy_colors.map((color: App.Data.PuppyColorData) => (
                                <div className="hstack gap-1" key={color.name}>
                                  <span className="flex-shrink-0 d-block round-20 rounded-circle" style={{ background: color.color }}></span>
                                  <p className="mb-0">{color.name}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          <span className="mb-3 fs-8">About {puppy.name}</span>
                          <p className="mb-6">{puppy.description}</p>
                          <p className="mb-3"></p>
                          <div className="d-flex align-items-center align-items-start gap-2">
                            <img src="/images/svgs/icon-flag.svg" alt="flag" />


                            <Link
                              style={{
                                background: 'transparent',
                                border: 'none'

                              }}
                              href={`/report/${puppy.slug}`} method="post" data={{
                                reason: 'report'
                              }}
                            >
                              <h6 className="mb-0 fs-2 fw-semibold text-muted text-decoration-underline">Report This Listing</h6>
                            </Link>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {puppy.characteristics && puppy.characteristics?.length > 0 || puppy.features && puppy.features.length > 0 &&
                  <div className="card border">
                    <div className="card-body">
                      {puppy.characteristics && puppy.characteristics?.length > 0 &&
                        <div className="charlies-characteristics pb-3 border-bottom">
                          <h5 className="mb-3 pb-1 fs-5">{puppy.name}’s Characteristics</h5>
                          <div className="d-flex align-items-center flex-wrap gap-4 pb-1">
                            {
                              puppy.characteristics.map((characteristic: string, index: number) => (
                                <List label={characteristic} key={index} />
                              ))}
                          </div>
                        </div>
                      }

                      {puppy.features && puppy.features?.length > 0 &&
                        <div className="charlies-features mt-3 pt-1">
                          <h5 className="mb-3 pb-1 fs-5">{puppy.name}’s Features</h5>
                          <div className="d-flex align-items-center flex-wrap gap-4">
                            {puppy.features && puppy.features.map((feature: string, index: number) => (
                              <List label={feature} key={index} />
                            ))}
                          </div>
                        </div>
                      }
                    </div>
                  </div>

                }
                
                {
                  puppy.seller?.is_breeder &&
                  <div className="card position-relative overflow-hidden border">
                    <div className="row">
                      <div className="col-xl-4 d-flex align-items-lg-stretch">
                        <Link href={`/breeders/${puppy.seller?.slug}`} className="trusted-breeders-img position-relative overflow-hidden w-100 text-center p-4">
                          <img className="object-fit-cover rounded-circle position-relative overflow-hidden" src={puppy.seller?.company_logo ?? ""} alt={puppy.seller?.kennel_name ?? 'company logo'} width="230" height="230" />
                        </Link>
                      </div>
                      <div className="col-xl-8 d-flex align-items-lg-stretch">
                        <div className="trusted-breeders-details card-body ps-xl-0 pe-4 d-flex align-items-start justify-content-between gap-3">
                          <div>
                            <Link href={`/breeders/${puppy.seller?.slug}`}>
                              <h6 className="btn-link fs-8 font-work-sans mb-6">Offered By</h6>
                            </Link>
                            <div className="company-details mb-3">
                              <div className="hstack gap-6 mb-6">
                                <p className="mb-0 fw-medium text-dark">Name:</p>
                                <p className="mb-0">{puppy.seller?.kennel_name || 'N/A'}</p>
                              </div>
                              <div className="hstack gap-6 mb-6">
                                <p className="mb-0 fw-medium text-dark">Address:</p>
                                <p className="mb-0">{puppy.seller?.company_address || 'N/A'}</p>
                              </div>
                              <div className="hstack gap-6">
                                <p className="mb-0 fw-medium text-dark">Years in Business:</p>
                                <p className="mb-0">{puppy.seller?.company_established_on_label || 'N/A'}</p>
                              </div>
                            </div>
                            <Link href={`/breeders/${puppy.seller?.slug}`} className="btn btn-outline-extralight border btn-white text-dark">View More</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                }


              </div>
              <div className="col-lg-4 col-xl-3">
                {puppy.seller && <SellerCard seller={puppy.seller} />}

                {siblings.length > 0 &&
                  <div className="card border">
                    <div className="card-body">
                      <h5 className="fs-5 mb-3 pb-1">{puppy.name}{puppy.name.endsWith('s') ? "'" : "'s"} Siblings
                      </h5>
                      <div className="row">
                        {
                          siblings.map((sibling: App.Data.PuppySiblingData) => (
                            <SiblingCard key={sibling.slug} puppy={sibling} />

                          ))
                        }
                      </div>
                    </div>

                  </div>
                }

              </div>

            </div>
          </div>
        </section>

        <section className="bringing-through-puppies bg-extralight py-7 py-md-5 py-xl-9">
          <div className="container">
            <div className="d-flex align-items-center justify-content-between mb-4 mb-lg-8">
              <h2 className="mb-0" data-aos="fade-right" data-aos-delay="100" data-aos-duration="1000">Other {puppy?.breeds[0]?.name} Listing</h2>
            </div>

            <div className="row">
              {
                related_puppies && related_puppies.map((puppy: App.Data.PuppyData) => (
                  <PuppyCard key={puppy.slug} className="col-md-6 col-xl-3 mb-4 mb-xl-0" puppy={puppy} />

                ))
              }

            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default Show;

