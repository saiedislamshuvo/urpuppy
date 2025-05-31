import { Link } from '@inertiajs/react'
import React from 'react'

const SiblingCard = ({puppy} : { puppy: App.Data.PuppySiblingData }) => {
  return (
                  <div className="col-6 mb-3 pb-1">
                    <div className="charlies-siblings">
                <Link aria-label="urpuppy-img" href={`/puppies/${puppy.slug}`}>
                      <div className="charlies-siblings-img position-relative overflow-hidden rounded-1 mb-2">
                        <img src={puppy.image} alt="urpuppy-img"
                        style={{
                            height: '120px'
                        }}
                          className="object-fit-cover w-100 " />
                      </div>
</Link>
                <Link aria-label="urpuppy-img" href={`/puppies/${puppy.slug}`}>
                      <h6 className="mb-1">{puppy.name}</h6>
                </Link>
                      <div className="d-flex align-items-center gap-1">
                        <img src="/images/svgs/icon-female.svg" alt="urpuppy-img" width="16" height="16" />
                        <p className="mb-0 fs-2">{puppy.gender}</p>
                      </div>
                    </div>
                  </div>
  )
}

export default SiblingCard
