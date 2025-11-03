import Layout from '@/Layouts/Layout'
import React from 'react'
import PuppyCard from '@/Components/Puppy/Card'
import MetaTags from '@/Components/MetaTags'
import { PaginatedCollection } from '@/types/global'
import Pagination from '@/Components/Pagination'

const AllPuppies = ({ seller_name, all_puppies, url }: {
  seller_name: string,
  all_puppies: PaginatedCollection<App.Data.PuppyData>,
  url: string
}) => {
  return (
    <Layout>
      <MetaTags url={url} title="Favorites" />
      <section
        className="hero-section position-relative d-flex align-items-center pt-11 pb-10">
        <div className="container position-relative z-1 pt-lg-1 mt-lg-3 mb-lg-4">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <h1 className="text-white text-center fs-11 mb-1" data-aos="fade-up" data-aos-delay="100"
                data-aos-duration="1000">{seller_name}</h1>
            </div>
          </div>
        </div>
      </section>
      <section className="puppy-spotlight py-7 py-md-5 py-xl-9">
        <div className="container">
          <div className="row mb-4 mb-lg-8">
            {
              all_puppies.data && all_puppies.data.length > 0 && all_puppies.data.map((puppy: any) => {
                return (
                  <PuppyCard key={puppy.id} puppy={puppy} />
                )
              })
            }
          </div>
          <Pagination links={all_puppies.links} />
        </div>
      </section>
    </Layout>
  )
}

export default AllPuppies
