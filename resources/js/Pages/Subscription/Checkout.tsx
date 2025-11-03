import Breadcrumb from '@/Components/Breadcrumb'
import CheckoutV2Form from '@/Components/CheckoutV2Form'
import SellerRegistrationForm from '@/Components/Forms/SellerRegistrationForm'
import Heading from '@/Components/Heading'
import MetaTags from '@/Components/MetaTags'
import PlanCard from '@/Components/PlanCard'
import Layout from '@/Layouts/Layout'
import React from 'react'

const Checkout = ({ plan_id, intent, plan, discount }: {
  plan_id: number,
  intent: any,
  plan: App.Data.PlanData,
  discount: App.Data.DiscountData
}) => {
  return (
    <Layout navType="secondary">
      <MetaTags title="Checkout" />
      <div className="page-wrapper position-relative overflow-hidden">
        <section className="information pt-4 pb-8 pb-lg-9">
          <div className="container">
            <Breadcrumb links={[{ label: 'Plan', link: '/plans' }, { label: 'Checkout', link: '/checkout' }]} />
            <div className="space-y-4">
              <PlanCard button={false} plan={plan} discount={discount} />
              <Heading title="Checkout" description="Checkout now" />
              <CheckoutV2Form clientSecret={intent?.client_secret} plan_id={plan_id} />
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Checkout
