import Hero from '@/Components/Hero'
import Jumbotron from '@/Components/Jumbotron'
import MetaTags from '@/Components/MetaTags'
import PlanCard from '@/Components/PlanCard'
import SecondaryJumbotron from '@/Components/SecondaryJumbotron'
import Layout from '@/Layouts/Layout'
import { Link } from '@inertiajs/react'
import React from 'react'

const Breeder = ({plan, discount} : {
    plan: App.Data.PlanData,
    discount?: App.Data.DiscountData
}) => {
  return (
  <Layout>
            <MetaTags title="Breeder plan" />
            <Hero title="Join the Pack" bgImage="/images/subscription-plans/subscription-plans-bg.jpg" description="Exclusive Subscription Plans for Breeders."/>

        <section className="breeder-annual-plan py-7 py-md-5 py-xl-9">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="border border-2 border-info position-relative overflow-hidden rounded-1">
              <div className="row">
                <div className="col-lg-5 border-end">
                  <div className="card mb-lg-0 h-100">
                    <div className="card-body py-lg-7 d-flex flex-column justify-content-between h-100">
                      <div>
                        <img src={plan.logo ?? ''} alt="" />
                        <h4 className="fs-8 mt-6">{plan.name}</h4>
                        <p>Designed to meet the needs of all dog breeders, this plan gives you everything you need to succeed on Urpuppy.com</p>
                      </div>
                      <div>
                        <p className="text-dark fs-5 mb-0">All this for just</p>
                        <h2 className="fs-12 mb-1">{plan.money_formatted} <span className="fs-5 text-muted">/{plan.plan_days}</span></h2>
                                                    {discount &&
                                                    <p className="mb-0 text-muted">Free trial for {discount.trial_days} days</p>
                                                    }

                        <p className="mb-0 text-muted">Billed annually.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="card mb-lg-0">
                    <div className="card-body py-lg-7">
                      <ul className="list-unstyled mb-4">
                        <li className="d-flex align-items-start gap-6 mb-3 pb-1">
                          <div className="round-40 bg-success bg-opacity-25 rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center">
                            <img src="../images/svgs/icon-paws-success.svg" alt="" />
                          </div>
                          <div>
                            <h6 className="mb-1 fs-3 font-work-sans">Featured Directory Listing</h6>
                            <p className="mb-0">Secure top-tier placement in the Urpuppy.com Breeders Directory for maximum visibility and buyer engagement.</p>
                          </div>
                        </li>
                        <li className="d-flex align-items-start gap-6 mb-3 pb-1">
                          <div className="round-40 bg-success bg-opacity-25 rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center">
                            <img src="../images/svgs/icon-video-display.svg" alt="" />
                          </div>
                          <div>
                            <h6 className="mb-1 fs-3 font-work-sans">Full Multimedia Uploads</h6>
                            <p className="mb-0">Showcase your puppies with stunning images and videos to grab attention and attract more buyers.</p>
                          </div>
                        </li>
                        <li className="d-flex align-items-start gap-6 mb-3 pb-1">
                          <div className="round-40 bg-success bg-opacity-25 rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center">
                            <img src="../images/svgs/icon-link.svg" alt="" />
                          </div>
                          <div>
                            <h6 className="mb-1 fs-3 font-work-sans">Social Media Integration</h6>
                            <p className="mb-0">Add your social media links to grow your following and enhance your online presence.</p>
                          </div>
                        </li>
                        <li className="d-flex align-items-start gap-6 mb-3 pb-1">
                          <div className="round-40 bg-success bg-opacity-25 rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center">
                            <img src="../images/svgs/icon-megephone.svg" alt="" />
                          </div>
                          <div>
                            <h6 className="mb-1 fs-3 font-work-sans">Exclusive Bulletin Placement</h6>
                            <p className="mb-0">Gain additional exposure by being featured in our subscriber bulletin, reaching a broader audience of potential buyers.</p>
                          </div>
                        </li>
                        <li className="d-flex align-items-start gap-6 mb-3 pb-1">
                          <div className="round-40 bg-success bg-opacity-25 rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center">
                            <img src="../images/svgs/icon-share-success.svg" alt="" />
                          </div>
                          <div>
                            <h6 className="mb-1 fs-3 font-work-sans">Social Media Sharing</h6>
                            <p className="mb-0">Share your breeder profile directly on your social media platforms to further promote your business.</p>
                          </div>
                        </li>
                        <li className="d-flex align-items-start gap-6 mb-3 pb-1">
                          <div className="round-40 bg-success bg-opacity-25 rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center">
                            <img src="../images/svgs/icon-call-user.svg" alt="" />
                          </div>
                          <div>
                            <h6 className="mb-1 fs-3 font-work-sans">Priority Customer Support</h6>
                            <p className="mb-0">Enjoy fast, dedicated assistance whenever you need it.</p>
                          </div>
                        </li>
                        <li className="d-flex align-items-start gap-6 mb-3 pb-1">
                          <div className="round-40 bg-success bg-opacity-25 rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center">
                            <img src="../images/svgs/icon-chat-heart.svg" alt="" />
                          </div>
                          <div>
                            <h6 className="mb-1 fs-3 font-work-sans">Customer Reviews</h6>
                            <p className="mb-0">Receive reviews from satisfied buyers to build trust and credibility within the community.</p>
                          </div>
                        </li>
                      </ul>
                      <div className="row align-items-center">
                        <div className="col-5">

                          <Link href={`/checkout/${plan.id}`} className="btn btn-primary d-block px-2">Get a Plan</Link>
                        </div>
                        <div className="col-7 border-start">
                          <p className="mb-0 fs-2">Join Urpuppy.com today and elevate your
                            breeding business to new heights!</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
        </Layout>

  )
}

export default Breeder
