import { type Metadata } from "next"
import { notFound } from "next/navigation"

import { IconCalendarEvent } from "@tabler/icons-react"

import { CommentSystem } from "@/components/comment"
import { PageHeader } from "@/components/pages/basic/page-header"
import { PageShell } from "@/components/pages/basic/page-shell"
import { NewsTimeline } from "@/components/pages/news/news-timeline"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/shadcn/empty"
import { newsConfig, type NewsItem } from "@/lib/content"
import { buildPageMetadata } from "@/lib/site/metadata"
import { cn } from "@/lib/utils"

type NewsYearGroup = {
  year: string
  items: NewsItem[]
}

function groupNewsByYear(items: readonly NewsItem[]): NewsYearGroup[] {
  const groups = new Map<string, NewsItem[]>()

  for (const item of items) {
    const year = item.date.slice(0, 4)
    const group = groups.get(year)

    if (group) {
      group.push(item)
    } else {
      groups.set(year, [item])
    }
  }

  return Array.from(groups, ([year, groupedItems]) => ({
    year,
    items: groupedItems,
  }))
}

export function generateMetadata(): Metadata {
  if (!newsConfig) {
    return {}
  }

  return buildPageMetadata({
    title: newsConfig.title,
    description: newsConfig.seo.description,
    pathname: "/news",
    noIndex: newsConfig.seo.noIndex,
  })
}

export default function NewsPage() {
  if (!newsConfig) {
    notFound()
  }

  const yearGroups = groupNewsByYear(newsConfig.items)

  return (
    <PageShell.Root width="5xl">
      <PageShell.Top>
        <PageHeader title={newsConfig.title} summary={newsConfig.summary} />
      </PageShell.Top>

      <PageShell.Body>
        <PageShell.Content className="max-w-5xl">
          {yearGroups.length > 0 ? (
            <div className="grid gap-14 sm:gap-16">
              {yearGroups.map((group, groupIndex) => {
                const headingId = `news-year-${group.year}`

                return (
                  <section
                    key={group.year}
                    aria-labelledby={headingId}
                    className={cn("min-w-0", groupIndex > 0 && "border-t pt-12 sm:pt-14")}
                  >
                    <h2
                      id={headingId}
                      className={cn(
                        "mb-7 font-heading",
                        "text-2xl font-semibold tracking-tight",
                        "sm:text-3xl"
                      )}
                    >
                      {group.year}
                    </h2>

                    <NewsTimeline items={group.items} highlightFirst={groupIndex === 0} />
                  </section>
                )
              })}
            </div>
          ) : (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <IconCalendarEvent />
                </EmptyMedia>

                <EmptyTitle>Quiet for now</EmptyTitle>

                <EmptyDescription>Nothing new to report — yet.</EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}

          {newsConfig.comment && <CommentSystem />}
        </PageShell.Content>
      </PageShell.Body>
    </PageShell.Root>
  )
}
