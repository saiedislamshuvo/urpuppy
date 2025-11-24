import BannerSlider from '@/Components/BannerSlider'
import BreederCard from '@/Components/Breeder/BreederCard'
import BreedFilter from '@/Components/Filters/BreedFilter'
import StateFilter from '@/Components/Filters/StateFilter'
import MetaTags from '@/Components/MetaTags'
import Pagination from '@/Components/Pagination'
import SmallBannerWithContent from '@/Components/Sliders/SmallBannerWithContent'
import Layout from '@/Layouts/Layout'
import { PaginatedCollection } from '@/types/global'
import { Link, router, usePage } from '@inertiajs/react'
import React, { useState } from 'react'

const Index = ({ breeders, breed, seo_title, seo_description, url }: {
  breeders: PaginatedCollection<App.Data.BreederFullData>,
  breed: string,
  seo_title: string,
  seo_description: string,
  url: string

}) => {
  const { settings } = usePage().props as any;
  const heroTitle = settings?.breeders_hero_title || "Featured breeders";
  const heroBackground = settings?.breeders_hero_background || '/images/breeds-slider/hero-inner-slider-2.jpg';
  const sectionTitle = settings?.breeders_section_title || "Choose your Breeder";
  const headertitle = breed ? `Trusted ${breed} Breeders – Verified, Reviewed & Available Near You` : heroTitle;

  const [filter, setFilter] = useState<any>({
    breed: {
      value: '',
      label: 'All breeds'
    }

  });

  return (
    <Layout>
      <MetaTags title={seo_title} description={seo_description} url={url} />
      <BannerSlider slidesPerView={1} children={[
        <SmallBannerWithContent title={headertitle} pill="Feature" key={1} background_image={heroBackground} />,
      ]} />

      <section className="find-ur-breeds bg-extralight position-relative z-1 py-7 py-md-5 py-xl-9">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-xl-5">
              <h2 className="mb-7 pb-1 text-center" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000">Find
                Breeders</h2>
              <div className="grid-filter d-none d-lg-block aos-init aos-animate" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
                <div className="d-flex align-items-center justify-content-between">

                  <div className="breed d-flex gap-2 border-end algin-items-center">
                    <BreedFilter title="Find a breed" setBreed={setFilter} />
                  </div>

                  <div className="breed d-flex gap-2 ">
                    <StateFilter setState={setFilter} />
                  </div>

                  <Link aria-label='Search' preserveState href={`/breeders?breed=${filter?.breed?.value}&state=${filter?.state?.value}`}
                    className="btn btn-primary round-48 flex-shrink-0 p-2 d-flex align-items-center justify-content-center">
                    <img src="/images/svgs/icon-search.svg" alt="urpuppy-img" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="choose-your-breeds py-7 py-md-5 py-xl-9">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between mb-4 mb-lg-8">
            <h3 className="mb-0" data-aos="fade-right" data-aos-delay="100" data-aos-duration="1000">{sectionTitle}</h3>
          </div>


          <div className="row mb-4 mb-lg-8">
            {breeders.data && breeders.data.map((breeder: App.Data.BreederFullData) => (
              <BreederCard hasBorder={true} key={breeder.slug} breeder={breeder} />
            ))}
          </div>
          <Pagination links={breeders.links} />

        </div>
      </section>


    </Layout>
  )
}

export default Index
