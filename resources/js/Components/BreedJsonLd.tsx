import React, { useEffect, useState } from 'react'
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
  const [origin, setOrigin] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin)
    }
  }, [])

  if (!origin) return null // Prevent hydration mismatch

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DogBreed',
    name: breed.name,
    description: breed.history_description ?? '',
    image: breed.image,
    url: `${origin}/breeds/${breed.slug}`,
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

