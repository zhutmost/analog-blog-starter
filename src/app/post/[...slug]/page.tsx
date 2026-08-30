import { type Metadata } from "next"
import { notFound } from "next/navigation"
import * as React from "react"

import { CommentSystem } from "@/components/comment"
import { MdxProse } from "@/components/mdx/mdx-prose"
import { PageShell } from "@/components/pages/basic/page-shell"
import { PostHeader } from "@/components/pages/post/post-header"
import { hasPostTocItems, PostToc } from "@/components/pages/post/post-toc"
import { JsonLd } from "@/components/seo/json-ld"
import { AutoLink, TwemojifyText } from "@/components/ui/my"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/shadcn/breadcrumb"
import { siteConfig } from "@/lib/config"
import { getPostBySlug, getPostMetaBySlug, postMetas } from "@/lib/content"
import { buildPostJsonLd } from "@/lib/site/json-ld"
import { buildRobotsMetadata } from "@/lib/site/metadata"

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  return postMetas.map((post) => ({ slug: post.slug.split("/") }))
}

export async function generateMetadata(props: PageProps<"/post/[...slug]">): Promise<Metadata> {
  const { slug: paramSlug } = await props.params

  const post = getPostMetaBySlug(paramSlug.join("/"))
  if (!post) {
    return {}
  }

  const socialShareImages = post.cover ? [post.cover] : siteConfig.socialShare.defaultImages
  const pathname = `/post/${post.slug}`

  return {
    title: post.title,
    description: post.seo.description,

    alternates: {
      canonical: pathname,
      types: {
        "application/rss+xml": new URL("/rss.xml", siteConfig.siteUrl),
      },
    },

    openGraph: {
      type: "article",
      url: pathname,
      title: post.title,
      description: post.summary,
      publishedTime: post.datePublish,
      modifiedTime: post.dateUpdate,
      images: socialShareImages,
      authors: post.authors.map((author) => author.name),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      site: siteConfig.socialShare.twitterSite,
      images: socialShareImages,
    },

    robots: buildRobotsMetadata(post.seo.noIndex),
  }
}

export default async function PostPage(props: PageProps<"/post/[...slug]">) {
  const { slug: paramSlug } = await props.params
  const post = getPostBySlug(paramSlug.join("/"))
  if (!post) {
    notFound()
  }

  const hasToc = hasPostTocItems(post.toc)

  return (
    <PageShell.Root as="article">
      {!post.seo.noIndex && <JsonLd data={buildPostJsonLd(post)} />}

      <PageShell.Top>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<AutoLink href="/posts" />}>Articles</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                render={<AutoLink href={`/posts/by-category/${post.category.slug}`} />}
              >
                <TwemojifyText text={post.category.name} />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="max-w-40 truncate">{post.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <PostHeader post={post} />
      </PageShell.Top>

      <PageShell.Body asidePosition={hasToc ? "right" : undefined}>
        <PageShell.Content width="prose">
          <MdxProse code={post.content} />

          {post.comment && <CommentSystem />}
        </PageShell.Content>

        {hasToc && (
          <PageShell.Aside sticky className="hidden xl:block">
            <PostToc toc={post.toc} />
          </PageShell.Aside>
        )}
      </PageShell.Body>
    </PageShell.Root>
  )
}
