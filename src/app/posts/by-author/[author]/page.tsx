import { type Metadata } from "next"
import { notFound } from "next/navigation"
import * as React from "react"

import { ArchiveSidebar, MobileArchiveSidebar } from "@/components/pages/archive/archive-sidebar"
import { PageHeader } from "@/components/pages/basic/page-header"
import { PageShell } from "@/components/pages/basic/page-shell"
import { PostCard } from "@/components/pages/post/post-card"
import { PostPagination } from "@/components/pages/post/post-pagination"
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
import { authorMetas, getAuthorMetaBySlug, getPostMetasByAuthorSlug, paginate } from "@/lib/content"
import { buildPageMetadata } from "@/lib/site/metadata"

export async function generateStaticParams(): Promise<{ author: string }[]> {
  return authorMetas.flatMap((author) => {
    const posts = getPostMetasByAuthorSlug(author.slug)

    return posts.length > 0 ? [{ author: author.slug }] : []
  })
}

export async function generateMetadata(
  props: PageProps<"/posts/by-author/[author]">
): Promise<Metadata> {
  const { author: paramAuthor } = await props.params

  const author = getAuthorMetaBySlug(paramAuthor)
  if (!author) {
    return {}
  }

  const posts = getPostMetasByAuthorSlug(author.slug)
  if (posts.length === 0) {
    return {}
  }

  return buildPageMetadata({
    title: `Articles by ${author.name}`,
    description: `Browse Articles written by ${author.name}.`,
    pathname: `/posts/by-author/${author.slug}`,
  })
}

export default async function AuthoredPage(props: PageProps<"/posts/by-author/[author]">) {
  const { author: paramAuthor } = await props.params

  const author = getAuthorMetaBySlug(paramAuthor)
  if (!author) {
    notFound()
  }

  const posts = getPostMetasByAuthorSlug(author.slug)
  if (posts.length === 0) {
    notFound()
  }

  const paginated = paginate(posts, 1)

  return (
    <PageShell.Root>
      <PageShell.Top>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<AutoLink href="/posts" />}>Articles</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                <TwemojifyText text={author.name} />
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <PageHeader
          title={`Articles by ${author.name}`}
          summary={siteConfig.pageSummaries.author.replaceAll("{name}", author.name)}
        />
      </PageShell.Top>

      <PageShell.Body asidePosition="right" className="items-start">
        <MobileArchiveSidebar />

        <PageShell.Content>
          <div data-slot="post-list" className="grid gap-12">
            {paginated.items.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          <PostPagination
            currentPage={paginated.meta.page}
            totalPages={paginated.meta.totalPages}
            getPageHref={(page) =>
              page === 1
                ? `/posts/by-author/${author.slug}`
                : `/posts/by-author/${author.slug}/${page}`
            }
          />
        </PageShell.Content>

        <PageShell.Aside className="hidden xl:sticky xl:top-24 xl:block xl:self-start">
          <ArchiveSidebar />
        </PageShell.Aside>
      </PageShell.Body>
    </PageShell.Root>
  )
}
