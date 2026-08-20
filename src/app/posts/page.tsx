import { type Metadata } from "next"

import { IconWritingSign } from "@tabler/icons-react"

import { ArchiveSidebar, MobileArchiveSidebar } from "@/components/pages/archive/archive-sidebar"
import { PageHeader } from "@/components/pages/basic/page-header"
import { PageShell } from "@/components/pages/basic/page-shell"
import { PostCard } from "@/components/pages/post/post-card"
import { PostPagination } from "@/components/pages/post/post-pagination"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/shadcn/empty"
import { postMetas } from "@/lib/content"
import { paginate } from "@/lib/content/paginate"
import { siteConfig } from "@/lib/site/config"
import { buildPageMetadata } from "@/lib/site/metadata"

export const metadata: Metadata = buildPageMetadata({
  title: "All Articles",
  description: "Browse all published articles, organized by category, tag, and author.",
  pathname: "/posts",
})

export default function PostsPage() {
  const paginated = paginate(postMetas, 1)

  // Archive can be empty on a new site or when all posts are filtered out
  // (for example, draft-only content in production). Taxonomy pages should
  // generally use `notFound()` for missing or empty post sets.
  const hasPosts = paginated.items.length > 0

  return (
    <PageShell.Root>
      <PageShell.Top>
        <PageHeader title="All Articles" summary={siteConfig.pageSummaries.archive} />
      </PageShell.Top>

      <PageShell.Body asidePosition="right" className="items-start">
        <MobileArchiveSidebar />

        <PageShell.Content>
          {hasPosts ? (
            <>
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
            </>
          ) : (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <IconWritingSign />
                </EmptyMedia>
                <EmptyTitle>No articles yet</EmptyTitle>
                <EmptyDescription>There are no published articles here yet.</EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
        </PageShell.Content>

        <PageShell.Aside className="hidden xl:sticky xl:top-24 xl:block xl:self-start">
          <ArchiveSidebar />
        </PageShell.Aside>
      </PageShell.Body>
    </PageShell.Root>
  )
}
