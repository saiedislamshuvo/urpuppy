import Navbarv2 from '@/Components/Navigation/Navbarv2'
import React from 'react'
import Banner from '../Home/Sections/Banner'
import { PaginatedCollection } from '@/types/global'
import PuppyCard from '@/Components/Puppy/Card'
import Pagination from '@/Components/Pagination'
import Layout from '@/Layouts/Layout'
import MetaTags from '@/Components/MetaTags'
import { Link } from '@inertiajs/react'
import SavedSearchModal from '@/Components/Modals/SavedSearchModal'

const Index = ({puppies, states, breeds, has_search, seo_title, seo_description, url} : {
    puppies: PaginatedCollection<App.Data.PuppyData>
    states: App.Data.StateData[],
    breeds: App.Data.BreedData[],
    has_search: boolean,
    seo_title: string,
    seo_description: string,
    url: string
}) => {
  return (
    <Layout>
        <MetaTags title={seo_title} description={seo_description} url={url}  />

        {!has_search ?
        <Banner size="md" header="Puppies for Sale" subheader="Countless Puppies Available For Sale Across the Country!"/> :
        <Banner size="md" header={`${puppies.total} Results`} subheader="Below the search bar, you can filter your preferred breeds."/>  }

        <section className="puppy-spotlight py-7 py-md-5 py-xl-9" id="scroll-target">
          <div className="container" >
            <SavedSearchModal has_search={has_search} />
            <div className="row mb-4 mb-lg-8">
                {
                    puppies?.data && puppies?.data.map((puppy: App.Data.PuppyData) => (
                        <PuppyCard key={puppy.id} puppy={puppy}/>
                    ))
                }

                </div>
                </div>

                <Pagination links={puppies.links}/>
                </section>
    </Layout>
  )
}

export default Index
