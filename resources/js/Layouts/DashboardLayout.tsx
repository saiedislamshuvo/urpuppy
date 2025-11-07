import React, { PropsWithChildren, ReactNode } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ListPill from '@/Components/ListPill';
import Layout from '@/Layouts/Layout';
import MetaTags from '@/Components/MetaTags';

interface DashboardLayoutProps extends PropsWithChildren {
    activeTab?: string;
    title?: string;
    metaTitle?: string;
    navType?: string;
}

const NavigationSettings = [
    {
        name: 'Dashboard',
        route: '/dashboard',
        logo: '../images/svgs/icon-home.svg',
        showForRoles: ['seller', 'breeder']
    },
    {
        name: 'Account Settings',
        route: '/profile',
        routeParam: 'tab=Account Settings',
        logo: '../images/svgs/icon-user-dark.svg',
        showForRoles: ['all']
    },
    {
        name: 'My Subscription',
        route: '/profile',
        routeParam: 'tab=My Subscription',
        logo: '../images/svgs/icon-card.svg',
        showForRoles: ['seller', 'breeder']
    },
    {
        name: 'Saved Search',
        route: '/profile',
        routeParam: 'tab=Saved Search',
        logo: '../images/svgs/icon-bookmarks.svg',
        showForRoles: ['buyer']
    },
    {
        name: 'Favorites',
        route: '/favorites',
        logo: '../images/svgs/icon-heart.svg',
        showForRoles: ['all']
    },
    {
        name: 'My Puppies',
        route: '/profile',
        routeParam: 'tab=My Puppies',
        logo: '../images/svgs/icon-paws-dark.svg',
        showForRoles: ['seller', 'breeder']
    },
    {
        name: 'Chat',
        route: '/chat',
        logo: '../images/svgs/icon-mail-dark.svg',
        showForRoles: ['all']
    },
];

export default function DashboardLayout({
    children,
    activeTab,
    title,
    metaTitle,
    navType = 'secondary',
}: DashboardLayoutProps) {
    const { auth } = usePage().props;
    const user = auth?.user as any;

    const getFilteredNavigation = () => {
        return NavigationSettings.filter((item) => {
            if (item.showForRoles.includes('all')) {
                return true;
            }

            // Check if user has any of the required roles
            if (item.showForRoles.includes('buyer') && !user?.is_seller && !user?.is_breeder) {
                return true;
            }

            if (item.showForRoles.includes('seller') && user?.is_seller) {
                return true;
            }

            if (item.showForRoles.includes('breeder') && user?.is_breeder) {
                return true;
            }

            return false;
        });
    };

    const getRoute = (item: typeof NavigationSettings[0]) => {
        if (item.routeParam) {
            return `${item.route}?${item.routeParam}`;
        }
        return item.route;
    };

    return (
        <Layout navType={navType}>
            {metaTitle && <MetaTags title={metaTitle} />}
            <div className="page-wrapper position-relative overflow-hidden">
                <section className="account-settings py-7 py-md-5 py-xl-9">
                    <div className="container">
                        {title && (
                            <div className="row">
                                <div className="col-12">
                                    <h2 className="mb-4 mb-md-5">{title}</h2>
                                </div>
                            </div>
                        )}

                        <div className="row">
                            <div className="col-lg-3">
                                <ul
                                    className="nav nav-pills justify-content-center flex-lg-column gap-2 mb-4 mb-lg-0"
                                    id="pills-tab"
                                    role="tablist"
                                >
                                    {getFilteredNavigation().map((item, index) => {
                                        const route = getRoute(item);
                                        return (
                                            <ListPill
                                                key={index}
                                                tab={activeTab || ''}
                                                name={item.name}
                                                logo={item.logo}
                                                href={route}
                                                isRoute={true}
                                            />
                                        );
                                    })}
                                </ul>

                                {/* List Ur Puppy Button - Show only for sellers and breeders */}
                                {(user?.is_seller || user?.is_breeder) && (
                                    <div className="mt-3">
                                        <Link
                                            href="/puppies-listing/create"
                                            method="get"
                                            as="button"
                                            className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
                                        >
                                            <span>+ List Ur Puppy</span>
                                        </Link>
                                    </div>
                                )}
                            </div>
                            <div className="col-lg-9" style={{ minHeight: '100vh' }}>
                                {children}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}

