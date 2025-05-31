import Breadcrumb from '@/Components/Breadcrumb'
import SellerRegistrationForm from '@/Components/Forms/SellerRegistrationForm'
import Heading from '@/Components/Heading'
import MetaTags from '@/Components/MetaTags'
import Layout from '@/Layouts/Layout'
import { url } from 'inspector'
import React from 'react'

const AboutUs = ({url}: {url: string}) => {
  return (
  <Layout navType="secondary">

            <MetaTags url={url} title="About Us"/>
              <div className="page-wrapper position-relative overflow-hidden">
    <section className="information pt-4 pb-9">
      <div className="container">

                        <div className="row mt-8 ">
                            <div className="col-md-7  "
data-aos="fade-right" data-aos-delay="200" data-aos-duration="1000"
                            >
                                <h1 className="fs-12">About Urpuppy.com</h1>

                                <p className="fs-4">
                                    Urpuppy.com is a dedicated online platform that connects dog lovers with reputable breeders and individuals looking to sell their puppies and dogs. Our user-friendly marketplace allows sellers to post listings, while buyers can easily search for available dogs based on breed, location, and preferences.
                                </p>

                                <p className="fs-4">
                                    In addition to our marketplace, we provide a comprehensive breed information guide to help you determine which breed best suits your lifestyle.

                                </p>

                                <p className="fs-4">
                                    Our breeder directory offers a valuable resource for both breeders and potential buyers. Breeders can advertise their kennels, and users can conveniently search for trusted breeders—all within a single, seamless platform.
                                </p>
                                <p className="fs-4">
                                    At Urpuppy.com, we strive to make the process of finding the perfect furry companion as easy, transparent, and enjoyable as possible.
                                </p>

                            </div>

                            <div  className="col-md-5"
data-aos="fade-left" data-aos-delay="200" data-aos-duration="1000"
                            >
                                <div style={{
                                    background: "url('/images/about-us.png')",
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                    borderRadius: "20px",
                                    marginTop: "20px",
                                    marginBottom: "20px",
                                    height: "400px",

                                }} >

                                </div>
                            </div>

                        </div>

      </div>
    </section>

  </div>
</Layout>
  )
}

export default AboutUs
