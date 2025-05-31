import Breadcrumb from '@/Components/Breadcrumb'
import SellerRegistrationForm from '@/Components/Forms/SellerRegistrationForm'
import Heading from '@/Components/Heading'
import MetaTags from '@/Components/MetaTags'
import Layout from '@/Layouts/Layout'
import React from 'react'

const TermsConditions = ({url}: {url: string}) => {
  return (
  <Layout navType="secondary">
            <MetaTags url={url} title="Terms of Use"/>
              <div className="page-wrapper position-relative overflow-hidden">
    <section className="information pt-4 pb-9">
      <div className="container">

                        <Breadcrumb links={[{label: 'Terms of use', link: '/terms-of-use'}]} />
                                <div className="card border">
          <div className="card-body">
            <h1 className="fs-7">1. Acceptance of Terms</h1>
            <p className="mb-7">By accessing and using UrPuppy.com you agree to comply with and be bound by
              the following terms and conditions. If you do not agree with these terms, please
              do not use our website.</p>

            <h2 className="fs-7">2. Eligibility</h2>
            <p className="mb-7">You must be at least 18 years old to use this website. By accessing the website,
              you affirm that you are of legal age to enter into this agreement.</p>

              <h2 className="fs-7">3. User Responsibilities</h2>
            <p className="mb-1">You are responsible for ensuring that all information you provide is accurate and
              up to date.</p>
              <p className="mb-1">You agree not to use the website for any illegal purposes, including but not
                limited to posting unlawful content, engaging in fraudulent activity, or violating the
                intellectual property rights of others.</p>
                <p className="mb-7">Any inappropriate content, spam, or offensive language is strictly prohibited.</p>

            <h2 className="fs-7">4. User-Generated Content</h2>
            <p className="mb-1">Users may upload content (e.g., listings, reviews, etc.) to the website.</p>
              <p className="mb-1">You grant Urpuppy.com a non-exclusive, royalty-free license to use, display, and
                distribute this content.</p>
                <p className="mb-7">You are solely responsible for the content you post and must ensure it complies
                  with our community standards.</p>

              <h2 className="fs-7">5. Prohibited Activities</h2>
              <p className="mb-1">Users agree not to engage in:</p>
              <p className="mb-1">Any form of harassment, abuse, or impersonation of others.</p>
                <p className="mb-1">Posting content that is harmful, false, or misleading.</p>
                <p className="mb-7">Using bots or automated systems to access or collect information from the
                  website.</p>

            <h2 className="fs-7">6. Intellectual Property</h2>
            <p className="mb-7">All content and materials on the website, including logos, trademarks, text, and
              images, are the intellectual property of urpuppy.com or its licensors. You may not
              use or reproduce any content without express permission.</p>

              <h2 className="fs-7">7. Third-Party Links</h2>
            <p className="mb-7">Urpuppy.com may contain links to third-party websites. We are not responsible
              for the content or practices of any third-party websites.</p>

            <h2 className="fs-7">8. Limitation of Liability</h2>
            <p className="mb-1">Urpuppy.com will not be liable for any indirect, incidental, or consequential
              damages resulting from your use of the website.</p>
              <p className="mb-7">We do not guarantee the accuracy or reliability of any user-generated content or
                third-party information found on the website.</p>

              <h2 className="fs-7">9. Privacy Policy</h2>
            <p className="mb-7">Your use of the website is also governed by our Privacy Policy, which details how
              we collect, use, and store your information.</p>

            <h2 className="fs-7">10. Changes to the Terms</h2>
            <p className="mb-7">We reserve the right to modify these Terms of Use at any time. Any changes will
              be posted on this page, and your continued use of the website constitutes
              acceptance of these changes.</p>

              <h2 className="fs-7">11. Termination</h2>
            <p className="mb-7">We reserve the right to suspend or terminate your account if you violate
              these terms or engage in harmful activities.</p>

            <h2 className="fs-7">12. Governing Law</h2>
            <p className="mb-0">These Terms of Use will be governed by and construed in accordance with the
              laws of The United States of American without regard to its conflict of law
              provisions.</p>
          </div>


      </div>
      </div>
    </section>

  </div>
</Layout>
  )
}

export default TermsConditions
