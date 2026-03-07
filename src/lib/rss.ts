import { Feed, type FeedOptions } from 'feed'

import { allPosts, type Post } from '@/lib/coco'
import siteConfig from '@/lib/site-config'

export default function generateRssFeed(): Feed {
  const thisYear: number = new Date().getFullYear()

  const feedOptions: FeedOptions = {
    title: `RSS Feed | ${siteConfig.siteTitle}`,
    description: siteConfig.description,
    id: '/',
    link: siteConfig.siteUrl.href,
    image: new URL(siteConfig.seo.socialBanner, siteConfig.siteUrl).href,
    favicon: new URL('favicon.ico', siteConfig.siteUrl).href,
    language: siteConfig.locale,
    updated: new Date(),
    copyright: `All rights reserved ${thisYear.toString()} ${siteConfig.author}`,
    author: {
      name: siteConfig.author,
      link: new URL('about', siteConfig.siteUrl).href,
    },
  }

  const feed = new Feed(feedOptions)
  allPosts.forEach((post: Post) => {
    feed.addItem({
      title: post.title,
      id: `/post/${post.slug}`,
      link: new URL(`post/${post.slug}`, siteConfig.siteUrl).href,
      image: new URL(post.banner ?? siteConfig.seo.socialBanner, siteConfig.siteUrl).href,
      description: post.summary,
      content: post.content,
      author: post.authors.map((author) => ({
        name: author.name,
      })),
      date: post.datePublish,
    })
  })

  return feed
}
