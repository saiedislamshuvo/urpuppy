import React from 'react'
import { Head } from '@inertiajs/react'

type BreedJsonLdProps = {
  breed: {
    name: string
    slug: string
    image: string
    history_description?: string | null
  }
}

const BreedJsonLd: React.FC<BreedJsonLdProps> = ({ breed }) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Thing',
    name: breed.name,
    description: breed.history_description ?? '',
    image: breed.image,
    url: `${typeof window !== 'undefined' ? window.location.origin : ''}/breeds/${breed.slug}`,
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

export default BreedJsonLd

