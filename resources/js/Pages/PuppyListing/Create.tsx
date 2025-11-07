import React from 'react'
import Breadcrumb from '@/Components/Breadcrumb'
import PuppyListingForm from '@/Components/Forms/PuppyListingForm'
import Heading from '@/Components/Heading'
import MetaTags from '@/Components/MetaTags'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head } from '@inertiajs/react'

const Create = ({ url }: { url: string }) => {
    return (
        <DashboardLayout activeTab="My Puppies" metaTitle="Create Puppy Listing">
            <MetaTags title="Create Puppy Listing" url={url} />
            <Head>
                <meta name="robots" content="noindex" />
            </Head>
            <div className="space-y-4">
                <Breadcrumb links={[
                    { label: 'My Puppies', link: '/profile/edit?tab=My Puppies' },
                    { label: 'Create Listing', link: '#' },
                ]} />
                <Heading title="List your puppy" description="Create a new listing for your puppy." />
                <PuppyListingForm puppy_edit={null} />
            </div>
        </DashboardLayout>
    )
}

export default Create

