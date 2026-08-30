import { type Metadata } from "next"
import { notFound, permanentRedirect } from "next/navigation"

import { ArchiveSidebar, MobileArchiveSidebar } from "@/components/pages/archive/archive-sidebar"
import { PageHeader } from "@/components/pages/basic/page-header"
import { PageShell } from "@/components/pages/basic/page-shell"
import { PostCard } from "@/components/pages/post/post-card"
import { PostPagination } from "@/components/pages/post/post-pagination"
import { siteConfig } from "@/lib/config"
import { createPaginatedStaticParams, paginate, postMetas } from "@/lib/content"
import { buildPageMetadata } from "@/lib/site/metadata"

export function generateStaticParams(): Array<{ page: string }> {
  const paginated = paginate(postMetas, 1)
  return createPaginatedStaticParams(paginated.meta.totalPages, 2)
}

export async function generateMetadata(props: PageProps<"/posts/[page]">): Promise<Metadata> {
  const { page: paramPage } = await props.params

  const paginated = paginate(postMetas, paramPage)
  if (paginated.meta.isRequestedPageOutOfRange || paginated.meta.isFirstPage) {
    return {}
  }

  return buildPageMetadata({
    title: `All Articles — Page ${paginated.meta.page}`,
    description: `Browse page ${paginated.meta.page} of all published articles.`,
    pathname: `/posts/${paginated.meta.page}`,
  })
}

export default async function PostsPaginatedPage(props: PageProps<"/posts/[page]">) {
  const { page: paramPage } = await props.params

  const paginated = paginate(postMetas, paramPage)

  if (paginated.meta.isRequestedPageOutOfRange) {
    notFound()
  }

  if (paginated.meta.isFirstPage) {
    permanentRedirect("/posts")
  }

  return (
    <PageShell.Root>
      <PageShell.Top>
        <PageHeader title="All Articles" summary={siteConfig.pageSummaries.archive} />
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
            getPageHref={(page) => (page === 1 ? "/posts" : `/posts/${page}`)}
          />
        </PageShell.Content>

        <PageShell.Aside className="hidden xl:sticky xl:top-24 xl:block xl:self-start">
          <ArchiveSidebar />
        </PageShell.Aside>
      </PageShell.Body>
    </PageShell.Root>
  )
}
