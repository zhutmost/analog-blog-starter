import { Metadata } from 'next'

import siteConfig from '@/lib/site-config'

interface PageMetadataProps {
  title: string
  description?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export function generatePageMetadata({ title, description, ...rest }: PageMetadataProps): Metadata {
  return {
    title,
    description: description ?? siteConfig.description,
    openGraph: {
      title: `${title} | ${siteConfig.seo.openGraph!.title}`,
      description: description ?? siteConfig.seo.openGraph!.description,
      url: './',
      siteName: siteConfig.seo.openGraph!.siteName,
      images: siteConfig.seo.openGraph!.images,
      locale: siteConfig.seo.openGraph!.locale,
      type: 'website',
    },
    twitter: {
      title: `${title} | ${siteConfig.seo.twitter!.title}`,
      description: description ?? siteConfig.seo.twitter!.description,
      card: 'summary_large_image',
      images: siteConfig.seo.twitter!.images,
    },
    ...rest,
  }
}
