import Layout from '@/Layouts/Layout'
import React from 'react'
import Banner from '../Home/Sections/Banner'
import Card from '@/Components/Post/Card'
import { PaginatedCollection } from '@/types/global'
import MetaTags from '@/Components/MetaTags'

const Index = ({posts} : {
    posts: PaginatedCollection<App.Data.PostData>
}) => {
  return (
  <Layout>
            <Banner header="Blog" size="md" enable_filter={false} subheader="" />
            <MetaTags url={`https://urpuppy.com/posts`} title="Blog" description="Blog" image="" />
            {

        <section className="puppy-spotlight py-7 py-md-5 py-xl-9" id="scroll-target">
          <div className="container" >
            <div className="row mb-4 mb-lg-8">
                            {
                posts.data.length > 0 ?
                <>
                        {
                            posts.data.map((post, index) => {
                                return (
                                    <Card key={index} post={post} />
                                )
                            })
                        }

                </>
                : "No posts found"
                            }
                </div>
                </div>
                </section>


            }



        </Layout>
  )
}

export default Index
