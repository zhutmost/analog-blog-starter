import type { MetadataRoute } from 'next'

import siteConfig from '@/lib/site-config'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: new URL('sitemap.xml', siteConfig.siteUrl).href,
    host: siteConfig.siteUrl,
  }
}
