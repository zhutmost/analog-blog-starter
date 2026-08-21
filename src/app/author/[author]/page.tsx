import { type Metadata } from "next"
import { notFound } from "next/navigation"

import { CommentSystem } from "@/components/comment"
import { MdxProse } from "@/components/mdx/mdx-prose"
import { AuthorProfile } from "@/components/pages/author/author-profile"
import { AuthorRecentArticles } from "@/components/pages/author/author-recent-articles"
import { PageShell } from "@/components/pages/basic/page-shell"
import { JsonLd } from "@/components/seo/json-ld"
import { authors, getAuthorBySlug, getPostMetasByAuthorSlug } from "@/lib/content"
import { buildAuthorJsonLd } from "@/lib/site/json-ld"
import { buildPageMetadata } from "@/lib/site/metadata"
import { cn } from "@/lib/utils"

export async function generateStaticParams(): Promise<{ author: string }[]> {
  return authors.map((author) => ({
    author: author.slug,
  }))
}

export async function generateMetadata(props: PageProps<"/author/[author]">): Promise<Metadata> {
  const { author: paramAuthor } = await props.params

  const author = getAuthorBySlug(paramAuthor)

  if (!author) {
    return {}
  }

  return buildPageMetadata({
    title: author.name,
    description: author.seo.description,
    pathname: `/author/${author.slug}`,
    images: author.avatar ? [author.avatar] : undefined,
    noIndex: author.seo.noIndex,
  })
}

export default async function AuthorPage(props: PageProps<"/author/[author]">) {
  const { author: paramAuthor } = await props.params

  const author = getAuthorBySlug(paramAuthor)

  if (!author) {
    notFound()
  }

  const posts = getPostMetasByAuthorSlug(author.slug)

  return (
    <PageShell.Root>
      {!author.seo.noIndex && <JsonLd data={buildAuthorJsonLd(author)} />}

      <PageShell.Body
        className={cn(
          "grid gap-10",
          "lg:grid-cols-[16rem_minmax(0,1fr)]",
          "lg:grid-rows-[auto_1fr]",
          "lg:gap-x-12 lg:gap-y-8",
          "xl:grid-cols-[18rem_minmax(0,48rem)]",
          "xl:justify-between"
        )}
      >
        <AuthorProfile author={author} className="lg:col-start-1 lg:row-start-1" />

        <PageShell.Content width="prose" className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <article data-slot="author-main" className="min-w-0">
            <MdxProse code={author.content} />

            {author.comment && <CommentSystem />}
          </article>
        </PageShell.Content>

        {posts.length > 0 && (
          <AuthorRecentArticles
            author={author}
            posts={posts}
            className="lg:col-start-1 lg:row-start-2"
          />
        )}
      </PageShell.Body>
    </PageShell.Root>
  )
}
