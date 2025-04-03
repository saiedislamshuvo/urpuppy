import React from 'react'
import { FacebookShareButton, TwitterShareButton } from 'react-share'
import Tooltip from './Tooltip'

const ShareButton = ({
    slug,
    route = 'puppies',
    ...rest // Ensure no unknown props get passed down
}: {
    slug: string
    route?: string
}) => {
    let currentUrl = `https://urpuppy.com/${route}/${slug}`;

    return (
        <Tooltip
            content={
                <div className="dropdown">
                    <button
                        type="button"
                        className="btn btn-secondary p-0 shadow-none bg-white border d-flex align-items-center justify-content-center round-40 rounded-circle flex-shrink-0 show"
                        data-bs-toggle="dropdown"
                        aria-expanded="true"
                    >
                        <img src="../images/svgs/icon-share.svg" alt="" />
                    </button>
                    <ul
                        className="dropdown-menu dropdown-menu-end bg-primary social-icon px-6"
                        style={{
                            minWidth: "auto",
                            position: "absolute",
                            inset: "0px 0px auto auto",
                            margin: "0px",
                            transform: "translate(0px, 42px)"
                        }}
                    >
                        <div className="d-flex align-items-center justify-content-center gap-2">
                            <li>
                                <TwitterShareButton
                                    url={currentUrl}
                                    className="dropdown-item p-0 bg-white bg-opacity-25 d-flex align-items-center justify-content-center round-35 rounded-circle"
                                    {...rest} // Pass only safe props
                                >
                                    <img
                                        src="../images/svgs/icon-twitter.svg"
                                        alt=""
                                        width="16"
                                        height="16"
                                    />
                                </TwitterShareButton>
                            </li>

                            <li>
                                <FacebookShareButton
                                    url={currentUrl}
                                    className="dropdown-item p-0 bg-white bg-opacity-25 d-flex align-items-center justify-content-center round-35 rounded-circle"
                                    {...rest} // Pass only safe props
                                >
                                    <img
                                        src="../images/svgs/icon-facebook.svg"
                                        alt=""
                                        width="16"
                                        height="16"
                                    />
                                </FacebookShareButton>
                            </li>
                        </div>
                    </ul>
                </div>
            }
            id={`share-${slug}`}
            tooltipMessage="Share"
        />
    );
};

export default ShareButton;
