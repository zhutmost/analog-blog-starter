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
import { getTagBySlug, paginate, tags } from "@/lib/content"
import { siteConfig } from "@/lib/site/config"
import { buildPageMetadata } from "@/lib/site/metadata"

export async function generateStaticParams(): Promise<{ tag: string }[]> {
  return tags.map((tag) => ({
    tag: tag.slug,
  }))
}

export async function generateMetadata(props: PageProps<"/posts/by-tag/[tag]">): Promise<Metadata> {
  const { tag: paramTag } = await props.params

  const tag = getTagBySlug(paramTag)
  if (!tag) {
    return {}
  }

  return buildPageMetadata({
    title: `Tag: ${tag.name}`,
    description: `Browse articles tagged with “${tag.name}”.`,
    pathname: `/posts/by-tag/${tag.slug}`,
  })
}

export default async function TagPage(props: PageProps<"/posts/by-tag/[tag]">) {
  const { tag: paramTag } = await props.params

  const tag = getTagBySlug(paramTag)
  if (!tag) {
    notFound()
  }

  const paginated = paginate(tag.posts, 1)

  const activeEntry = {
    kind: "tag",
    slug: tag.slug,
  } as const

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
              <BreadcrumbLink render={<AutoLink href="/posts/tags" />}>Tags</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="max-w-40 truncate">
                <TwemojifyText text={tag.name} />
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <PageHeader
          title={tag.name}
          summary={siteConfig.pageSummaries.tag.replaceAll("{name}", tag.name)}
        />
      </PageShell.Top>

      <PageShell.Body asidePosition="right" className="items-start">
        <MobileArchiveSidebar activeEntry={activeEntry} />

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
              page === 1 ? `/posts/by-tag/${tag.slug}` : `/posts/by-tag/${tag.slug}/${page}`
            }
          />
        </PageShell.Content>

        <PageShell.Aside className="hidden xl:sticky xl:top-24 xl:block xl:self-start">
          <ArchiveSidebar activeEntry={activeEntry} />
        </PageShell.Aside>
      </PageShell.Body>
    </PageShell.Root>
  )
}
