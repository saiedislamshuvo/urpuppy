import { PageProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import SubscriptionCard from './Partials/SubscriptionCard';
import AlertDismissible from '@/Components/AlertDismissible';

export default function MySubscription({
    plan,
    breeder_plan,
    premium_subscription,
    breeder_subscription,
    plan_next_billing,
    plan_cancel_at,
    breeder_next_billing,
    breeder_cancel_at,
    breeder_requests,
}: PageProps<{
    plan_cancel_at: boolean;
    plan_next_billing: string;
    breeder_cancel_at: boolean;
    breeder_next_billing: string;
    breeder_requests: any;
    plan?: App.Data.PlanData;
    breeder_plan?: App.Data.PlanData;
    premium_subscription?: App.Data.SubscriptionData;
    breeder_subscription?: App.Data.SubscriptionData;
}>) {
    const user = usePage().props.auth.user;

    return (
        <DashboardLayout activeTab="My Subscription" metaTitle="My Subscription">
            {
                (breeder_requests?.status != 'approved') &&
                <>
                    {
                        breeder_requests?.status == 'pending' &&
                        <AlertDismissible variant="primary" heading="Pending Breeder Request" message={<> <p>
                            {breeder_requests?.message ?? ''}
                        </p> </>} />
                    }

                    {
                        breeder_requests?.status == 'rejected' &&
                        <AlertDismissible variant="danger" heading="Your Breeder Request has been rejected" message={<> <p>
                            {breeder_requests?.message ?? ''}
                            <br />
                            <Link aria-label='Retry' method="post"
                                className="border-0 bg-transparent text-primary text-decoration-underline "
                                href="/breeder/request/retry"> Request Again</Link>
                        </p> </>} />
                    }

                </>

            }
            {
                (!user?.breeder_plan && breeder_requests?.status == 'approved') &&
                <AlertDismissible variant="success" heading="Your application has been approved" message={<> <p>
                    You can now proceed to payment for your breeder plan <Link href="/plans/breeder">Choose a plan</Link>
                    <br />
                </p> </>} />
            }

            {/* Profile Completion Alert - Show at top if profile not completed */}
            {
                ((user?.is_seller && !user?.profile_completed) || (user?.is_breeder && !user?.breeder_profile_completed)) &&
                <AlertDismissible
                    variant="warning"
                    heading="Complete Your Profile"
                    message={
                        <>
                            <p>
                                {user?.is_breeder && !user?.breeder_profile_completed && (
                                    <>
                                        Please complete your breeder profile to access subscription plans.
                                        <br />
                                        <Link
                                            aria-label="Complete Profile"
                                            href="/breeders/create"
                                            method="get"
                                            as="button"
                                            className="btn btn-primary mt-2"
                                        >
                                            Complete Profile
                                        </Link>
                                    </>
                                )}
                                {user?.is_seller && !user?.profile_completed && (
                                    <>
                                        Please complete your seller profile to access subscription plans.
                                        <br />
                                        <Link
                                            aria-label="Complete Profile"
                                            href="/seller/create"
                                            method="get"
                                            as="button"
                                            className="btn btn-primary mt-2"
                                        >
                                            Complete Profile
                                        </Link>
                                    </>
                                )}
                            </p>
                        </>
                    }
                />
            }

            <div className="tab-content" id="pills-tabContent">
                <div className={` tab-pane fade show active `} id="pills-my-subscription" role="tabpanel"
                    aria-labelledby="pills-my-subscription-tab" tabIndex={0}>
                    {
                        (plan || breeder_plan) &&
                        <div className="card border">
                            <div className="card-body">
                                <a rel='nofollow' className="btn btn-secondary" href="/billing" >Manage subscription</a>
                            </div>
                        </div>
                    }

                    {/* Show subscription card if subscription exists but plan is null */}
                    {premium_subscription && !plan && (
                        <div className="card border mb-3">
                            <div className="card-body">
                                <h5 className="mb-3 pb-3 border-bottom fs-7">Active Subscription</h5>
                                <div className="d-md-flex align-items-start justify-content-between">
                                    <div className="mb-3 mb-md-0">
                                        <p className="text-dark fs-5 mb-2">Subscription Type: <strong>{premium_subscription.type}</strong></p>
                                        <p className="text-muted mb-2">Status: <span className="badge bg-primary">You need to purchase a plan</span></p>
                                        {premium_subscription.ends_at && (
                                            <p className="text-muted mb-0">Ends at: {new Date(premium_subscription.ends_at).toLocaleDateString()}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Link
                                            href="/plans"
                                            className="btn btn-primary"
                                            aria-label="Purchase a plan"
                                        >
                                            Purchase Plan
                                        </Link>
                                    </div>
                                </div>
                                <div className="mt-3 pt-3 border-top">
                                    <AlertDismissible
                                        variant="warning"
                                        heading="Plan Not Assigned"
                                        message={
                                            <p className="mb-0">
                                                Your subscription is active but no plan is assigned. Please purchase a plan to continue.
                                            </p>
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {breeder_subscription && !breeder_plan && (
                        <div className="card border mb-3">
                            <div className="card-body">
                                <h5 className="mb-3 pb-3 border-bottom fs-7">Active Subscription</h5>
                                <div className="d-md-flex align-items-start justify-content-between">
                                    <div className="mb-3 mb-md-0">
                                        <p className="text-dark fs-5 mb-2">Subscription Type: <strong>{breeder_subscription.type}</strong></p>
                                        <p className="text-muted mb-2">Status: <span className="badge bg-primary">You need to purchase a plan</span></p>
                                        {breeder_subscription.ends_at && (
                                            <p className="text-muted mb-0">Ends at: {new Date(breeder_subscription.ends_at).toLocaleDateString()}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Link
                                            href="/plans/breeder"
                                            className="btn btn-primary"
                                            aria-label="Purchase a breeder plan"
                                        >
                                            Purchase Plan
                                        </Link>
                                    </div>
                                </div>
                                <div className="mt-3 pt-3 border-top">
                                    <AlertDismissible
                                        variant="warning"
                                        heading="Plan Not Assigned"
                                        message={
                                            <p className="mb-0">
                                                Your subscription is active but no plan is assigned. Please purchase a plan to continue.
                                            </p>
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {plan && <SubscriptionCard key="plan" next_billing={plan_next_billing} cancel_at={plan_cancel_at} plan={plan} />}
                    {breeder_plan && <SubscriptionCard key="breeder_plan" next_billing={breeder_next_billing} cancel_at={breeder_cancel_at} plan={breeder_plan} />}

                    {/* No Plan Purchased - Show if no subscriptions exist */}
                    {(!premium_subscription && !breeder_subscription && !plan && !breeder_plan) &&
                        <div className="card border">
                            <div className="card-body pb-0">
                                <div className="row justify-content-center">
                                    <div className="col-lg-8 text-center py-12">
                                        <div className="mb-4">
                                            <img
                                                src="/images/svgs/icon-card.svg"
                                                alt="Subscription"
                                                width="120"
                                                height="120"
                                                className="text-muted"
                                            />
                                        </div>
                                        <h3 className="h4 mb-3">No subscription purchased</h3>
                                        <p className="text-muted mb-4">
                                            Choose a plan to unlock premium features and reach more buyers!
                                        </p>
                                        {(user?.is_seller && user?.profile_completed) && (
                                            <Link
                                                href="/plans"
                                                className="btn btn-primary"
                                                aria-label="Choose a plan"
                                            >
                                                Choose a Plan
                                            </Link>
                                        )}
                                        {(user?.is_breeder && user?.breeder_profile_completed) && (
                                            <Link
                                                href="/plans/breeder"
                                                className="btn btn-primary"
                                                aria-label="Choose a breeder plan"
                                            >
                                                Choose a Plan
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </DashboardLayout>
    );
}

