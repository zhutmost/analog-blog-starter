import type { Metadata } from 'next'

import siteConfig from '@/lib/site-config'

export interface PageMetadataProps {
  title: string
  description?: string
  locale?: string
}

export default function generatePageMetadata({
  title,
  description,
  locale,
}: PageMetadataProps): Metadata {
  return {
    title,
    description: description ?? siteConfig.description,
    openGraph: {
      title: `${title} | ${siteConfig.seo.openGraph?.title}`,
      description: description ?? siteConfig.seo.openGraph?.description,
      url: './',
      siteName: siteConfig.seo.openGraph?.siteName,
      images: siteConfig.seo.openGraph?.images,
      locale: locale ?? siteConfig.seo.openGraph?.locale,
      type: 'website',
    },
    twitter: {
      title: `${title} | ${siteConfig.seo.twitter?.title}`,
      description: description ?? siteConfig.seo.twitter?.description,
      card: 'summary_large_image',
      images: siteConfig.seo.twitter?.images,
    },
  }
}
