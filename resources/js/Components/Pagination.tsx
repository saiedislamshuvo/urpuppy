import { Link } from "@inertiajs/react";
import React from "react";
import PaginationButton from "./PaginationButton";
import { runOnClient } from "@/utils/runOnClient";

interface PaginationProps {
    target?: string,
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

const Pagination: React.FC<PaginationProps> = ({ links, target = "scroll-target" }) => {

    const mergeQueryParams = (url: any) => {
        if (typeof window === "undefined") return url;

        const currentParams = new URLSearchParams(window.location.search);
        const urlObj = new URL(url, window.location.origin);

        currentParams.forEach((value, key) => {
            if (!urlObj.searchParams.has(key)) {
                urlObj.searchParams.append(key, value);
            }
        });

        return urlObj.toString();
    };

    return (
        <nav className="table-responsive pb-3 pb-lg-0">
            <ul className="pagination mb-0 align-items-center justify-content-center ">
                {links && links.length > 3 &&
                    links.map((link, index) => {
                        if (!link.url) return null;

                        const isFirst = index === 0;
                        const isLast = index === links.length - 1;

                        return (
                            <li
                                key={index}
                                className={`page-item me-lg-6 `}
                            >
                                <Link
                                    href={mergeQueryParams(link.url)}
                                    preserveScroll={true}
                                    target={target}
                                    // onClick={(e) => {
                                    //     e.preventDefault(); // Prevent default navigation
                                    //     handlePaginationClick(e, mergeQueryParams(link.url));
                                    // }}
                                >
                                    <PaginationButton
                                        className={`page-link ${link.active ? 'active' : ''} ${isFirst ? 'border-0 me-4 text-dark' : ''} ${isLast ? 'border-0 text-dark d-hidedn': ''} `}
                                        page={link.label}
                                        isActive={link.active}
                                    />
                                </Link>
                            </li>
                        );
                    })}
            </ul>
        </nav>
    );
};

export default Pagination;
