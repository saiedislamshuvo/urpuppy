import Layout from '@/Layouts/Layout'
import React from 'react'
import Banner from '../Home/Sections/Banner'
import PuppyCard from '@/Components/Puppy/Card'
import MetaTags from '@/Components/MetaTags'
import { PaginatedCollection } from '@/types/global'
import Pagination from '@/Components/Pagination'

const Index = ({ favorite_puppies }: {
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
          {favorite_puppies.data && favorite_puppies.data.length > 0 ? (
            <>
              <div className="row mb-4 mb-lg-8">
                {favorite_puppies.data.map((puppy: any) => {
                  return (
                    <PuppyCard key={puppy.id} puppy={puppy} />
                  )
                })}
              </div>
              <Pagination links={favorite_puppies.links} />
            </>
          ) : (
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center py-8">
                <div className="mb-4">
                  <svg
                    width="120"
                    height="120"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-muted"
                  >
                    <path
                      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="h4 mb-3">No favorites yet</h3>
                <p className="text-muted mb-0">
                  Start adding puppies to your favorites to see them here!
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}

export default Index
