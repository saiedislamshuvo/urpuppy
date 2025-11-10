import Breadcrumb, { BreadcrumbLink } from '@/Components/Breadcrumb'
import BreederRegistrationForm from '@/Components/Forms/BreederRegistrationForm'
import Heading from '@/Components/Heading'
import MetaTags from '@/Components/MetaTags'
import Layout from '@/Layouts/Layout'
import { Head } from '@inertiajs/react'
import React from 'react'

interface RegistrationProps {
    breeds: App.Data.BreedOptionData[];
    gallery?: string[];
    videos?: string[];
    media_limits?: {
        images: number;
        videos: number;
    };
}

const Registration = ({ breeds, gallery = [], videos = [], media_limits }: RegistrationProps) => {
    return (
        <Layout navType="secondary">
            <MetaTags title="Registration" />
            <Head>
                <meta name="robots" content="noindex" />
            </Head>
            <div className="page-wrapper position-relative overflow-hidden">

                <section className="information pt-4 pb-8 pb-lg-9">
                    <div className="container">
                        <Breadcrumb links={
                            [
                                {
                                    label: 'Registration',
                                    link: '/register'
                                }
                            ]
                        } />
                        <div className="space-y-4">

                            <Heading title="Breeder Registration" description="Create your Breeder profile to connect" />

                            <BreederRegistrationForm breeds={breeds} gallery={gallery} videos={videos} media_limits={media_limits} />
                        </div>

                    </div>
                </section>

            </div>



        </Layout>
    )
}

export default Registration
