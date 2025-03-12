import { Link } from '@inertiajs/react'
import React from 'react'

const PlanUpgradeCard = (
    {plan, button = true} : {
    plan: App.Data.PlanData,
    button?: boolean

    }) => {

    // const handleSubscribe = (plan: App.Data.PlanData) => {
    //     window.location.href = '/checkout/' + plan.id;
    // };

  return (

                    <div className="card subscription-plans-box border border-2 position-relative w-100">
              <div className="text-end position-absolute top-0 end-0 mt-n4 z-n1">
                {plan.badge_color == 'primary' ? (
               plan.badge_title && <span className="rounded-top fw-medium px-6 py-1 bg-info text-white fs-3 me-6">{plan.badge_title}</span>
                ) : (
               plan.badge_title && <span className="rounded-top fw-medium px-6 py-1 bg-dark bg-opacity-10 text-muted fs-3 me-6">{plan.badge_title}</span>
                )}

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
                {
                    plan.savings_label &&
                <p className="text-dark mb-4 pb-2">{plan.savings_label}</p>
                }


                {

                 button &&  (
                 <Link prefetch className="btn btn-primary w-100 mb-7" href={`/checkout/change/${plan.id}`}>Select plan</Link>)
                }
                <div className="pt-1">
                { plan.features.length > 0 &&
                   <>
                  <p>Features:</p>
                  <ul className="list-unstyled mb-0 d-flex flex-column gap-6">
                        {plan.features.map((feature: any) => (
                            <li className="d-flex align-items-start gap-2">
                                <img src="/images/svgs/icon-check-filled.svg" alt="" className="flex-shrink-0" />
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

export default PlanUpgradeCard
