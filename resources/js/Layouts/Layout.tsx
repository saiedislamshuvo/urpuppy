import { AOSInit } from '@/Components/AosInit';
import Footer from '@/Components/Navigation/Footer';
import Navbarv2 from '@/Components/Navigation/Navbarv2';
import Banner from '@/Pages/Home/Sections/Banner';
import { usePage } from '@inertiajs/react';
import React, { useEffect } from 'react'
import { PropsWithChildren, ReactNode, useState } from 'react';
import toast from 'react-hot-toast';

export default function Layout({
    header,
    children,
    navType ,
}: PropsWithChildren<{ header?: ReactNode, headerLabel?: string, subheaderLabel?: string, navType?: string }>) {
    const { flash }: any = usePage().props;


    useEffect(() => {
        if (flash?.message?.success) {

            toast.success(flash.message.success,
                {
                    duration: 3000
                });
        }
    }, [flash]);

    useEffect(() => {
        if (flash?.message?.error) {
            toast.error(flash.message.error, {
                duration: 3000
            });
        }
    }, [flash]);

    return (
    <div >
            <AOSInit />
            <Navbarv2 type={navType}/>
            <main scroll-region="true" >
            {children}
            </main>
            <Footer/>
</div>
)
}

