import React from 'react'
import Breadcrumb from '@/Components/Breadcrumb'
import PuppyListingForm from '@/Components/Forms/PuppyListingForm'
import Heading from '@/Components/Heading'
import MetaTags from '@/Components/MetaTags'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head } from '@inertiajs/react'

const Edit = ({ url, puppy_edit }: { url: string; puppy_edit: App.Data.PuppyEditData }) => {
    return (
        <DashboardLayout activeTab="My Puppies" metaTitle="Edit Puppy Listing">
            <MetaTags title="Edit Puppy Listing" url={url} />
            <Head>
                <meta name="robots" content="noindex" />
            </Head>
            <div className="space-y-4">
                <Breadcrumb links={[
                    { label: 'My Puppies', link: '/profile?tab=My Puppies' },
                    { label: 'Edit Listing', link: '#' },
                ]} />
                <Heading title="Edit your puppy listing" description="Update your puppy listing information." />
                <PuppyListingForm puppy_edit={puppy_edit} />
            </div>
        </DashboardLayout>
    )
}

export default Edit

