import Breadcrumb from '@/Components/Breadcrumb'
import SellerRegistrationForm from '@/Components/Forms/SellerRegistrationForm'
import Heading from '@/Components/Heading'
import MetaTags from '@/Components/MetaTags'
import Layout from '@/Layouts/Layout'
import { Head } from '@inertiajs/react'
import React from 'react'

const Registration = ({ url, puppy_count, puppy_edit }: { url: string, puppy_count: number, puppy_edit: App.Data.PuppyEditData | null }) => {
  return (
    <Layout navType="secondary">

      <MetaTags title="Seller Registration" url={url} />
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="page-wrapper position-relative overflow-hidden">

        <section className="information pt-4 pb-8 pb-lg-9">
          <div className="container">
            <Breadcrumb links={[
              { label: 'Seller Registration', link: '/' },
            ]} />
            <div className="space-y-4">
              {!puppy_count ?
                <Heading title="Seller Registration" description="Create your seller profile to connect with buyers and showcase your listings." />
                :
                <Heading title="List your puppy" description="Create a new listing for your puppy." />
              }
              <SellerRegistrationForm puppy_edit={puppy_edit} puppy_count={puppy_count} />
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Registration
