import { AOSInit } from '@/Components/AosInit';
import Footer from '@/Components/Navigation/Footer';
import Navbarv2 from '@/Components/Navigation/Navbarv2';
import Banner from '@/Pages/Home/Sections/Banner';
import { usePage } from '@inertiajs/react';
import React, { useEffect } from 'react'
import { PropsWithChildren, ReactNode, useState } from 'react';

export default function BannerLayout({
    header,
    children,
    headerLabel,
    subheaderLabel,
}: PropsWithChildren<{ header?: ReactNode, headerLabel?: string, subheaderLabel?: string }>) {

      // const { url } = usePage();

    // useEffect(() => {
      //   window.scrollTo(0, 0);
    // }, [url]);
    return (
    < >
            <AOSInit />
            <Navbarv2 />
            <main className="z-10">
            {children}
            </main>
            <Footer/>

</>)
}

