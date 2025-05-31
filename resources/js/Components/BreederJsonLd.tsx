import { Head } from '@inertiajs/react'

const BreederJsonLd = ({ breeder, url }: { breeder: App.Data.BreederFullData, url: string }) => {

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Company',
    name: breeder.seo_title,
    description: breeder.seo_description ?? '',
    image: breeder.company_logo,
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

export default BreederJsonLd

