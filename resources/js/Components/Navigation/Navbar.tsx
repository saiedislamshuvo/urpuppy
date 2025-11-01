import React, { useState, useEffect } from "react";
import { cn } from "@/utils/cn";
import HorizontalNavLinks from "./HorizontalNavLinks";
import Button from "@/Components/ui/Button";
import { GiHamburgerMenu } from "react-icons/gi";
import ApplicationLogo from "../ApplicationLogo";

type NavigationProps = React.HTMLAttributes<HTMLElement> & {
    variant: "primary" | "secondary";
};

const Navbar = ({ className, variant, ...props }: NavigationProps) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10); // Detect scroll to trigger sticky
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                scrolled
                    ? "sticky top-0 bg-white shadow-lg"
                    : "absolute top-0 bg-transparent",
                "w-full z-50 transition-all duration-150 ease-in h-16 px-3", // Ensure consistent height
                className
            )}
        >
            <div className="flex items-center font-medium justify-between h-full">
                <div className="flex items-center space-x-4">
                    <ApplicationLogo className="h-12 w-auto fill-current text-white" />
                    <div className=""></div>
                    <HorizontalNavLinks />
                </div>
                <div className="flex items-center space-x-4">
                    <Button href="">Login</Button>
                    <Button href="" variant="secondary">
                        Register
                    </Button>
                    <button
                        onClick={() => alert("Hamburger Menu Clicked")}
                        className="md:hidden p-2"
                    >
                        <GiHamburgerMenu />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

