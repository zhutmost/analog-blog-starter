import { MetadataRoute } from 'next'

import { allPages } from '@/content-collections'
import { allAuthorsNonDefault, authorDefault } from '@/lib/author-sort'
import allPostsSorted from '@/lib/post-sort'
import siteConfig from '@/lib/site-config'

type Sitemap = MetadataRoute.Sitemap
type SitemapSingleFile = MetadataRoute.Sitemap[number]

export default function sitemap(): Sitemap {
  const homeRoute: SitemapSingleFile = {
    url: new URL(siteConfig.siteUrl).toString(),
    lastModified: new Date().toISOString(),
    priority: 1,
    changeFrequency: 'monthly',
  }

  const postRoutes: Sitemap = allPostsSorted
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

  const pagesRoutes: Sitemap = [
    'news',
    'tags',
    ...(siteConfig.teamPage ? ['team'] : []),
    ...allPages.map((p) => p.slug),
  ].map((route) => ({
    url: new URL(route, siteConfig.siteUrl).toString(),
    lastModified: new Date().toISOString(),
    priority: 0.5,
    changeFrequency: 'monthly',
  }))

  return [homeRoute, aboutRoute, ...postRoutes, ...authorsRoutes, ...pagesRoutes]
}
