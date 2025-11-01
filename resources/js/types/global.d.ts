import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { AxiosInstance } from 'axios';
import { route as ziggyRoute } from 'ziggy-js';
import { PageProps as AppPageProps } from './';

 declare module 'momentum-modal-react' {
   export const Modal: any;
 }



declare global {
    interface Window {
        axios: AxiosInstance;
    }


    /* eslint-disable no-var */
    var route: typeof ziggyRoute;
}

declare module '@inertiajs/core' {
    interface PageProps extends InertiaPageProps, AppPageProps {}
}

type PaginatedCollection<T extends object> = {
    data: Array<T>;
    links: any,
    // meta: {
    current_page: number;
    first_page_url: string | null;
    from: number;
    last_page: number;
    last_page_url: string | null;
    next_page_url: string | null;
    path: string;
    per_page: string;
    prev_page_url: string | null;
    to: number;
    total: number;
    // };
};



