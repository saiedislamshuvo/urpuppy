import { Link, router, usePage } from '@inertiajs/react'
import React from 'react'

const SubscriptionCard = ({ plan, next_billing, cancel_at, trial_ends_at }: {
  plan: App.Data.PlanData
  next_billing?: string,
  cancel_at?: boolean
  trial_ends_at?: string | null
}) => {

  const trial_ends_at_date = usePage().props.auth.user.trial_ends_at


  return plan && (

    <div className="card border">
      <div className="card-body">
        <h5 className="mb-13 pb-13 border-bottom fs-7">Current Plan</h5>
        <div className="pb-13 mb-13 border-bottom d-md-flex align-items-start justify-content-between">
          <div className="mb-3 mb-md-0">
            <div className="d-flex align-items-center gap-6 mb-3">
              <img src={plan.logo ?? ''} alt="plan logo" width="48" height="48" />
              <p className="text-dark fs-5 mb-0">{plan.name}</p>
            </div>
            {plan.type !== 'free' &&
              <h2 className="mb-2">{plan.money_formatted}<span className="fs-5 text-muted">/{plan.plan_days}</span></h2>
            }
            <>

              <p className="mb-0 text-dark">{trial_ends_at_date ? "Trial ends at: " : ""} {trial_ends_at_date}</p>

              {!trial_ends_at_date &&
                <p className="mb-0 text-dark">{cancel_at ? "Ends at: " : "Next Billing Date:"} {next_billing}</p>}
            </>
            {
              cancel_at &&
              <span className="mt-2 badge bg-danger">Cancelled plan</span>
            }

          </div>
          <div>

            {plan.type !== 'breeder' && !trial_ends_at_date &&
              <Link as="button"
                className="btn btn-primary border btn-white text-white d-block mb-2"
                href="/upgrade">
                Change Plan
              </Link>
            }

            {!cancel_at &&
              <>
                <Link
                  aria-label="Cancel Subscription"
                  href="/subscriptions"
                  method="delete"
                  as="button"
                  onClick={(e) => {
                    e.preventDefault();
                    if (window.confirm('Are you sure?')) {
                      router.delete('/subscriptions');
                    }
                  }}
                  data-bs-toggle="modal"
                  data-bs-target="#CancelPlan"
                  className="btn btn-outline-extralight border btn-white text-dark d-block"
                >
                  Cancel Plan
                </Link>

              </>
            }
          </div>
        </div>
        <div className="features">
          <p>Features:</p>
          <ul className="list-unstyled mb-0 d-flex flex-column gap-6">
            {
              plan.features.map((feature: any, index) => (

                <li className="d-flex align-items-start gap-2" key={index}>
                  <img src="../images/svgs/icon-check-filled.svg" alt="check" className="flex-shrink-0" />
                  <h5 className="fs-3 mb-0 font-work-sans fw-normal">{feature.name}</h5>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionCard
