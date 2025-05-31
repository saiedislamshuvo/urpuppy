import React, { useEffect, useState } from 'react'
import { Head } from '@inertiajs/react'



const PuppyJsonLd = ({ puppy, url }: { puppy: App.Data.PuppyData, url: string }) => {

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Puppy',
    name: puppy.seo_title,
    description: puppy.seo_description ?? '',
    image: puppy.image,
    url: url,
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  )
}

export default PuppyJsonLd

