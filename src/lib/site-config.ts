import { deepmerge } from 'deepmerge-ts'

import type { AnalyticsConfig } from '@/components/analytics'
import type { HomepageSectionProps } from '@/components/homepage/sections/home-section'
import type { GiscusCommentProps } from '@/components/post/comment/giscus-comment'
import type { CreativeCommonsLicenseChoices } from '@/components/post/post-license'
import userConfig from '@/data/site-config'

export interface SiteConfig {
  // The URL of your site, without a trailing slash.
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

  // The number of posts per page in the pagination. (Default: 10)
  pagination: number

  homepage: {
    // An array of greetings displayed on the homepage.
    greetings?: string[]
    // GitHub username for the GitHub calendar on the homepage. (Example: 'zhutmost')
    // Leave it blank to disable the GitHub calendar. (Default: null)
    githubCalendar?: string
    // Sections displayed on the homepage. You can refer to /data/demo/site-config.ts as an example.
    sections?: HomepageSectionProps<unknown>[]
  }

  header: {
    // The path to the logo image. (Example: '/logo.svg')
    logo?: string
    // The site title displayed on the navigation bar.
    title?: string
    // Navigation menu items. (Example: [{ name: Home, href: '/' }, ... ])
    menu: { name: string; href: string }[]
  }

  footer: {
    // Social icons displayed at the footer.
    icons?: Record<string, { icon: string; href: string }>
    // The Bei-An number of your site (which is needed for websites deployed in China).
    beian?: string
  }

  pages: {
    // Whether to have a team page. (Default: true)
    team: boolean
    // Set the greetings (displayed under the page header) for different pages.
    greetings: {
      // Greetings for 'Authors' (/about/[...]) pages.
      about: string
      // Greetings for 'All Posts' (/archive & /category/... & /tags/...) pages.
      archive: string
      // Greetings for the 'Popular Tags' section on the homepage.
      tags: string
      // Greetings for 'Our Team'(/team) page.
      team: string
      // Greetings for user pages (/[...slug]).
      otherDefault: string
    }
  }

  // Comment support
  comment: {
    // The comment provider you want to use. (Options: currently only 'giscus' supported)
    // Keep it null to disable comment support.
    provider: 'giscus' | null
    giscusConfig?: GiscusCommentProps
  }

  // Analytics support
  analytics: AnalyticsConfig

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
  license: CreativeCommonsLicenseChoices | null
}

// Default site config. You can override it in the user config (/data/site-config.ts).
export const defaultSiteConfig: SiteConfig = {
  siteUrl: 'https://example.com',
  siteRoot: process.env.BASE_PATH ?? undefined,
  siteTitle: 'Example Site',
  description: 'This is an example site',
  locale: 'en-US',
  author: 'John Doe',
  pagination: 10,
  keywords: [],
  homepage: {
    greetings: [],
    githubCalendar: undefined,
    sections: [],
  },
  pages: {
    team: true,
    greetings: {
      about: 'Hello, Bonjour, こんにちは, 你好! Glad to see you!',
      archive: 'My digital garden, where I share my thoughts and ideas.',
      tags: 'Popular tags feature the most widely favored topics.',
      team: 'Meet the team behind the scenes.',
      otherDefault: 'Hello, Bonjour, こんにちは, 你好! Glad to see you!',
    },
  },
  header: {
    logo: '/icon.svg',
    title: 'Analog Demo',
    menu: [],
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
  const c: SiteConfig = deepmerge(defaultSiteConfig, userConfig) as SiteConfig

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
