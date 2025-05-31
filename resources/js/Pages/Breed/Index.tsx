import BannerSlider from '@/Components/BannerSlider'
import BreedFilter from '@/Components/Filters/BreedFilter'
import MetaTags from '@/Components/MetaTags'
import SmallBannerWithContent from '@/Components/Sliders/SmallBannerWithContent'
import Layout from '@/Layouts/Layout'
import { PaginatedCollection } from '@/types/global'
import { Link, router } from '@inertiajs/react'
import React, { useState } from 'react'

const Index = ({breeds, letter_param = 'A'} : {
    breeds: App.Data.BreedData[],
    letter_param?: string
}) => {

    const [filter, setFilter] = useState<any>({
        breed: {
            value: '',
            label: 'All breeds'
        }

    });

  return (
        <Layout>



            <BannerSlider slidesPerView={1} children={[
                <SmallBannerWithContent key="1" title="Siberian Husky: Your Winter Companion" />,
            ]} />

    <MetaTags title="Breeds" />

                <section className="find-ur-breeds bg-extralight position-relative z-1 py-7 py-md-5 py-xl-9">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4">
            <h2 className="mb-7 pb-1 text-center" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000">Find
              Breeds</h2>
            <div className="grid-filter" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
              <div className="d-flex  justify-content-between">

                <div className="breed d-flex gap-2 ">
                    <BreedFilter setBreed={setFilter}/>
                </div>

                <Link aria-label='search' href={`/breeds/${filter.breed.value}`}
                  className="btn btn-primary round-48 flex-shrink-0 p-2 d-flex align-items-center justify-content-center">
                  <img src="/images/svgs/icon-search.svg" alt="icon-search" />
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
          <h2 className="mb-0" data-aos="fade-right" data-aos-delay="100" data-aos-duration="1000">Choose your breeds</h2>
        </div>
        <div className="choose-breeds-tab">
          <ul className="nav nav-pills mb-8 flex-xxl-nowrap" id="pills-tab" role="tablist" data-aos="fade-up"
            data-aos-delay="200" data-aos-duration="1000">

                                {
                                    ['All', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].map((letter, index) => (
<li className="nav-item" role="presentation" key={index}>
                                        <Link
                                            preserveState
                                            preserveScroll
                                            prefetch
                                            cacheFor="1m"
                                            aria-label='search'

                                            href={`/breeds?filter[name]=${letter}`}
                                            as="button"
                                            key={index} className={`nav-link ${letter_param === letter ? 'active' : ''}`} id={`pills-${letter}-tab`} data-bs-toggle="pill" data-bs-target={`#pills-${letter}`}> {letter}

                                        </Link>
</li>
                                        )
                                        )
                                }



            </ul>

                                  <div className="tab-content tab-content" data-aos="fade-up"  data-aos-duration="1000" data-aos-delay="300" id="pills-tabContent"
           >
            <div className="tab-pane active" id="pills-a" role="tabpanel" aria-labelledby="pills-a-tab" >
              <div className="row">

                                    {
    breeds.map((breed: App.Data.BreedData, index: number) => (
                <div key={index} className="col-sm-6 col-lg-4 col-xl-3">
                  <Link aria-label='search' prefetch cacheFor="1m" href={`/breeds/${breed.slug}`}
                    className="breeds-items d-flex align-items-center gap-6 py-3 px-6 d-block rounded-1">
                    <div className="breeds-items-img  flex-shrink-0 round-40 rounded position-relative overflow-hidden">
                      <img src={breed.image} className="w-100 h-100 object-fit-cover" alt={breed.name} />
                    </div>
                    <div className="breeds-items-title">
                      <h6 className="mb-0 font-work-sans fw-semibold fs-3">{breed.name}</h6>
                    </div>
                  </Link>
                </div>
    ))
}
                </div>
                </div>
                </div>

        </div>
        </div>
        </section>


</Layout>
  )
}

export default Index
