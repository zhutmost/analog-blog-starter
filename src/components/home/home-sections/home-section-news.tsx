import * as React from "react"

import { IconCalendarEvent } from "@tabler/icons-react"

import { HomeSection } from "@/components/home/home-section"
import { Timeline } from "@/components/mdx/timeline"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/shadcn/empty"
import { type NewsItem } from "@/lib/config"

export type HomeSectionNewsProps = Omit<React.ComponentPropsWithoutRef<"section">, "children"> & {
  items: readonly NewsItem[]
  title: string
  summary: string
  href: string | null
  actionLabel: string
}

export function HomeSectionNews({
  items,
  title,
  summary,
  href,
  actionLabel,
  className,
  ...props
}: HomeSectionNewsProps) {
  return (
    <HomeSection.Root
      {...props}
      aria-labelledby="home-news-title"
      data-slot="home-news"
      className={className}
    >
      <HomeSection.Header>
        <HomeSection.Heading>
          <HomeSection.Title id="home-news-title">{title}</HomeSection.Title>

          <HomeSection.Description>{summary}</HomeSection.Description>
        </HomeSection.Heading>

        {href && <HomeSection.Action href={href}>{actionLabel}</HomeSection.Action>}
      </HomeSection.Header>

      <HomeSection.Content>
        {items.length > 0 ? (
          <Timeline className="py-0 sm:py-0" items={items} />
        ) : (
          <Empty className="border">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <IconCalendarEvent aria-hidden="true" />
              </EmptyMedia>

              <EmptyTitle>Quiet for now</EmptyTitle>

              <EmptyDescription>Nothing new to report — yet.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </HomeSection.Content>
    </HomeSection.Root>
  )
}
