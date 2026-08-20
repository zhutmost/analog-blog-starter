import NextLink from "next/link"
import * as React from "react"

import { TwemojifyText } from "@/components/ui/my"
import { Badge } from "@/components/ui/shadcn/badge"
import { type PostMeta } from "@/lib/content"
import { cn } from "@/lib/utils"

type PostTag = PostMeta["tags"][number]

export type PostTagListProps = Omit<React.ComponentPropsWithoutRef<"ul">, "children"> & {
  tags: readonly PostTag[]
  limit?: number
  showOverflowCount?: boolean
}

export function PostTagList({
  tags,
  limit,
  showOverflowCount = false,
  className,
  ...props
}: PostTagListProps) {
  if (tags.length === 0) {
    return null
  }

  const visibleTags = limit === undefined ? tags : tags.slice(0, limit)
  const hiddenTagCount = tags.length - visibleTags.length

  return (
    <ul
      aria-label="Post tags"
      {...props}
      data-slot="post-tag-list"
      className={cn("flex min-w-0 flex-wrap items-center", className)}
    >
      {visibleTags.map((tag) => (
        <li key={tag.slug} className="min-w-0">
          <Badge
            variant="ghost"
            render={<NextLink href={`/posts/by-tag/${tag.slug}`} aria-label={`Tag: ${tag.name}`} />}
            className={cn(
              "max-w-40 justify-start text-foreground/70",
              "hover:bg-primary/5 hover:text-foreground",
              "sm:max-w-56"
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "mr-0.5 shrink-0 text-primary/75 transition-colors",
                "group-hover/badge:text-primary"
              )}
            >
              #
            </span>

            <span className="min-w-0 truncate">
              <TwemojifyText text={tag.name} />
            </span>
          </Badge>
        </li>
      ))}

      {showOverflowCount && hiddenTagCount > 0 && (
        <li>
          <Badge
            variant="ghost"
            aria-label={`${hiddenTagCount} more tags`}
            className="pointer-events-none text-muted-foreground/60"
          >
            +{hiddenTagCount}
          </Badge>
        </li>
      )}
    </ul>
  )
}
