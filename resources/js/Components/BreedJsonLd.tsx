import React, { useEffect, useState } from 'react'
import { Head } from '@inertiajs/react'



const BreedJsonLd = ({ breed, url }: { breed: App.Data.BreedFullData, url: string }) => {
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
    name: breed.seo_title,
    description: breed.seo_description ?? '',
    image: breed.image,
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

export default BreedJsonLd

