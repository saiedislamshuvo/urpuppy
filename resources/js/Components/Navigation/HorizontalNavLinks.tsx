import Text from "@/Components/ui/Text";
import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

const links = [
    {
        name: "Home",
        submenu: true,
        sublinks: [
            {
                sublinks: [
                    { name: "Home", link: "home" },
                    { name: "Breed", link: "breed" },
                    { name: "Address", link: "address" },
                ],
            },
        ],
    },
    {
        name: "Breeds",
    },
    {
        name: "Shop",
    },
];

const HorizontalNavLinks = () => {
    const [heading, setHeading] = useState("");

    return (
        <>
            {links.map((link) => (
                <div>
                    <div className="font-redhat  text-left md:cursor-pointer group">
                        <Text
                            className="py-7 text-white font-semibold flex justify-between items-center md:pr-0  "
                            onClick={() =>
                                heading !== link.name
                                    ? setHeading(link.name)
                                    : setHeading("")
                            }
                        >{link.name}
                            <span className="inline md:hidden md:ml-2">
                                {link.submenu &&
                                    link.sublinks &&
                                    (heading === link.name && link.sublinks ? (
                                        <FaChevronUp className="" />
                                    ) : (
                                        <FaChevronDown />
                                    ))}
                            </span>
                            <span className="inline md:block hidden  md:ml-2 group-hover:rotate-180 ">
                                {link.submenu &&
                                    link.sublinks &&
                                        <FaChevronDown size={11}/>
                                }
                            </span>
</Text>
                        <div>
                            {link.submenu && (
                                <>
                                    <div>
                                        <div className="absolute top-24 hidden group-hover:md:block hover:md:block">
                                            <div className="py-2">
                                                <div className="w-4 h-4 left-3 absolute mt-1 bg-white rotate-45"></div>
                                            </div>
                                            <div className="bg-white p-4 ">
                                                {link.sublinks.map(
                                                    (sublink) => (
                                                        <div>
                                                            {sublink.sublinks.map(
                                                                (sublink) => (
                                                                    <li className="text-sm text-white my-2.5">
                                                                        {
                                                                            sublink.name
                                                                        }
                                                                    </li>
                                                                ),
                                                            )}
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className={`

${heading === link.name ? "md:hidden" : "hidden"}

`}
                                    >
                                        {link.sublinks.map((sublink) => (
                                            <div>
                                                <div>
                                                    <div>
                                                        {sublink.sublinks.map(
                                                            (sublink) => (
                                                                <li>
                                                                    <Link
                                                                        aria-label={sublink.name}
                                                                        href={
                                                                            sublink.link
                                                                        }
                                                                        className="py-4 pl-7 font-semibold md:pr-0 pr-5"
                                                                    >
                                                                        {
                                                                            sublink.name
                                                                        }
                                                                    </Link>
                                                                </li>
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default HorizontalNavLinks;
