import * as React from "react"

import { PageSidebar } from "@/components/pages/basic/page-sidebar"
import { PostTocClient } from "@/components/pages/post/post-toc-client"
import { type Post } from "@/lib/content"
import { cn } from "@/lib/utils"

export type PostTocProps = Omit<React.ComponentPropsWithoutRef<"nav">, "children"> & {
  toc: Post["toc"]
  title?: React.ReactNode
  minDepth?: number
  maxDepth?: number
  showNumbering?: boolean
}

export function hasPostTocItems(toc: Post["toc"], minDepth = 2, maxDepth = 3): boolean {
  return toc.some((item) => item.depth >= minDepth && item.depth <= maxDepth)
}

export function PostToc({
  toc,
  title = "On this page",
  minDepth = 2,
  maxDepth = 3,
  showNumbering = false,
  className,
  ...props
}: PostTocProps) {
  const items = toc.filter((item) => item.depth >= minDepth && item.depth <= maxDepth)

  if (items.length === 0) {
    return null
  }

  return (
    <PageSidebar.Root
      aria-label="Table of contents"
      {...props}
      data-slot="post-toc"
      className={cn("max-h-[calc(100vh-7rem)] overflow-y-auto pr-2", className)}
    >
      <PageSidebar.Group>
        <PageSidebar.Title>{title}</PageSidebar.Title>

        <PageSidebar.Content>
          <PostTocClient items={items} showNumbering={showNumbering} />
        </PageSidebar.Content>
      </PageSidebar.Group>
    </PageSidebar.Root>
  )
}
