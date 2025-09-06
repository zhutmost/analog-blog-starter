import type { MetadataRoute } from 'next'

import { allAuthorsNonDefault, allPages, allPosts, authorDefault } from '@/lib/coco'
import siteConfig from '@/lib/site-config'

type Sitemap = MetadataRoute.Sitemap
type SitemapSingleFile = MetadataRoute.Sitemap[number]

export const dynamic = 'force-static'

export default function sitemap(): Sitemap {
  const homeRoute: SitemapSingleFile = {
    url: new URL(siteConfig.siteUrl).toString(),
    lastModified: new Date().toISOString(),
    priority: 1,
    changeFrequency: 'monthly',
  }

  const postRoutes: Sitemap = allPosts
    .filter((post) => !post.draft)
    .map((post) => ({
      url: new URL(`/post/${post.slug}`, siteConfig.siteUrl).toString(),
      lastModified: post.dateUpdate.toISOString(),
      priority: 1,
      changeFrequency: 'monthly',
    }))

  const aboutRoute: SitemapSingleFile = {
    url: new URL('/about', siteConfig.siteUrl).toString(),
    lastModified: authorDefault.dateUpdate.toISOString(),
    priority: 0.7,
    changeFrequency: 'monthly',
  }

  const authorsRoutes: Sitemap = allAuthorsNonDefault.map((author) => ({
    url: new URL(`/about/${author.slug}`, siteConfig.siteUrl).toString(),
    lastModified: author.dateUpdate.toISOString(),
    priority: 0.5,
    changeFrequency: 'monthly',
  }))

  const presetPagesRoutes: Sitemap = [
    'tags',
    ...(siteConfig.pages.team && allAuthorsNonDefault.length !== 0 ? ['team'] : []),
  ].map((route) => ({
    url: new URL(route, siteConfig.siteUrl).toString(),
    lastModified: new Date().toISOString(),
    priority: 0.5,
    changeFrequency: 'monthly',
  }))

  const userPagesRoutes: Sitemap = allPages.map((page) => ({
    url: new URL(page.slug, siteConfig.siteUrl).toString(),
    lastModified: page.dateUpdate.toISOString(),
    priority: 0.7,
    changeFrequency: 'monthly',
  }))

  return [
    homeRoute,
    aboutRoute,
    ...postRoutes,
    ...authorsRoutes,
    ...presetPagesRoutes,
    ...userPagesRoutes,
  ]
}
