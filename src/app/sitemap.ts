import { type MetadataRoute } from "next"

import { siteConfig } from "@/lib/config"
import { authors, peopleConfig, postMetas, userpages } from "@/lib/content"

type SitemapEntry = MetadataRoute.Sitemap[number]

export const dynamic = "force-static"

function createSitemapEntry(pathname: `/${string}`, lastModified?: string): SitemapEntry {
  const url = new URL(pathname, siteConfig.siteUrl).href

  return lastModified ? { url, lastModified } : { url }
}

function isIndexable(content: { draft?: boolean; seo: { noIndex: boolean } }): boolean {
  return !content.draft && !content.seo.noIndex
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    createSitemapEntry("/"),
    createSitemapEntry("/posts"),
    createSitemapEntry("/posts/tags"),

    ...postMetas
      .filter(isIndexable)
      .map((post) => createSitemapEntry(`/post/${post.slug}`, post.dateUpdate)),

    ...userpages.filter(isIndexable).map((userpage) => createSitemapEntry(`/${userpage.slug}`)),

    ...authors.filter(isIndexable).map((author) => createSitemapEntry(`/author/${author.slug}`)),
  ]

  if (peopleConfig && isIndexable(peopleConfig)) {
    entries.push(createSitemapEntry("/people"))
  }

  return entries
}
