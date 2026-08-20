import { Feed, type FeedOptions } from "feed"

import { type Post, posts } from "@/lib/content"
import { siteConfig } from "@/lib/site/config"

export function generateRssFeed(): Feed {
  const thisYear: number = new Date().getFullYear()
  const defaultImage = siteConfig.socialShare.defaultImages[0]

  const feedOptions: FeedOptions = {
    title: siteConfig.siteTitle,
    description: siteConfig.description,
    id: "/",
    link: siteConfig.siteUrl,
    image: defaultImage ? new URL(defaultImage, siteConfig.siteUrl).href : undefined,
    favicon: siteConfig.favicon.ico
      ? new URL(siteConfig.favicon.ico, siteConfig.siteUrl).href
      : undefined,
    language: siteConfig.locale,
    updated: new Date(),
    copyright: `Copyright © ${thisYear.toString()} ${siteConfig.author}`,
    feedLinks: {
      rss: new URL("rss.xml", siteConfig.siteUrl).href,
    },
    author: {
      name: siteConfig.author,
      link: new URL("about", siteConfig.siteUrl).href,
    },
  }

  const feed = new Feed(feedOptions)
  posts.forEach((post: Post) => {
    feed.addItem({
      title: post.title,
      id: `/post/${post.slug}`,
      link: new URL(`post/${post.slug}`, siteConfig.siteUrl).href,
      image: post.cover ? new URL(post.cover, siteConfig.siteUrl).href : undefined,
      description: post.summary,
      content: post.content,
      author: post.authors.map((author) => {
        if (author.kind === "internal") {
          return {
            name: author.name,
            link: new URL(`author/${author.slug}`, siteConfig.siteUrl).href,
            avatar: author.avatar ? new URL(author.avatar, siteConfig.siteUrl).href : undefined,
          }
        }
        return {
          name: author.name,
          link: author.href ? new URL(author.href, siteConfig.siteUrl).href : undefined,
        }
      }),
      date: new Date(post.datePublish),
    })
  })

  return feed
}
