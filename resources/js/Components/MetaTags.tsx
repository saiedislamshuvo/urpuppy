import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';

const MetaTags = ({
  title = "UrPuppy",
  description = "Discover trusted dog breeders, buy or sell puppies online, and connect with pet lovers nationwide. UrPuppy.com is your go-to platform for finding purebred puppies and connecting with licensed breeders.",
  url = "https://urpuppy.com",
  image = "https://urpuppy.com/images/email-template/home.png",
  twitterHandle = "@UrpuppyDotCom",
  siteName = "UrPuppy",
}) => {

  return (
    <Head title={title}>
      <meta name="description" content={description} />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={title} />

      {/* Facebook Open Graph Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content={siteName} />

      {/* Default Image Tag for Google */}
      <link rel="image_src" href={image} />

      <meta name="keywords" content="Buy puppies online, sell puppies online, dog breeders directory, find dog breeders, puppies for sale, sell dogs online, buy dogs online, registered dog breeders, puppy marketplace, dog adoption services, purebred puppies for sale, licensed dog breeders" />
    </Head>
  );
};

export default MetaTags;

