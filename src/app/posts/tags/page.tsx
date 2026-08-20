import { type Metadata } from "next"
import * as React from "react"

import { IconTags } from "@tabler/icons-react"

import { PageHeader } from "@/components/pages/basic/page-header"
import { PageShell } from "@/components/pages/basic/page-shell"
import { TagIndex } from "@/components/pages/tags/tag-index"
import { AutoLink } from "@/components/ui/my"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/shadcn/breadcrumb"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/shadcn/empty"
import { tags } from "@/lib/content"
import { siteConfig } from "@/lib/site/config"
import { buildPageMetadata } from "@/lib/site/metadata"

export const metadata: Metadata = buildPageMetadata({
  title: "Tags",
  description: "Explore all article tags and discover writing by topic.",
  pathname: "/posts/tags",
})

export default function TagsPage() {
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
              <BreadcrumbPage>Tags</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <PageHeader title="Tags" summary={siteConfig.pageSummaries.tags} />
      </PageShell.Top>

      <PageShell.Body>
        <PageShell.Content>
          {tags.length > 0 ? (
            <TagIndex tags={tags} />
          ) : (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <IconTags />
                </EmptyMedia>

                <EmptyTitle>No tags yet</EmptyTitle>

                <EmptyDescription>
                  Tags will appear here after they are assigned to published articles.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
        </PageShell.Content>
      </PageShell.Body>
    </PageShell.Root>
  )
}
