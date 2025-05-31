import { PageProps } from '@/types';
import { useEffect, useState } from 'react';
import Banner from './Sections/Banner';
import PriceFilter from '@/Components/Filters/PriceFilter';
import FeaturedBreeds from '@/Components/Puppy/FeaturedBreeds';
import PuppySpotlight from '@/Components/Puppy/PuppySpotlight';
import TopPicks from '@/Components/Puppy/TopPicks';
import TrustedBreeders from '@/Components/Puppy/TrustedBreeders';
import NewArrivals from '@/Components/Puppy/NewArrivals';
import FooterVideos from '@/Components/Puppy/FooterVideos';
import Layout from '@/Layouts/Layout';
import MetaTags from '@/Components/MetaTags';
import SecondaryButton from '@/Components/SecondaryButton';
import SecondaryJumbotron from '@/Components/SecondaryJumbotron';
import BlogShowcase from '@/Components/Puppy/BlogShowcase';


export default function Index({
    users,
    auth,
    laravelVersion,
    phpVersion,
    puppy_spotlights,
    top_pick_puppy,
    trusted_breeders,
    new_arrivals,
    featured_breeds,
    post_data,
    header_label,
    videos,
    subheader_label,
}: PageProps<{ laravelVersion: string; phpVersion: string; users: string, puppy_spotlights: App.Data.PuppyCardData[], top_pick_puppy: App.Data.PuppyData, trusted_breeders: App.Data.BreederFullData[] , new_arrivals: App.Data.PuppyCardData[], featured_breeds: App.Data.BreedData[], header_label: string, subheader_label: string , videos: App.Data.VideoData[], post_data: App.Data.PostData[] }>) {

    const [userState, setUserState] = useState('');

    useEffect(() => {
        setUserState(users);
    }, [users])


    return (
        <>
            <Layout>
            <Banner header={header_label} subheader={subheader_label}/>
            <MetaTags title="Home" />
            <div className="page-wrapper position-relative overflow-hidden">
            <FeaturedBreeds featured_breeds={featured_breeds}/>
            <PuppySpotlight puppy_spotlights={puppy_spotlights}/>
            {top_pick_puppy &&
                <TopPicks puppy={top_pick_puppy}/>
            }
            <TrustedBreeders breeders={trusted_breeders}/>

            <NewArrivals new_arrivals={new_arrivals}/>
            { videos.length > 0 &&
                <FooterVideos videos={videos} />
            }

            <BlogShowcase post_data={post_data} />

            <section className="bg-extralight  py-md-5 py-4">
              <div className="container">
                            <SecondaryJumbotron />
              </div>
            </section>

            </div>
            </Layout>
        </>
    );
}
