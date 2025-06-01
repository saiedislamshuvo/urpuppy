import React, { useState } from 'react';
import Button from '@/Components/ui/Button';
import Layout from '@/Layouts/Layout';
import { Link, router, usePage } from '@inertiajs/react';
import PostCommentCard from './Partials/PostCommentCard';
import PostCommentForm from './Partials/PostCommentForm';
import { PaginatedCollection } from '@/types/global';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import CopyToClipboard from '@/Components/CopyToClipboard';
import MetaTags from '@/Components/MetaTags';
import Pagination from '@/Components/Pagination';
import JsonLdArticle from '@/Components/JsonLdArticle';

interface ShowProps {
    post: App.Data.PostData;
    comments: PaginatedCollection<App.Data.CommentData>;
    is_liked: boolean;
    is_unliked: boolean;
    url: string
}

const Show: React.FC<ShowProps> = ({ post, comments, is_liked, is_unliked, url }) => {
    const { props } = usePage();
    const user = props.auth.user;
    const currentUrl = `https://urpuppy.com/posts/${post.slug}`;

    const [localLikeCount, setLocalLikeCount] = useState(post.like_count);
    const [localUnlikeCount, setLocalUnlikeCount] = useState(post.unlike_count);
    const [localIsLiked, setLocalIsLiked] = useState(is_liked);
    const [localIsUnliked, setLocalIsUnliked] = useState(is_unliked);

    const handleReact = (type: 'Like' | 'Unlike') => {
        const previousLikeCount = localLikeCount;
        const previousUnlikeCount = localUnlikeCount;
        const previousIsLiked = localIsLiked;
        const previousIsUnliked = localIsUnliked;

        if (type === 'Like') {
            setLocalLikeCount(previousIsLiked ? previousLikeCount - 1 : previousLikeCount + 1);
            setLocalIsLiked(!previousIsLiked);
            if (previousIsUnliked) {
                setLocalUnlikeCount(previousUnlikeCount - 1);
                setLocalIsUnliked(false);
            }
        } else {
            setLocalUnlikeCount(previousIsUnliked ? previousUnlikeCount - 1 : previousUnlikeCount + 1);
            setLocalIsUnliked(!previousIsUnliked);
            if (previousIsLiked) {
                setLocalLikeCount(previousLikeCount - 1);
                setLocalIsLiked(false);
            }
        }

        router.post(`/posts/${post.id}/react/${type}`, {}, {
            onSuccess: () => {
                // No need to do anything here since we already updated the state optimistically
            },
            onError: () => {
                // Revert the state if the request fails
                setLocalLikeCount(previousLikeCount);
                setLocalUnlikeCount(previousUnlikeCount);
                setLocalIsLiked(previousIsLiked);
                setLocalIsUnliked(previousIsUnliked);
            }
        });
    };

    return (
        <Layout navType="secondary">
            <MetaTags url={currentUrl} title={post.title} description={post.excerpt ?? post.title} image={post.banner_url} >
            </MetaTags>
             <JsonLdArticle post={post} />
            <article className="puppy-spotlight py-7 py-md-5 py-xl-9" id="scroll-target">
                <div className="container">
                    <div className="mb-8">
                        <span style={{ backgroundColor: 'rgba(0, 122, 255, 0.1)', color: 'rgba(0, 122, 255, 1)', fontWeight: '500' }} className="btn py-1 mb-3">
                            {post.category.name}
                        </span>
                        <h1 className="mb-2">{post.title}</h1>
                        <p className="fs-4">{post.excerpt}</p>
                    </div>

                    <div className="d-flex flex-column flex-sm-column flex-md-row align-items-center justify-content-between">
                        <div className="d-flex gap-3 mb-2">
                            {
                                post.author?.photo_url ?
                            <img alt={post.author.name} src={post.author?.photo_url} className="rounded-circle object-fit-cover" width="50" height="50" /> :
                                    <svg  xmlns="http://www.w3.org/2000/svg"  width="34"  height="34"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="rounded-circle icon icon-tabler icons-tabler-outline icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>

                            }
                            <div>
                                <h6 style={{ marginBottom: 'unset' }} className="btn-link fs-5 font-work-sans">
                                    {post.author.name}
                                </h6>
                                <span>Author</span>
                            </div>
                        </div>

                        <div className="d-flex justify-content-center align-items-center mb-2 gap-md-4 gap-3" style={{ height: "24px" }}>
                            <div className="d-flex align-items-center gap-2">
                                <img src="../images/svgs/icon-time.svg" alt="time" width="18" height="18" />
                                <p style={{ marginBottom: '0.5px' }} className="fs-3">{post.published_at_formatted}</p>
                            </div>

                            <div style={{ width: "1px", background: "rgba(8, 49, 78, 0.4)", height: "12px" }}></div>

                            <div className="d-flex align-items-center gap-2">
                                <a
                                    className="bg-white border-0"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleReact('Like');
                                    }}
                                >
                                    <img
                                        style={{ filter: localIsLiked ? "brightness(0) saturate(100%) invert(43%) sepia(91%) saturate(2636%) hue-rotate(195deg) brightness(96%) contrast(104%)" : "" }}
                                        src="../images/svgs/icon-like.svg"
                                        alt="like"
                                        width="18"
                                        height="18"
                                    />
                                </a>
                                <p style={{ marginBottom: '0.5px' }} className="fs-3">{localLikeCount}</p>
                            </div>

                            <div style={{ width: "1px", background: "rgba(8, 49, 78, 0.4)", height: "12px" }}></div>

                            <div className="d-flex align-items-center gap-2">
                                <a
                                    className="bg-white border-0"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleReact('Unlike');
                                    }}
                                >
                                    <img src="../images/svgs/icon-dislike.svg" alt="dislike" width="18" height="18" />
                                </a>
                                <p style={{ marginBottom: '0.5px' }} className="fs-3">{localUnlikeCount}</p>
                            </div>

                            <div style={{ width: "1px", background: "rgba(8, 49, 78, 0.4)", height: "12px" }}></div>

                            <div className="d-flex align-items-center gap-2">
                                <img src="../images/svgs/icon-eye.svg" alt="eye" width="18" height="18" />
                                <p className="mb-0 fs-3">{post.view_count} Views</p>
                            </div>
                        </div>
                    </div>

                    <div
                        className="rounded-2 mb-4 mt-4"
                        style={{
                            backgroundImage: `url('${post.banner_url}')`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            height: "500px"
                        }}
                    ></div>

                    <div style={{ maxWidth: '904px', margin: '0 auto' }}>
                        <div dangerouslySetInnerHTML={{ __html: post.content }}></div>

                        <div className="mb-8 mt-8" style={{ background: 'rgba(8, 49, 78, 0.1)', width: "100%", height: "1px" }}></div>

                        <div className="d-flex mb-8 flex-column flex-md-row text-center" style={{ justifyContent: "space-between" }}>
                            <div>
                                <span className="fs-3 mt-4 mb-4" style={{ color: "rgba(8, 49, 78, 0.8)" }}>
                                    Share this blog:
                                </span>
                            </div>

                            <div className="d-flex gap-2 justify-content-center">
                                <CopyToClipboard link={currentUrl} />
                                <FacebookShareButton url={currentUrl}>
                                    <a rel='nofollow' href="" data-bs-toggle="tooltip" data-bs-title="Instagram" className="bg-white border bg-opacity-10 d-flex align-items-center justify-content-center round-40 rounded-circle">
                                        <img loading="lazy" src="/images/svgs/icon-facebook-dark.svg" alt="facebook" />
                                    </a>
                                </FacebookShareButton>
                                <TwitterShareButton url={currentUrl}>
                                    <a rel='nofollow' href="#" data-bs-toggle="tooltip" data-bs-title="Instagram" className="bg-white border bg-opacity-10 d-flex align-items-center justify-content-center round-40 rounded-circle">
                                        <img loading="lazy" src="/images/svgs/icon-twitter-dark.svg" alt="twitter" />
                                    </a>
                                </TwitterShareButton>
                            </div>
                        </div>

                        <div className="card border mt-4">
                            <div className="card-body" id="comments">
                                <h6 className="mb-4">Comments</h6>

                                {user ? (
                                    <PostCommentForm post_id={post.id} />
                                ) : (
                                    <Button className="mb-4" href="/register">
                                        Signup to Comment
                                    </Button>
                                )}

                                {comments.data.length > 0 && (
                                    <>
                                        {comments.data.map((comment, index) => (
                                            <PostCommentCard key={index} comment={comment} />
                                        ))}
                                    </>
                                )}

                                <Pagination links={comments.links} target="comments" />
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </Layout>
    );
};

export default Show;
