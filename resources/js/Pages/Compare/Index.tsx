import Layout from '@/Layouts/Layout'
import React from 'react'
import Banner from '../Home/Sections/Banner'
import PuppyCard from '@/Components/Puppy/Card'
import MetaTags from '@/Components/MetaTags'
import { PaginatedCollection } from '@/types/global'
import Pagination from '@/Components/Pagination'
import { Link } from '@inertiajs/react'

const Index = ({ compare_puppies }: {
    compare_puppies: PaginatedCollection<App.Data.PuppyData>
}) => {
    return (
        <Layout>
            <MetaTags title="Compare" />
            <section
                className="hero-section position-relative d-flex align-items-center pt-11 pb-10">
                <div className="container position-relative z-1 pt-lg-1 mt-lg-3 mb-lg-4">
                    <div className="row justify-content-center">
                        <div className="col-xl-10">
                            <h1 className="text-white text-center fs-11 mb-1" data-aos="fade-up" data-aos-delay="100"
                                data-aos-duration="1000">My Compare List</h1>
                        </div>
                    </div>
                </div>
            </section>


            <section className="puppy-spotlight py-7 py-md-5 py-xl-9">
                <div className="container">
                    <div className="row mb-4 mb-lg-8">
                        {
                            compare_puppies.data && compare_puppies.data.length > 0 && compare_puppies.data.map((puppy: any) => {
                                return (
                                    <PuppyCard key={puppy.id} puppy={puppy} />
                                )
                            })
                        }


                    </div>
                    <div className="row mb-4 mb-lg-8">
                        <div className="col-12 text-center">
                            <Link href="/puppies" className="btn btn-primary d-inline-flex align-items-center gap-2">
                                <img loading="lazy" src="/images/svgs/icon-paws.svg" alt="urpuppy-img" />
                                Add More Puppies to Compare
                            </Link>
                        </div>
                    </div>
                    <Pagination links={compare_puppies.links} />

                </div>

            </section>


        </Layout>
    )
}

export default Index

