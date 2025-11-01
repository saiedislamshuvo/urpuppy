import Layout from '@/Layouts/Layout'
import React from 'react'
import Banner from '../Home/Sections/Banner'
import PuppyCard from '@/Components/Puppy/Card'
import MetaTags from '@/Components/MetaTags'
import { PaginatedCollection } from '@/types/global'
import Pagination from '@/Components/Pagination'

const Index = ({favorite_puppies}: {
    favorite_puppies: PaginatedCollection<App.Data.PuppyData>
}) => {
  return (
  <Layout>
    <MetaTags title="Favorites" />
   <section
    className="hero-section position-relative d-flex align-items-center pt-11 pb-10">
      <div className="container position-relative z-1 pt-lg-1 mt-lg-3 mb-lg-4">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <h1 className="text-white text-center fs-11 mb-1" data-aos="fade-up" data-aos-delay="100"
              data-aos-duration="1000">My Favorite Puppies</h1>
          </div>
        </div>
      </div>
    </section>


            <section className="puppy-spotlight py-7 py-md-5 py-xl-9">
                <div className="container">
                    <div className="row mb-4 mb-lg-8">
                        {
                         favorite_puppies.data && favorite_puppies.data.length > 0 && favorite_puppies.data.map((puppy: any) => {
                                return (
                                    <PuppyCard key={puppy.id} puppy={puppy}/>
                                )
                            })
                        }


                    </div>
                <Pagination links={favorite_puppies.links}/>

                </div>

            </section>


        </Layout>
  )
}

export default Index
