import React from "react";

interface PaginationButtonProps {
    page: number | string;
    isActive?: boolean;
    className?: string;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({ page, isActive = false, className = "page-link " }) => {
    return (

                <span className={`${className} ${isActive ? 'active' : ''}`} dangerouslySetInnerHTML={{ __html: page }} />

    );
};

export default PaginationButton;

