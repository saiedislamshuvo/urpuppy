import { Link, usePage } from '@inertiajs/react'
import React from 'react'

const Footer = () => {
  const { settings } = usePage().props as any;
  const user = usePage().props.auth.user;

  // Footer logo - use settings or fallback to default
  const footerLogo = settings?.footer_logo || '/logo.svg';

  // Footer columns - use settings or fallback to default static content
  const column1 = {
    title: settings?.footer_coloum1_title || 'Find A Puppy',
    links: settings?.footer_coloum1?.length > 0 ? settings.footer_coloum1 : [
      { title: 'View All Puppies', link: '/puppies' },
      { title: 'View All Breeds', link: '/breeds' }
    ]
  };

  const column2 = {
    title: settings?.footer_coloum2_title || 'Accounts',
    links: settings?.footer_coloum2?.length > 0 ? settings.footer_coloum2 : [
      { title: 'Buyer Register', link: '/register' },
      { title: 'Seller Register', link: '/register-seller' },
      { title: 'Breeder Register', link: '/register-breeder' }
    ]
  };

  const column3 = {
    title: settings?.footer_coloum3_title || 'About urpuppy',
    links: settings?.footer_coloum3?.length > 0 ? settings.footer_coloum3 : [
      { title: 'Blog', link: '/posts' },
      { title: 'About Us', link: '/about-us' },
      { title: 'Contact Us', link: '/contact-us' }
    ]
  };

  const column4 = {
    title: settings?.footer_coloum4_title || 'Other',
    links: settings?.footer_coloum4?.length > 0 ? settings.footer_coloum4 : [
      { title: 'Privacy Policy', link: '/privacy-policy' },
      { title: 'Terms of Use', link: '/terms-of-use' }
    ]
  };

  // Social media links - use settings or fallback to default
  const socialMedia = settings?.footer_social_media?.length > 0 ? settings.footer_social_media : [
    { icon: 'fa-twitter', link: 'https://x.com/UrpuppyDotCom' },
    { icon: 'fa-facebook', link: 'https://www.facebook.com/UrPuppyLLC' },
    { icon: 'fa-instagram', link: 'https://www.instagram.com/urpupppydotcom' }
  ];

  // Social media icon mapping
  const socialIconMap: { [key: string]: string } = {
    'fa-twitter': '/images/svgs/icon-twitter.svg',
    'fa-facebook': '/images/svgs/icon-facebook.svg',
    'fa-instagram': '/images/svgs/icon-instagram.svg',
  };

  const copyrightText = settings?.footer_copyright_text || '©2025 Urpuppy.com, LLC. All Rights Reserved';

  const renderColumn = (column: { title: string; links: Array<{ title: string; link: string }> }, colClass: string) => (
    <div className={colClass}>
      <span className="fw-semibold font-work-sans mb-6 text-white">{column.title}</span>
      <ul className="list-unstyled footer-memu mb-0 mt-2">
        {column.links.map((item: any, index: number) => (
          <li key={index} className={index < column.links.length - 1 ? 'mb-6' : ''}>
            <Link aria-label={item.title} href={item.link} className="fs-3 d-block fw-normal">{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="footer bg-secondary">
      <div className="container">
        <div className="footer-wrapper pt-7 pt-md-9 pt-lg-10 pb-md-5 pb-lg-5">
          <div className="row">
            <div className="col-md-4 col-lg-2 mb-7 pb-1 pb-lg-0 mb-lg-0">
              <div className="footer-logo">
                <Link aria-label="urpuppy" href="/">
                  <img loading="lazy" src={footerLogo} alt="urpuppy-img" />
                </Link>
              </div>
            </div>
            {renderColumn(column1, 'col-6 col-md-4 col-lg-2 mb-7 pb-1 pb-lg-0 mb-lg-0 ps-lg-7')}
            {renderColumn(column2, 'col-6 col-md-4 col-lg-2 mb-7 pb-1 pb-lg-0 mb-lg-0')}
            {renderColumn(column3, 'col-6 col-md-4 col-lg-2 mb-7 pb-1 pb-lg-0 mb-lg-0')}
            {renderColumn(column4, 'col-6 col-md-4 col-lg-2 mb-7 pb-1 pb-lg-0 mb-lg-0')}
            <div className="col-md-4 col-lg-2 mb-7 pb-1 pb-lg-0 mb-lg-0">
              <span className="fw-semibold font-work-sans mb-6 text-white">Socials</span>
              <ul className="list-unstyled d-flex align-items-center gap-6 social-icon mb-0 mt-2">
                {socialMedia.map((social: any, index: number) => {
                  const iconSrc = social.icon?.startsWith('/') || social.icon?.startsWith('http')
                    ? social.icon
                    : socialIconMap[social.icon] || `/images/svgs/icon-${social.icon?.replace('fa-', '') || 'default'}.svg`;
                  const isFontAwesome = social.icon?.startsWith('fa-') && !socialIconMap[social.icon];

                  return (
                    <li key={index}>
                      <a
                        rel='nofollow'
                        href={social.link}
                        target={social.link?.startsWith('http') ? '_blank' : undefined}
                        data-bs-toggle="tooltip"
                        data-bs-title={social.title || social.icon}
                        className="bg-white bg-opacity-10 d-flex align-items-center justify-content-center round-40 rounded-circle"
                      >
                        {isFontAwesome ? (
                          <i className={social.icon}></i>
                        ) : (
                          <img loading="lazy" src={iconSrc} alt={social.title || social.icon} />
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="border-top   border-white border-opacity-10 py-3 d-md-flex align-items-center justify-content-center">
          <p className="d-flex align-items-center gap-2  mb-md-0 text-white fw-normal  opacity-50">
            <span>{copyrightText}</span>
          </p>
        </div>
      </div>
    </footer>

  )
}

export default Footer
