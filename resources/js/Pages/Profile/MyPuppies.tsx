import React from 'react'

import { PaginatedCollection } from '@/types/global'
import PuppyCard from '@/Components/Puppy/Card'
import Button from '@/Components/ui/Button'
import { Link, router } from '@inertiajs/react'

const MyPuppies = ({ puppies }: {
  puppies: PaginatedCollection<App.Data.PuppyCardData>
  // states: App.Data.StateData[],
  // breeds: App.Data.BreedData[]
}) => {


  return (
    <>

      <div className="row">
        {
          puppies?.data && puppies.data.length ? puppies?.data.map((puppy: App.Data.PuppyCardData) => (
            <div key={puppy.id} className="col-md-6 col-lg-5 col-xl-5 mb-4">

              <PuppyCard className="" puppy={puppy} />

              <Link aria-label='Edit' className="btn btn-primary mt-2 btn-sm" style={{ marginRight: "4px" }} href={`/seller/create/${puppy.id}`}>Edit </Link>
              <Link
                aria-label='Delete'
                href="/subscriptions"
                method="delete"
                as="button"
                onClick={(e) => {
                  e.preventDefault();
                  if (window.confirm('Are you sure?')) {
                    router.delete(`/seller/delete/${puppy.id}`);
                  }
                }}
                data-bs-toggle="modal"
                data-bs-target="#CancelPlan"
                className="btn btn-secondary btn-sm mt-2 "
              >
                Delete
              </Link>
            </div>

          )) : (
            <div className="col-12">
              <div className="row justify-content-center">
                <div className="col-lg-8 text-center py-12">
                  <div className="mb-4">
                    <img
                      src="/images/svgs/icon-paws-dark.svg"
                      alt="My Puppies"
                      width="120"
                      height="120"
                      className="text-muted"
                    />
                  </div>
                  <h3 className="h4 mb-3">No puppies listed yet</h3>
                  <p className="text-muted mb-4">
                    Start listing your puppies to reach potential buyers!
                  </p>
                  <Link
                    href="/seller/create"
                    className="btn btn-primary"
                    aria-label="Create new puppy listing"
                  >
                    List Your First Puppy
                  </Link>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </>

  )

}

export default MyPuppies
