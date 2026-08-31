import * as React from "react"

import { IconWritingSign } from "@tabler/icons-react"

import { HomeSection } from "@/components/home/home-section"
import { PostCard } from "@/components/pages/post/post-card"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/shadcn/empty"
import { type PostMeta } from "@/lib/content"

export type HomeSectionArticlesProps = Omit<
  React.ComponentPropsWithoutRef<"section">,
  "children"
> & {
  posts: readonly PostMeta[]
  title: string
  summary: string
  href: string | null
  actionLabel: string
}

export function HomeSectionArticles({
  posts,
  title,
  summary,
  href,
  actionLabel,
  className,
  ...props
}: HomeSectionArticlesProps) {
  return (
    <HomeSection.Root
      {...props}
      aria-labelledby="home-writing-title"
      data-slot="home-writing"
      className={className}
    >
      <HomeSection.Header>
        <HomeSection.Heading>
          <HomeSection.Title id="home-writing-title">{title}</HomeSection.Title>

          <HomeSection.Description>{summary}</HomeSection.Description>
        </HomeSection.Heading>

        {href && <HomeSection.Action href={href}>{actionLabel}</HomeSection.Action>}
      </HomeSection.Header>

      <HomeSection.Content>
        {posts.length > 0 ? (
          <div data-slot="home-writing-list" className="grid min-w-0 gap-12 lg:gap-14">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} titleAs="h3" />
            ))}
          </div>
        ) : (
          <Empty className="border">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <IconWritingSign aria-hidden="true" />
              </EmptyMedia>

              <EmptyTitle>Nothing on the desk yet</EmptyTitle>

              <EmptyDescription>
                New notes and articles will find their way here soon.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </HomeSection.Content>
    </HomeSection.Root>
  )
}
