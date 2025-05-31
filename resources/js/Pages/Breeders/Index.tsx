import BannerSlider from '@/Components/BannerSlider'
import BreederCard from '@/Components/Breeder/BreederCard'
import BreedFilter from '@/Components/Filters/BreedFilter'
import StateFilter from '@/Components/Filters/StateFilter'
import MetaTags from '@/Components/MetaTags'
import Pagination from '@/Components/Pagination'
import SmallBannerWithContent from '@/Components/Sliders/SmallBannerWithContent'
import Layout from '@/Layouts/Layout'
import { PaginatedCollection } from '@/types/global'
import { Link, router } from '@inertiajs/react'
import React, { useState } from 'react'

const Index = ({breeders} : {
    breeders: PaginatedCollection<App.Data.BreederFullData>
}) => {

    const [filter, setFilter] = useState<any>({
        breed: {
            value: '',
            label: 'All breeds'
        }

    });

  return (
        <Layout>
            <MetaTags title="Breeders"  />
            <BannerSlider slidesPerView={1} children={[
                <SmallBannerWithContent title="Register as a breeder" pill="Feature" key={1} background_image="/images/breeds-slider/hero-inner-slider-2.jpg" />,
            ]} />

                <section className="find-ur-breeds bg-extralight position-relative z-1 py-7 py-md-5 py-xl-9">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7 col-xl-5">
            <h2 className="mb-7 pb-1 text-center" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000">Find
              Breeders</h2>
            <div className="grid-filter d-none d-lg-block aos-init aos-animate" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
              <div className="d-flex align-items-center justify-content-between">

                <div className="breed d-flex gap-2 border-end">
                    <BreedFilter title="Find a breed" setBreed={setFilter}/>
                </div>

                <div className="breed d-flex gap-2 ">
                    <StateFilter setState={setFilter}/>
                </div>

                <Link preserveState href={`/breeders?breed=${filter?.breed?.value}&state=${filter?.state?.value}`}
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
          <h2 className="mb-0" data-aos="fade-right" data-aos-delay="100" data-aos-duration="1000">Choose your Breeder</h2>
        </div>


          <div className="row mb-4 mb-lg-8">
                            {breeders.data && breeders.data.map((breeder: App.Data.BreederFullData) => (
                                <BreederCard hasBorder={true} key={breeder.slug} breeder={breeder} />
                            ))}
          </div>
                    <Pagination links={breeders.links}/>

        </div>
        </section>


</Layout>
  )
}

export default Index
