import { Head } from '@inertiajs/react';
import React from 'react';

const JsonLdArticle: React.FC<{ post: App.Data.PostData }> = ({ post }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": post.title,
    "image": [post.banner_url],
    "datePublished": post.published_at,
    "dateModified": post.updated_at,
    "author": {
      "@type": "Person",
      "name": post.author.name
    },
    "publisher": {
      "@type": "Organization",
      "name": "UrPuppy",
      "logo": {
        "@type": "ImageObject",
        "url": "https://urpuppy.com/logo.svg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://urpuppy.com/posts/${post.slug}`
    },
    "description": post.excerpt
  };

  return (
        <Head>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
</Head>
  );
};

export default JsonLdArticle;

