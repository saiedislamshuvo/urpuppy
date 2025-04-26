import { Link } from '@inertiajs/react'
import React from 'react'

const PlanCard = (
    {plan, button = true, discount} : {
    plan: App.Data.PlanData,
    discount?: App.Data.DiscountData,
    button?: boolean

    }) => {

    // const handleSubscribe = (plan: App.Data.PlanData) => {
    //     window.location.href = '/checkout/' + plan.id;
    // };
    //

    const planBadge = () => {

        if (discount && plan.type === 'premium') {
                return <span className="rounded-top fw-medium px-6 py-1 bg-info text-white fs-3 me-6">{discount.trial_days}-Day Trial</span>

        }

        if (plan.badge_color === 'primary') {

            if (plan.badge_title) {

                return <span className="rounded-top fw-medium px-6 py-1 bg-info text-white fs-3 me-6">{plan.badge_title}</span>

            }

        } else {

            if (plan.badge_title)
                return <span className="rounded-top fw-medium px-6 py-1 bg-dark bg-opacity-10 text-muted fs-3 me-6">{plan.badge_title}</span>

        }

    }

  return (

                    <div className="card subscription-plans-box border border-2 position-relative w-100">
              <div className="text-end position-absolute top-0 end-0 mt-n4 z-n1">
                {planBadge()}


              </div>
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-6">
                  <p className="text-dark fs-5 mb-0">{plan.name}</p>
                  <img src={plan.logo ?? ''} alt="" width="48" height="48" />
                </div>
                {
                    plan.type == 'free' ? (<>
                <h2 className="mb-9"> {plan.plan_days} </h2>
                    </>) : (<>
                <h2 className="mb-6">{plan.money_formatted} <span className="fs-5 text-muted">/{plan.plan_days}</span></h2>
                    </>)
                }
                                                    {discount && plan.type ===  'premium'  &&
                                                    <p className="mb-0 text-muted">Free trial for {discount.trial_days} days</p>
                                                    }
                {
                    plan.savings_label &&
                <p className="text-dark mb-4 pb-2">{plan.savings_label}</p>
                }


                {

                 button &&  (
                    plan.is_highlight ? <Link prefetch className="btn btn-primary w-100 mb-7" href={`/checkout/${plan.id}`} >Select plan</Link>
                    : <Link prefetch className="btn btn-outline-extralight border btn-white text-dark w-100 mb-7" href={`/checkout/${plan.id}`}>Select plan</Link>)
                }
                <div className="pt-1">
                { plan.features.length > 0 &&
                   <>
                  <p>Features:</p>
                  <ul className="list-unstyled mb-0 d-flex flex-column gap-6">
                        {plan.features.map((feature: any, key: int) => (
                            <li key={key} className="d-flex align-items-start gap-2">
                                <img src="../images/svgs/icon-check-filled.svg" alt="" className="flex-shrink-0" />
                                <h5 className="fs-3 mb-0 font-work-sans fw-normal">{feature.name}</h5>
                            </li>
                        ))}
                  </ul>
                </>
                }
                </div>
              </div>
              </div>
  )
}

export default PlanCard
