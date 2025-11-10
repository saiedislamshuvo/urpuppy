import React from 'react'
import PuppyCard from './Card'
import { Link, usePage } from '@inertiajs/react'
import Card from '../Post/Card'

const BlogShowcase = ({ post_data }: { post_data: App.Data.PostData[] }) => {
  const { settings } = usePage().props as any;
  const sectionTitle = settings?.blogs_section_title || "Latest Posts";
  const buttonText = settings?.blogs_button_text || "Discover new posts";
  const buttonLink = settings?.blogs_button_link || "/posts";

  return (
    <section className="new-arrivals py-5">
      <div className="container ">
        <div className="d-flex align-items-center justify-content-between mb-4 mb-lg-8">
          <h2 className="mb-0" data-aos="fade-right" data-aos-delay="100" data-aos-duration="1000">{sectionTitle}</h2>
          <Link className="btn btn-outline-extralight btn-white bg-white border text-dark d-none d-md-flex align-items-center gap-2"
            href={buttonLink} data-aos="fade-left" data-aos-delay="100" data-aos-duration="1000">{buttonText}</Link>
        </div>
        {post_data && post_data.length > 0 ? (
          <div className="row">
            {post_data.map((post: App.Data.PostData, index) => (
              <Card key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <p className="mb-0">No blog posts available at the moment.</p>
          </div>
        )}
      </div>
    </section>


  )
}

export default BlogShowcase
