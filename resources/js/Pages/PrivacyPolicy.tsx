import Breadcrumb from '@/Components/Breadcrumb'
import SellerRegistrationForm from '@/Components/Forms/SellerRegistrationForm'
import Heading from '@/Components/Heading'
import MetaTags from '@/Components/MetaTags'
import Layout from '@/Layouts/Layout'
import React from 'react'

const PrivacyPolicy = ({url}: {url: string}) => {
  return (
  <Layout navType="secondary">

            <MetaTags url={url} title="Privacy Policy"/>
              <div className="page-wrapper position-relative overflow-hidden">
    <section className="information pt-4 pb-9">
      <div className="container">

                        <Breadcrumb links={[
                            {label: 'Privacy Policy', link: '/privacy-policy'},
                        ]}/>

        <div className="card border">
          <div className="card-body">
            <h4>Effective Date: 10/1/2024</h4>
            <p className="mb-8">At Urpuppy.com, your privacy is important to us. This Privacy Policy outlines how we
              collect, use, disclose, and safeguard your information when you visit our website.
              Please read this policy carefully to understand our practices regarding your personal
              information.</p>

            <h4>1. Information We Collect</h4>
            <p className="mb-4">We may collect the following types of information:</p>
            <h6>a. Personal Information</h6>
            <p className="mb-1">When you interact with our site, we may ask you to provide certain personally
              identifiable information, including but not limited to:</p>
            <ul className="mb-4">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Shipping address</li>
              <li>Billing information (credit card details)</li>
            </ul>

            <h6>b. Non-Personal Information</h6>
            <p className="mb-1">We may also collect non-personal information automatically when you visit our site,
              including:</p>
            <ul className="mb-4">
              <li>IP address</li>
              <li>Browser type</li>
              <li>Pages visited</li>
              <li>Time and date of access</li>
              <li>Referring website</li>
            </ul>

            <h4>2. How We Use Your Information</h4>
            <p className="mb-1">We may use the information we collect from you for various purposes, including:</p>
            <ul className="mb-4">
              <li>To process your orders and manage your account</li>
              <li>To improve our website and services</li>
              <li>To communicate with you, including sending confirmations and updates</li>
              <li>To respond to inquiries, customer service requests, and support needs</li>
              <li>To send you marketing communications, if you have opted in to receive them</li>
              <li>To comply with legal obligations and prevent fraud</li>
            </ul>


            <h4>3. Information Sharing</h4>
            <p>We do not sell, trade, or otherwise transfer your personal information to outside parties
              without your consent, except as required to fulfill your order or as necessary to operate
              our business. We may share your information with:</p>
              <ul className="mb-4">
                <li>Service providers who assist us in operating our website and conducting our business (e.g., payment processors, shipping companies)</li>
                <li>Complying with legal requirements or regulations</li>
                <li>Protecting our rights or the rights of others</li>
              </ul>


              <h4>4. Cookies</h4>
                <p>Urpuppy.com uses cookies to enhance user experience. Cookies are small text files
                  placed on your device by websites you visit. You can choose to accept or decline
                  cookies through your browser settings. However, declining cookies may prevent you
                  from taking full advantage of our website.</p>

            <h4>5. Data Security</h4>
            <p>We implement a variety of security measures to maintain the safety of your personal
              information. However, please remember that no method of transmission over the
              internet or method of electronic storage is 100% secure. While we strive to use
              commercially acceptable means to protect your personal information, we cannot
              guarantee its absolute security.</p>

              <h4>6. Your Rights</h4>
            <p className="mb-1">Depending on your jurisdiction, you may have the right to:</p>
            <ul className="mb-4">
              <li>Access, correct, or delete your personal information</li>
              <li>Withdraw consent for processing your personal information</li>
              <li>Object to or restrict processing of your personal information To exercise these rights, please contact us using the information below.</li>
            </ul>

            <h4>7. Third-Party Websites</h4>
            <p className="mb-1">Our website may contain links to other websites that are not operated by us. If you click</p>
              <p className="mb-0">on a third-party link, you will be directed to that third party’s site.</p>
          </div>
        </div>
      </div>
    </section>

  </div>
</Layout>
  )
}

export default PrivacyPolicy
