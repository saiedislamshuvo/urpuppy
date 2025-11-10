import { PageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import DashboardLayout from '@/Layouts/DashboardLayout';
import UserProfile from './Partials/AccountSettings/UserProfile';
import MyPuppies from './MyPuppies';
import { PaginatedCollection } from '@/types/global';
import SavedSearchCard from '@/Components/SavedSearchCard';
import { useEffect, useState } from 'react';
import AlertDismissible from '@/Components/AlertDismissible';
import Button from '@/Components/ui/Button';
import MetaTags from '@/Components/MetaTags';

export default function Edit({
  mustVerifyEmail,
  status,
  puppies,
  saved_searches,
  breeder_requests,
  tab
}: PageProps<{
  mustVerifyEmail: boolean;
  breeder_requests: any,
  status?: string, tab: string, puppies: PaginatedCollection<App.Data.PuppyCardData>, saved_searches: App.Data.SavedSearchData[]
}>) {



  const errors = usePage().props.errors ?? {};
  const user = usePage().props.auth.user;

  const [currentTab, setCurrentTab] = useState(tab ?? 'Account Settings')


  return (
    <DashboardLayout activeTab={tab ?? 'Account Settings'} metaTitle="Profile">
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


      {
        mustVerifyEmail && user?.email_verified_at == null &&
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

      <div className="tab-content" id="pills-tabContent">
        <div>
          {errors && Object.keys(errors).length > 0 &&
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
        <div className={` tab-pane fade ${currentTab == 'Saved Search' ? 'show active' : ''} `} id="pills-saved-search" role="tabpanel"
          aria-labelledby="pills-saved-search-tab" tabIndex={0}>
          <div className="card border">
            <div className="card-body pb-0">
              {saved_searches && saved_searches.length > 0 ? (
                <div className="row">
                  {saved_searches.map((saved_search: App.Data.SavedSearchData, index: number) => (
                    <div className="col-md-6 col-xx-4">
                      <SavedSearchCard key={index} saved_search={saved_search} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="row justify-content-center">
                  <div className="col-lg-8 text-center py-12">
                    <div className="mb-4">
                      <img
                        src="/images/svgs/icon-bookmarks.svg"
                        alt="Saved Search"
                        width="120"
                        height="120"
                        className="text-muted"
                      />
                    </div>
                    <h3 className="h4 mb-3">No saved searches yet</h3>
                    <p className="text-muted mb-0">
                      Save your favorite search criteria to quickly find puppies that match your preferences!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={` tab-pane fade ${currentTab == 'My Puppies' ? 'show active' : ''} `} id="pills-my-puppies" role="tabpanel"
          aria-labelledby="pills-my-puppies-tab" tabIndex={0}>
          <div className="card border">
            <div className="card-body pb-0">
              {puppies && <MyPuppies puppies={puppies} />}
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
