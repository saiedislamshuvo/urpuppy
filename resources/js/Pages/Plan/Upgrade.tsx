import Hero from '@/Components/Hero'
import Jumbotron from '@/Components/Jumbotron'
import MetaTags from '@/Components/MetaTags'
import PlanUpgradeCard from '@/Components/PlanUpgradeCard'
import SecondaryJumbotron from '@/Components/SecondaryJumbotron'
import Layout from '@/Layouts/Layout'
import React from 'react'

const Index = ({plans} : {
    plans: App.Data.PlanData[]
}) => {



  return (
  <Layout>
            <MetaTags title="Change Plans" />
            <Hero title="Join the Pack" bgImage="/images/subscription-plans/subscription-plans-bg.jpg" description="Exclusive Subscription Plans for Pet Lovers. "/>

                <section className="subscription-plans pb-0 pb-md-0 py-7 py-md-5 py-xl-9 pb-xl-9">
      <div className="container">
        <div className="row mt-8">

                        {plans?.length > 0 && plans.map((plan: App.Data.PlanData) =>


          <div className="col-md-6 col-xl-3 mb-7 mb-xl-0 d-flex align-items-stretch">
                            <PlanUpgradeCard plan={plan} />
          </div>

                        )}
        </div>
      </div>
    </section>


    <section className="bg-extralight my-4 my-lg-5 py-7 py-md-5 py-xl-9">
      <div className="container">

                    <SecondaryJumbotron />

      </div>
    </section>


    <section className="py-7 py-md-5 py-xl-9">
      <div className="container">
                    <Jumbotron title="Get Started Today!"
                        description="Choose the plan that fits your budget and start selling your puppies with confidence. Whether you’re a
                  first-time seller or an experienced breeder, UrPuppy.com has the perfect plan for you!
"
                        image="../images/subscription-plans/get-started-today.png"
                    />

      </div>
    </section>



        </Layout>

  )
}

export default Index
