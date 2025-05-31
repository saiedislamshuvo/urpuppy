import { PageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import Layout from '@/Layouts/Layout';
import ListPill from '@/Components/ListPill';
import SubscriptionCard from './Partials/SubscriptionCard';
import UserProfile from './Partials/AccountSettings/UserProfile';
import MyPuppies from './MyPuppies';
import { PaginatedCollection } from '@/types/global';
import SavedSearchCard from '@/Components/SavedSearchCard';
import { useEffect, useState } from 'react';
import AlertDismissible from '@/Components/AlertDismissible';
import Button from '@/Components/ui/Button';
import MetaTags from '@/Components/MetaTags';

const NavigationSettings = [
    {  name: 'Account Settings', href: '#pills-account-settings', id: 'pills-account-settings-tab', logo: '../images/svgs/icon-user-dark.svg' },
    {  name: 'My Subscription', href: '#pills-my-subscription', id: 'pills-my-subscription-tab', logo: '../images/svgs/icon-card.svg' },
    {  name: 'Saved Search', href: '#pills-saved-search', id: 'pills-saved-search-tab', logo: '../images/svgs/icon-bookmarks.svg' },
    {  name: 'My Puppies', href: '#pills-my-puppies', id: 'pills-my-puppies-tab', logo: '../images/svgs/icon-paws-dark.svg' },
]

export default function Edit({
    mustVerifyEmail,
    status,
    plan,
    breeder_plan,
    puppies,
    saved_searches,
    plan_next_billing,
    plan_cancel_at,

    breeder_next_billing,
    breeder_cancel_at,
    breeder_requests,
    tab
}: PageProps<{ mustVerifyEmail: boolean;
        plan_cancel_at: boolean;
        plan_next_billing: string,
        breeder_cancel_at: boolean;
        breeder_next_billing: string,
        breeder_requests: any,
        status?: string, plan: App.Data.PlanData,  breeder_plan: App.Data.PlanData,  tab: string, puppies: PaginatedCollection<App.Data.PuppyCardData>, saved_searches: App.Data.SavedSearchData[] }>) {



    const errors = usePage().props.errors;
    const user = usePage().props.auth.user;

    const [currentTab, setCurrentTab] = useState(tab ?? 'Account Settings')


    return (
        <Layout
            navType="secondary"
        >
            <MetaTags title="Profile" />

              <div className="page-wrapper position-relative overflow-hidden">

    <section className="account-settings py-7 py-md-5 py-xl-9">
      <div className="container">
                        {
                           (  breeder_requests && breeder_requests?.status != 'approved' ) &&
                                <>
                                    {
                                breeder_requests?.status == 'pending' &&
                        <AlertDismissible variant="primary" heading="Pending Breeder Request" message={<> <p>
                                    {breeder_requests.message}
                                </p> </>} />
                                    }

                                    {
                                breeder_requests?.status == 'rejected' &&
                        <AlertDismissible variant="danger" heading="Your Breeder Request has been rejected" message={<> <p>
                                    {breeder_requests.message}
                                                <br/>
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
                                                <br/>
                                </p> </>} />
                                    }


                        {
                            mustVerifyEmail && user.email_verified_at == null &&
                        <AlertDismissible variant="primary" heading="Verify your email" message={<> <p> Before you get started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.
  <Link
                                        aria-label='Resend verification email'
                                href="/email/verification-notification"
                                method="post"
                                as="button"
                                className="border-0 bg-transparent text-primary text-decoration-underline "
                            >
                                Click here to re-send the verification email.
                            </Link>
                                </p> </>} />


                        }


        <div className="row">
          <div className="col-lg-3">
            <ul className="nav nav-pills justify-content-center flex-lg-column gap-2 mb-4 mb-lg-0" id="pills-tab"
              role="tablist">
                {NavigationSettings.map((item, index) =>
                                        {
                                            if (item.name == 'Saved Search') {
                                                if (!user?.roles?.includes('buyer')) {
                                                    return;
                                                }
                                            }


                                            if (item.name == 'My Subscription' || item.name == 'My Puppies' ) {

                                                if (user?.roles?.includes('buyer')) {
                                                    return
                                                }

                                            }

                                        return (

                    <ListPill tab={tab} key={index} name={item.name} logo={item.logo} href={item.href}  />

                ) } )}
            </ul>
          </div>
          <div className="col-lg-9">
            <div className="tab-content" id="pills-tabContent">
                                    <div>
                            {errors && Object.values(errors).length > 0 &&
                                                <div className="alert alert-danger">
                                                    <ul>
                                                        {Object.keys(errors).map((key, index) => (
                                                            <li key={index}>{errors[key]}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                }
                                    </div>

              <div className={` tab-pane fade  ${currentTab == 'Account Settings' ? 'show active' : ''} `} id="pills-account-settings" role="tabpanel"
                aria-labelledby="pills-account-settings-tab" tabIndex={0}>
                 <UserProfile />

              </div>
              {
                                    <>
              <div className={` tab-pane fade ${currentTab == 'My Subscription' ? 'show active' : ''} `}  id="pills-my-subscription" role="tabpanel"
                aria-labelledby="pills-my-subscription-tab" tabIndex={0}>
                                                        {
                                                            (plan || breeder_plan) &&
                <div className="card border">
                  <div className="card-body">

                                                                        <a className="btn btn-secondary" href="/billing" >Manage subscription</a>


                    </div>
                    </div>
}
                    {plan && <SubscriptionCard key="plan" next_billing={plan_next_billing} cancel_at={plan_cancel_at}  plan={plan}/> }
                    {breeder_plan && <SubscriptionCard key="breeder_plan" next_billing={breeder_next_billing} cancel_at={breeder_cancel_at}  plan={breeder_plan}/> }

                    {(!plan && !breeder_plan) &&
                <div className="card border">
                  <div className="card-body pb-0">
                    <div className="row">

                { ( user?.roles?.includes('seller') && user?.profile_completed ) && <h6 className="mb-4">
                <Link aria-label='Choose Plan' href="/plans" method="get" as="button" className="btn btn-primary">Choose Plan</Link>
                                                                    </h6>  }

                { ( user?.roles?.includes('breeder') && user?.profile_completed ) && <h6 className="mb-4">
                <Link aria-label='Choose Plan' href="/plans/breeder" method="get" as="button" className="btn btn-primary">Choose Plan</Link>
                                                                    </h6>  }

                { ( !user?.profile_completed ) && <h6 className="mb-4">
                                        {
                                            user?.roles?.includes('breeder') && <>

                                                                <h6>
                                                                            <Link aria-label='Complete Profile' href="/breeders/create" method="get" as="button" className="btn btn-primary">Complete Profile</Link>

                                                                            </h6>

                                                                        </>

                                                                    }

                                        {
                                            user?.roles?.includes('seller') && <>
                                                                            <h6>

                                                                            <Link aria-label='Complete Profile' href="/seller/create" method="get" as="button" className="btn btn-primary">Complete Profile</Link>
                                                                            </h6>

                                                                        </>

                                                                    }



                                                                    </h6>  }


                    </div>
                  </div>
                </div>

                                            }

              </div>
</> }
              <div className={` tab-pane fade ${currentTab == 'Saved Search' ? 'show active' : ''} `} id="pills-saved-search" role="tabpanel"
                aria-labelledby="pills-saved-search-tab" tabIndex={0}>
                <div className="card border">
                  <div className="card-body pb-0">
                    <div className="row">
                    {saved_searches.length > 0 ? saved_searches.map((saved_search: App.Data.SavedSearchData, index: number) => (
                                                        <div className="col-md-6 col-xx-4">
                        <SavedSearchCard key={index} saved_search={saved_search} />
                                                        </div>
                    )): <h6 className="mb-4"> No Saved Search</h6>
                    }
                    </div>
                  </div>
                </div>
              </div>
              <div className={` tab-pane fade ${currentTab == 'My Puppies' ? 'show active' : ''} `} id="pills-my-puppies" role="tabpanel"
                aria-labelledby="pills-my-puppies-tab" tabIndex={0}>
                <div className="card border">
                  <div className="card-body pb-0">
                    <MyPuppies puppies={puppies}/>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>

  </div>


            {/**

            <div className="py-2">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
*/}

        </Layout>
    );
}
