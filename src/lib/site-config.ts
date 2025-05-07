import { deepmerge } from 'deepmerge-ts'
import {
  GoogleAnalyticsProps,
  PlausibleProps,
  PosthogProps,
  SimpleAnalyticsProps,
  UmamiProps,
} from 'pliny/analytics/index.js'
import { DisqusProps, UtterancesProps } from 'pliny/comments/index.js'

import { GiscusProps } from '@/components/comment/giscus-comments'
import { homepageSectionMap } from '@/components/homepage/homepage-section'
import userConfig from '@/data/site-config'

export type CommentProviders = 'giscus' | 'utterances' | 'disqus'

export type CreativeCommonsLicense =
  | 'cc-by-nc-sa'
  | 'cc-by-nc-nd'
  | 'cc-by-nc'
  | 'cc-by-nd'
  | 'cc-by-sa'
  | 'cc-by'
  | 'cc0'

export interface SiteConfig {
  // The URL of your site, without trailing slash.
  // Note that it should include the protocol (https://) and the subdirectory if applicable.
  // For example, 'https://example.com' or 'https://example.com/blog'.
  siteUrl: string
  // The root path of your site (only needed when the site is at a subdirectory).
  // For example, if your site is at 'https://example.com/blog', set it to '/blog'.
  // Leave it blank to use the environment variable `BASE_PATH`.
  siteRoot?: string
  // The title of your site, such as "John's Blog".
  siteTitle: string
  // A short description used for SEO and social media.
  description: string
  // The locale for your site. (Default: en-US)
  locale: string
  // The author of the site.
  author: string
  // Keywords used for SEO and social media. It is unnecessary for most modern sites.
  keywords: string[]

  // Whether to use multiple categories to classify posts. (Default: true)
  multiCategories: boolean
  // Whether to have a team page. (Default: true)
  teamPage: boolean
  // The number of posts per page in the pagination. (Default: 10)
  postPerPage: number

  // The settings for the homepage.
  homepage: {
    // The sections displayed on the homepage. You can customize your homepage by changing the order or adding/removing sections.
    // The available sections are 'popularTags', 'recentPosts', and 'latestNews'.
    sections: (keyof typeof homepageSectionMap)[]
    // Popular tags displayed on the homepage. If blank, tags with the most posts will be used.
    popularTags: { tag: string; icon?: string; title?: string }[]
    // GitHub username for the GitHub calendar on the homepage. (Example: 'zhutmost')
    // Leave it blank to disable the GitHub calendar.
    githubCalendar: string | null
    // The number of latest news displayed on the homepage. (Default: 5)
    latestNewsNum: number
  }

  // Set the greetings (displayed under the page header) for different pages.
  pageGreetings: {
    // Greetings for 'Authors'(/about/[...]) pages.
    about: string
    // Greetings for 'All Posts'(/archive & /category/... & /tags/...) pages.
    archive: string
    // Greetings for 'News'(/news) pages
    news: string
    // Greetings for the 'Popular Tags' section on the homepage.
    tags: string
    // Greetings for 'Team'(/team) page.
    team: string
  }

  header: {
    // The path to the logo image. (Example: '/logo.svg')
    logo?: string
    // The site title displayed on the navigation bar.
    title?: string
    // Whether to show the theme switching button on the navigation bar.
    themeSwitch: boolean
    // Navigation menu items. (Example: { Home: '/', Posts: '/archive' })
    menu: Record<string, string>
  }

  footer: {
    // Social icons displayed at the footer.
    icons?: Record<string, { icon: string; href: string }>
    // The Beian number of your site (which is needed for websites deployed in China).
    beian?: string
  }

  // Comment support (provided by Pliny)
  // See https://github.com/timlrx/pliny for more details.
  comment: {
    // The comment provider you want to use. (Options: 'giscus', 'utterances', 'disqus')
    // Keep it null to disable comment support.
    provider: CommentProviders | null
    giscusConfig?: GiscusProps
    utterancesConfig?: UtterancesProps
    disqusConfig?: DisqusProps
  }

  // Analytics support (provided by Pliny)
  // See https://github.com/timlrx/pliny for more details.
  analytics: {
    umamiAnalytics?: UmamiProps
    posthogAnalytics?: PosthogProps
    googleAnalytics?: GoogleAnalyticsProps
    plausibleAnalytics?: PlausibleProps
    simpleAnalytics?: SimpleAnalyticsProps
  }

  // SEO settings (OpenGraph & Twitter card)
  seo: {
    // The path to the default social banner image. (Example: '/banner-default.png')
    socialBanner: string
    // OpenGraph settings. Keep them blank to use the default values.
    openGraph?: {
      title: string
      description: string
      siteName: string
      locale: string
      images: string
    }
    // OpenGraph settings. Keep them blank to use the default values.
    twitter?: {
      title: string
      description: string
      images: string
    }
  }

  // The Creative Commons (CC) license of your posts. Leave it null to disable the license display.
  // Visit https://creativecommons.org/share-your-work/cclicenses to find the license you want.
  license: CreativeCommonsLicense | null
}

// Default site config. You can override it in the user config (/data/site-config.ts).
export const defaultSiteConfig: SiteConfig = {
  siteUrl: 'https://example.com',
  siteRoot: process.env.BASE_PATH ?? undefined,
  siteTitle: 'Example Site',
  description: 'This is an example site',
  locale: 'en-US',
  author: 'John Doe',
  postPerPage: 10,
  multiCategories: true,
  teamPage: true,
  keywords: [],
  homepage: {
    sections: ['latestNews', 'popularTags', 'recentPosts'],
    popularTags: [],
    githubCalendar: null,
    latestNewsNum: 5,
  },
  pageGreetings: {
    about: 'Hello, Bonjour, こんにちは, 你好! Glad to see you!',
    archive: 'My digital garden, where I share my thoughts and ideas.',
    news: 'Stay up-to-date with the latest happenings.',
    tags: 'Popular tags feature the most widely favored topics.',
    team: 'Meet the team behind the scenes.',
  },
  header: {
    logo: '/favicons/favicon.svg',
    title: 'Analog Demo',
    themeSwitch: true,
    menu: {
      Home: '/',
      Blog: '/archive',
    },
  },
  footer: {
    beian: undefined,
  },
  comment: {
    provider: null,
  },
  analytics: {},
  seo: {
    socialBanner: '/banner-default.png',
    openGraph: undefined,
    twitter: undefined,
  },
  license: null,
}

const siteConfig: SiteConfig = (() => {
  // Merge default config with user config
  const c = deepmerge(defaultSiteConfig, userConfig) as SiteConfig

  c.siteUrl = new URL(c.siteUrl).toString()

  // Set default values for Open Graph and Twitter SEO
  c.seo.openGraph = {
    title: c.seo.openGraph?.title ?? c.siteTitle,
    description: c.seo.openGraph?.description ?? c.description,
    siteName: c.seo.openGraph?.siteName ?? c.siteTitle,
    locale: c.seo.openGraph?.locale ?? c.locale,
    images: new URL(c.seo.openGraph?.images ?? c.seo.socialBanner, c.siteUrl).toString(),
  }
  c.seo.twitter = {
    title: c.seo.twitter?.title ?? c.siteTitle,
    description: c.seo.twitter?.description ?? c.description,
    images: new URL(c.seo.twitter?.images ?? c.seo.socialBanner, c.siteUrl).toString(),
  }

  return c
})()

export default siteConfig
