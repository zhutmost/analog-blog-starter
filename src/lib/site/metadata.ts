import { type Metadata } from "next"

import { siteConfig } from "@/lib/config"

type PageMetadataProps = {
  /**
   * The page title.
   *
   * The root layout title template will append the site title.
   */
  title: string

  /**
   * The page description.
   *
   * Falls back to the site-wide description when omitted.
   */
  description?: string

  /**
   * The canonical pathname of the page.
   *
   * Must start with `/`.
   *
   * @example
   *   "/posts"
   *
   * @example
   *   "/posts/by-tag/typescript"
   */
  pathname: `/${string}`

  /**
   * Social sharing images for Open Graph and Twitter.
   *
   * Falls back to the site-wide default images when omitted.
   */
  images?: string[]

  /**
   * Controls whether search engines may index the page.
   *
   * @default false
   */
  noIndex?: boolean
}

/**
 * Creates metadata for a regular site page.
 *
 * Use this for pages that are neither individual posts nor author profiles, such as archive,
 * taxonomy, search, and static content pages.
 *
 * @param options - Page-specific metadata options.
 * @returns Next.js metadata for the page.
 */
export function buildPageMetadata({
  title,
  description,
  pathname,
  images = siteConfig.socialShare.defaultImages,
  noIndex = false,
}: PageMetadataProps): Metadata {
  return {
    title,
    description,

    alternates: {
      canonical: pathname,
      types: {
        "application/rss+xml": new URL("/rss.xml", siteConfig.siteUrl),
      },
    },

    openGraph: {
      type: "website",
      url: pathname,
      title,
      description,
      siteName: siteConfig.siteTitle,
      locale: siteConfig.locale.replace("-", "_"),
      images,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: siteConfig.socialShare.twitterSite,
      images,
    },

    robots: buildRobotsMetadata(noIndex),
  }
}

export function buildRobotsMetadata(noIndex: boolean): Metadata["robots"] {
  if (!noIndex) {
    return undefined
  }

  return {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  }
}
