import "server-only"
import {
  authorMetas,
  categories,
  newsConfig,
  peopleConfig,
  postMetas,
  tags,
  userpages,
} from "@/lib/content"
import { siteConfig } from "@/lib/site/config"
import { formatDate } from "@/lib/site/format-date"

export type SiteSearchDocumentKind = "article" | "page" | "category" | "tag" | "person"

export type SiteSearchDocument = {
  id: string
  kind: SiteSearchDocumentKind
  title: string
  href: string
  keywords: string[]
  description?: string
  prefix?: string
  meta?: string
  secondaryMeta?: string
  avatar?: string
}

export type SiteSearchQuickLink = {
  label: string
  href: string
}

export type SiteSearchData = {
  documents: SiteSearchDocument[]
  quickLinks: SiteSearchQuickLink[]
}

export function getSiteSearchData(): SiteSearchData {
  const articleDocuments: SiteSearchDocument[] = postMetas.map((post) => ({
    id: `article:${post.slug}`,
    kind: "article",
    title: post.title,
    description: post.summary,
    href: `/post/${post.slug}`,
    keywords: compactStrings([
      post.title,
      post.summary,
      post.seo.description,
      post.category?.name,
      ...post.tags.flatMap((tag) => [
        tag.name,
        ...getTaxonomyAliases(tag.name, siteConfig.post.tagAliases),
      ]),
      ...post.authors.map((author) => author.name),
      ...(post.category
        ? getTaxonomyAliases(post.category.name, siteConfig.post.categoryAliases)
        : []),
    ]),
    meta: post.category?.name,
    secondaryMeta: formatDate(post.datePublish),
  }))

  const userpageDocuments: SiteSearchDocument[] = userpages.map((page) => ({
    id: `page:userpage:${page.slug}`,
    kind: "page",
    title: page.title,
    description: page.summary,
    href: `/${page.slug}`,
    keywords: compactStrings([page.title, page.summary, page.seo.description]),
  }))

  const categoryDocuments: SiteSearchDocument[] = categories.map((category) => ({
    id: `category:${category.slug}`,
    kind: "category",
    title: category.name,
    href: `/posts/by-category/${category.slug}`,
    keywords: compactStrings([
      category.name,
      ...getTaxonomyAliases(category.name, siteConfig.post.categoryAliases),
    ]),
    meta: formatArticleCount(category.count),
  }))

  const tagDocuments: SiteSearchDocument[] = tags.map((tag) => ({
    id: `tag:${tag.slug}`,
    kind: "tag",
    title: tag.name,
    prefix: "#",
    href: `/posts/by-tag/${tag.slug}`,
    keywords: compactStrings([
      tag.name,
      ...getTaxonomyAliases(tag.name, siteConfig.post.tagAliases),
    ]),
    meta: formatArticleCount(tag.count),
  }))

  const authorDocuments: SiteSearchDocument[] = authorMetas.map((author) => ({
    id: `author:${author.slug}`,
    kind: "person",
    title: `Author: ${author.name}`,
    description: author.summary,
    href: `/author/${author.slug}`,
    avatar: author.avatar,
    keywords: compactStrings([
      author.name,
      author.summary,
      author.seo.description,
      ...author.info.flatMap((item) => [item.label, item.value]),
    ]),
    meta:
      author.info
        .slice(0, 2)
        .map((item) => item.value)
        .join(" · ") || undefined,
  }))

  const peopleDocuments: SiteSearchDocument[] = peopleConfig
    ? [
        ...peopleConfig.current.flatMap(({ role, people }) =>
          people.map((person): SiteSearchDocument => ({
            id: `people:current:${role}:${
              person.author?.slug ?? person.github ?? person.name
            }:${person.startYear}`,
            kind: "person",
            title: `People: ${person.name}`,
            description: person.research.join(" · "),
            href: "/people",
            avatar: person.avatar,
            keywords: compactStrings([person.name, role, person.github, ...person.research]),
            meta: role,
            secondaryMeta: `Since ${person.startYear}`,
          }))
        ),

        ...peopleConfig.alumni.flatMap(({ role, people }) =>
          people.map((person): SiteSearchDocument => ({
            id: `people:alumni:${role}:${
              person.author?.slug ?? person.name
            }:${person.startYear}:${person.endYear}`,
            kind: "person",
            title: `People: ${person.name}`,
            description: person.description,
            href: "/people",
            keywords: compactStrings([
              person.name,
              `People: ${person.name}`,
              "Alumni",
              role,
              person.github,
              person.description,
            ]),
            meta: "Alumni",
            secondaryMeta: `${role} · ${person.startYear}–${person.endYear}`,
          }))
        ),
      ]
    : []

  const singletonPageDocuments = compactDocuments([
    {
      id: "page:home",
      kind: "page",
      title: "Home",
      description: "Go back to the homepage.",
      href: "/",
      keywords: ["Home", "Homepage"],
    },
    newsConfig
      ? {
          id: "page:singleton:news",
          kind: "page",
          title: newsConfig.title,
          description: newsConfig.summary,
          href: "/news",
          keywords: [newsConfig.title, "News"],
        }
      : undefined,

    peopleConfig
      ? {
          id: "page:singleton:people",
          kind: "page",
          title: peopleConfig.title,
          description: peopleConfig.summary,
          href: "/people",
          keywords: [peopleConfig.title, "People"],
        }
      : undefined,
  ])

  return {
    documents: [
      ...articleDocuments,
      ...categoryDocuments,
      ...tagDocuments,
      ...userpageDocuments,
      ...authorDocuments,
      ...peopleDocuments,
      ...singletonPageDocuments,
    ],
    quickLinks: siteConfig.header.nav.map((item) => ({
      label: item.label,
      href: item.href,
    })),
  }
}

function compactStrings(values: Array<string | undefined>): string[] {
  return values.filter(
    (value): value is string => typeof value === "string" && value.trim().length > 0
  )
}

function getTaxonomyAliases(name: string, aliases: Record<string, string[]>): string[] {
  return aliases[name] ?? []
}

function formatArticleCount(count: number): string {
  return `${count} ${count === 1 ? "article" : "articles"}`
}

function compactDocuments(documents: Array<SiteSearchDocument | undefined>): SiteSearchDocument[] {
  return documents.filter((document): document is SiteSearchDocument => document !== undefined)
}
