import React from 'react'
import PuppyCard from './Card'
import { Link } from '@inertiajs/react'
import Card from '../Post/Card'

const BlogShowcase = ({post_data}: { post_data: App.Data.PostData[] }) => {
  return (
            <section className="new-arrivals  py-5 py-md-9 ">
      <div className="container ">
        <div className="d-flex align-items-center justify-content-between mb-4 mb-lg-8">
          <h2 className="mb-0" data-aos="fade-right" data-aos-delay="100" data-aos-duration="1000">Latest Posts</h2>
          <Link className="btn btn-outline-extralight btn-white bg-white border text-dark d-none d-md-flex align-items-center gap-2"
            href="/posts" data-aos="fade-left" data-aos-delay="100" data-aos-duration="1000">Discover new posts</Link>
        </div>
        <div className="row">
            {post_data.map((post: App.Data.PostData, index) => (
                <Card  key={post.slug}  post={post} />
            ))}
        </div>
      </div>
    </section>


  )
}

export default BlogShowcase
