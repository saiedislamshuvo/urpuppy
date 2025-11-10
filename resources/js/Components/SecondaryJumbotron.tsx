import React from 'react'
import { usePage, Link } from '@inertiajs/react'

const SecondaryJumbotron = () => {
  const { settings } = usePage().props as any;
  const sectionTitle = settings?.cta_section_title || "Why Choose UrPuppy.com?";
  const buttonSubtitle = settings?.cta_button_subtitle || "Our advantages";
  const buttonLink = settings?.cta_button_link || "/about-us";
  const features = settings?.cta_features || [
    {
      icon: 'fa-reach-thousands-buyers',
      title: 'Reach Thousands of Buyers',
      description: 'Our platform connects you with eager pet lovers nationwide.'
    },
    {
      icon: 'fa-easy-to-use-tool',
      title: 'Easy-to-Use Tools',
      description: 'Upload photos, videos, and descriptions seamlessly.'
    },
    {
      icon: 'fa-boosted-visibility',
      title: 'Boosted Visibility',
      description: 'Featured listings help you stand out from the competition.'
    }
  ];

  // Default feature icons mapping
  const iconMap: { [key: string]: string } = {
    'fa-reach-thousands-buyers': '/images/svgs/icon-reach-thousands-buyers.svg',
    'fa-easy-to-use-tool': '/images/svgs/icon-easy-to-use-tool.svg',
    'fa-boosted-visibility': '/images/svgs/icon-boosted-visibility.svg',
  };

  return (
    <div className="row">
      <div className="col-lg-4">
        <h2 className="fs-10 mb-5 mb-lg-0">{sectionTitle}</h2>
        {buttonSubtitle && (
          <Link href={buttonLink} className="btn btn-primary mt-4">
            {buttonSubtitle}
          </Link>
        )}
      </div>
      <div className="col-lg-8">
        <div className="row">
          {features.map((feature: any, index: number) => {
            // Check if icon is a Font Awesome class or an image path
            const iconSrc = feature.icon?.startsWith('/') || feature.icon?.startsWith('http')
              ? feature.icon
              : iconMap[feature.icon] || `/images/svgs/icon-${feature.icon?.replace('fa-', '') || 'default'}.svg`;
            const isFontAwesome = feature.icon?.startsWith('fa-') && !iconMap[feature.icon];

            return (
              <div key={index} className="col-md-4 mb-7 mb-md-0">
                {isFontAwesome ? (
                  <i className={`${feature.icon} fs-1 text-primary`}></i>
                ) : (
                  <img src={iconSrc} alt={feature.title || 'feature'} />
                )}
                <h3 className="fs-5 font-work-sans mt-3">{feature.title || 'Feature'}</h3>
                <p className="mb-0">{feature.description || ''}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default SecondaryJumbotron
