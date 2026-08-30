import { type Metadata } from "next"
import { notFound, permanentRedirect } from "next/navigation"
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
import { categories, createPaginatedStaticParams, getCategoryBySlug, paginate } from "@/lib/content"
import { buildPageMetadata } from "@/lib/site/metadata"

export async function generateStaticParams(): Promise<{ category: string; page: string }[]> {
  return categories.flatMap((category) => {
    const entry = getCategoryBySlug(category.slug)
    if (!entry) {
      return []
    }

    const paginated = paginate(entry.posts, 1)
    const ps = createPaginatedStaticParams(paginated.meta.totalPages, 2)

    return ps.map(({ page }) => ({
      category: category.slug,
      page,
    }))
  })
}

export async function generateMetadata(
  props: PageProps<"/posts/by-category/[category]/[page]">
): Promise<Metadata> {
  const { category: paramCategory, page: paramPage } = await props.params

  const category = getCategoryBySlug(paramCategory)
  if (!category) {
    return {}
  }

  const paginated = paginate(category.posts, paramPage)
  if (paginated.meta.isRequestedPageOutOfRange || paginated.meta.isFirstPage) {
    return {}
  }

  return buildPageMetadata({
    title: `Category: ${category.name} — Page ${paginated.meta.page}`,
    description: `Browse page ${paginated.meta.page} of articles filed under the “${category.name}” category.`,
    pathname: `/posts/by-category/${category.slug}/${paginated.meta.page}`,
  })
}

export default async function CategoryPaginatedPage(
  props: PageProps<"/posts/by-category/[category]/[page]">
) {
  const { category: paramCategory, page: paramPage } = await props.params

  const category = getCategoryBySlug(paramCategory)
  if (!category) {
    notFound()
  }

  const paginated = paginate(category.posts, paramPage)
  if (paginated.meta.isRequestedPageOutOfRange) {
    notFound()
  }

  if (paginated.meta.isFirstPage) {
    permanentRedirect(`/posts/by-category/${paramCategory}`)
  }

  const activeEntry = {
    kind: "category",
    slug: category.slug,
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
              <BreadcrumbPage>
                <TwemojifyText text={category.name} />
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <PageHeader
          title={category.name}
          summary={siteConfig.pageSummaries.category.replaceAll("{name}", category.name)}
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
              page === 1
                ? `/posts/by-category/${category.slug}`
                : `/posts/by-category/${category.slug}/${page}`
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
