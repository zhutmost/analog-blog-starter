import { z } from "zod"

import { mz } from "@/lib/utils"

const postSchema = z.object({
  includeDraft: z.boolean().default(false),
  pageSize: z.int().positive().default(10),
  sortKey: z.enum(["datePublish", "dateUpdate", "title"]).default("datePublish"),
  sortDirection: z.enum(["asc", "desc"]).default("desc"),
  categoryAliases: z.record(mz.nonEmptyString(), z.array(mz.nonEmptyString())).default({}),
  tagAliases: z.record(mz.nonEmptyString(), z.array(mz.nonEmptyString())).default({}),
})

const pageSummariesSchema = z.object({
  archive: mz.nonEmptyString().default("All published articles, collected in one place."),
  tags: mz.nonEmptyString().default("Explore articles by topic."),
  category: mz.nonEmptyString().default("Browse articles filed under “{name}”."),
  tag: mz.nonEmptyString().default("Browse articles tagged with “{name}”."),
  author: mz.nonEmptyString().default("Browse articles written by {name}."),
})

const faviconSchema = z.object({
  ico: mz.optionalString((s) => s.endsWith(".ico")),
  svg: mz.optionalString((s) => s.endsWith(".svg")),
  png96x96: mz.optionalString((s) => s.endsWith(".png")),
  apple: mz.optionalString((s) => s.endsWith(".png")),
  manifest192x192: mz.optionalString((s) => s.endsWith(".png")),
  manifest512x512: mz.optionalString((s) => s.endsWith(".png")),
})

const socialShareSchema = z.object({
  defaultImages: z.array(mz.nonEmptyString()).default([]),
  twitterSite: mz.nonEmptyString().startsWith("@").optional(),
})

const siteHeaderSchema = z.object({
  logo: z.string().optional(),
  title: z.string().optional(),
  nav: z.array(z.object({ label: mz.nonEmptyString(), href: mz.href() })).default([
    { label: "Home", href: "/" },
    { label: "Articles", href: "/posts" },
    { label: "Tags", href: "/posts" },
    // { label: "News", href: "/news" },
    // { label: "People", href: "/people" },
    // { label: "About", href: "/about" },
  ]),
})

const siteFooterSchema = z.object({
  beian: z
    .object({
      icp: z.object({ code: mz.nonEmptyString() }).optional(),
      publicSecurity: z.object({ code: mz.nonEmptyString(), href: z.httpUrl() }).optional(),
    })
    .prefault({}),
  socialIcons: z
    .array(z.object({ label: mz.nonEmptyString(), href: mz.href(), icon: mz.optionalString() }))
    .default([]),
})

const analyticsScriptSourceSchema = z.union([z.httpUrl(), mz.nonEmptyString().startsWith("/")])

const umamiAnalyticsSchema = z.object({
  websiteId: z.uuid(),
  src: analyticsScriptSourceSchema.default("https://cloud.umami.is/script.js"),
  hostUrl: z.httpUrl().optional(),
  domains: z.array(mz.nonEmptyString()).min(1).optional(),
  doNotTrack: z.boolean().default(true),
  excludeSearch: z.boolean().default(false),
  excludeHash: z.boolean().default(true),
  performance: z.boolean().default(false),
})

const analyticsSchema = z.object({
  umami: umamiAnalyticsSchema.optional(),
})

const giscusCommentSchema = z.object({
  provider: z.literal("giscus"),
  repo: z.templateLiteral([mz.nonEmptyString(), "/", mz.nonEmptyString()]),
  repoId: mz.nonEmptyString(),
  category: mz.nonEmptyString().default("Announcements"),
  categoryId: mz.nonEmptyString(),
  mapping: z
    .enum(["url", "title", "og:title", "specific", "number", "pathname"])
    .default("pathname"),
  term: mz.optionalString(),
  strict: z.boolean().default(false),
  reactionsEnabled: z.boolean().default(true),
  emitMetadata: z.boolean().default(false),
  inputPosition: z.enum(["top", "bottom"]).default("bottom"),
  lang: mz.nonEmptyString().default("en"),
})

export const siteConfigSchema = z.object({
  siteUrl: z.httpUrl().normalize(),
  siteTitle: mz.nonEmptyString(),
  description: mz.nonEmptyString(),
  author: mz.nonEmptyString(),
  locale: mz.locale().default("en-US"),

  favicon: faviconSchema.prefault({}),

  header: siteHeaderSchema.prefault({}),
  footer: siteFooterSchema.prefault({
    socialIcons: [{ label: "RSS Feed", icon: "IconRss", href: "/rss.xml" }],
  }),

  post: postSchema.prefault({}),

  analytics: analyticsSchema.prefault({}),

  comment: z
    .discriminatedUnion("provider", [z.object({ provider: z.undefined() }), giscusCommentSchema])
    .default({ provider: undefined }),
  socialShare: socialShareSchema.prefault({}),

  pageSummaries: pageSummariesSchema.prefault({}),
})

export type SiteConfig = z.infer<typeof siteConfigSchema>
export type InputSiteConfig = z.input<typeof siteConfigSchema>
