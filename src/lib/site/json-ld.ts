import { siteConfig } from "@/lib/config"
import { type AuthorMeta, type PostMeta } from "@/lib/content"
import { classifyHref } from "@/lib/href"

const schemaContext = "https://schema.org"

function absoluteUrl(pathname: string): string {
  return new URL(pathname, siteConfig.siteUrl).toString()
}

function websiteId(): string {
  return `${absoluteUrl("/")}#website`
}

function webUrl(href: string | undefined): string | undefined {
  if (!href) {
    return undefined
  }

  const kind = classifyHref(href)

  if (kind === "internal") {
    return absoluteUrl(href)
  }

  return kind === "external" ? href : undefined
}

function externalWebUrl(href: string): string | undefined {
  return classifyHref(href) === "external" ? href : undefined
}

function buildPostAuthor(author: PostMeta["authors"][number]) {
  if (author.kind === "internal") {
    const authorUrl = absoluteUrl(`/author/${author.slug}`)

    return {
      "@type": "Person",
      "@id": `${authorUrl}#person`,
      name: author.name,
      url: authorUrl,
    }
  }

  return {
    "@type": "Person",
    name: author.name,
    url: webUrl(author.href),
  }
}

export function buildWebsiteJsonLd() {
  const url = absoluteUrl("/")

  return {
    "@context": schemaContext,
    "@type": "WebSite",
    "@id": websiteId(),
    url,
    name: siteConfig.siteTitle,
    description: siteConfig.description,
    inLanguage: siteConfig.locale,
  }
}

export function buildPostJsonLd(post: PostMeta) {
  const pageUrl = absoluteUrl(`/post/${post.slug}`)

  const article = {
    "@type": "BlogPosting",
    "@id": `${pageUrl}#article`,
    url: pageUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    headline: post.title,
    abstract: post.summary,
    description: post.seo.description,
    datePublished: post.datePublish,
    dateModified: post.dateUpdate,
    image: webUrl(post.cover),
    author: post.authors.length > 0 ? post.authors.map(buildPostAuthor) : undefined,
    articleSection: post.category.name,
    keywords: post.tags.map((tag) => tag.name),
    inLanguage: siteConfig.locale,
    isPartOf: { "@id": websiteId() },
  }

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Articles",
        item: absoluteUrl("/posts"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: post.category.name,
        item: absoluteUrl(`/posts/by-category/${post.category.slug}`),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: pageUrl,
      },
    ],
  }

  return {
    "@context": schemaContext,
    "@graph": [article, breadcrumb],
  }
}

export function buildAuthorJsonLd(author: AuthorMeta) {
  const pageUrl = absoluteUrl(`/author/${author.slug}`)
  const personId = `${pageUrl}#person`
  const sameAs = author.socials.flatMap((social) => {
    const url = externalWebUrl(social.href)
    return url ? [url] : []
  })

  const person = {
    "@type": "Person",
    "@id": personId,
    name: author.name,
    url: pageUrl,
    description: author.seo.description,
    image: webUrl(author.avatar),
    sameAs: sameAs.length > 0 ? sameAs : undefined,
  }

  const profilePage = {
    "@type": "ProfilePage",
    "@id": `${pageUrl}#profile`,
    url: pageUrl,
    name: author.name,
    description: author.seo.description,
    inLanguage: siteConfig.locale,
    isPartOf: { "@id": websiteId() },
    mainEntity: { "@id": personId },
  }

  return {
    "@context": schemaContext,
    "@graph": [profilePage, person],
  }
}
