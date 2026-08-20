"use client"

import * as React from "react"

import { TwemojifyText } from "@/components/ui/my"
import { type Post } from "@/lib/content"
import { cn } from "@/lib/utils"

type TocItem = Post["toc"][number]

type PostTocClientProps = {
  items: TocItem[]
  showNumbering?: boolean
  activeOffset?: number
}

const tocIndentClassNames = {
  1: "pl-0",
  2: "pl-0",
  3: "pl-3",
  4: "pl-6",
  5: "pl-9",
  6: "pl-12",
} satisfies Record<number, string>

export function PostTocClient({
  items,
  showNumbering = false,
  activeOffset = 96,
}: PostTocClientProps) {
  const headingIds = React.useMemo(
    () => items.map((item) => getHeadingIdFromHref(item.href)).filter(Boolean),
    [items]
  )

  const [activeId, setActiveId] = React.useState<string | undefined>()

  React.useEffect(() => {
    if (headingIds.length === 0) {
      return undefined
    }

    let frame = 0

    function updateActiveId() {
      cancelAnimationFrame(frame)

      frame = requestAnimationFrame(() => {
        let currentId: string | undefined

        for (const id of headingIds) {
          const element = id ? document.getElementById(id) : null

          if (!element) {
            continue
          }

          const top = element.getBoundingClientRect().top

          if (top <= activeOffset) {
            currentId = id
          } else {
            break
          }
        }

        setActiveId(currentId)
      })
    }

    updateActiveId()

    window.addEventListener("scroll", updateActiveId, { passive: true })
    window.addEventListener("resize", updateActiveId)
    window.addEventListener("hashchange", updateActiveId)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", updateActiveId)
      window.removeEventListener("resize", updateActiveId)
      window.removeEventListener("hashchange", updateActiveId)
    }
  }, [activeOffset, headingIds])

  return (
    <ol data-slot="post-toc-list" className="space-y-1">
      {items.map((item) => {
        const id = getHeadingIdFromHref(item.href)
        const isActive = id === activeId

        return (
          <li
            key={item.href}
            data-slot="post-toc-item"
            data-depth={item.depth}
            data-active={isActive ? "" : undefined}
            className="min-w-0"
          >
            <a
              href={item.href}
              aria-current={isActive ? "location" : undefined}
              data-slot="post-toc-link"
              className={cn(
                "group/toc-link -ml-px block min-w-0",
                "border-l-2 border-transparent py-1 pl-4",
                "text-muted-foreground transition-colors",
                "hover:text-foreground",
                "focus-visible:rounded-sm focus-visible:outline-none",
                "focus-visible:ring-[3px] focus-visible:ring-ring/50",
                isActive && "border-primary font-medium text-foreground"
              )}
            >
              <span className={cn("line-clamp-2 block", tocIndentClassNames[item.depth])}>
                {showNumbering && item.numbering.length > 0 && (
                  <span className="mr-1 text-muted-foreground/70 tabular-nums">
                    {item.numbering.join(".")}.
                  </span>
                )}

                <span
                  className={cn(
                    "underline decoration-transparent decoration-2 underline-offset-4",
                    "transition-[text-decoration-color] duration-200",
                    !isActive && "group-hover/toc-link:decoration-muted-foreground/65"
                  )}
                >
                  <TwemojifyText text={item.value} />
                </span>
              </span>
            </a>
          </li>
        )
      })}
    </ol>
  )
}

/**
 * Converts a table-of-contents hash href to the corresponding heading id.
 *
 * `remark-flexible-toc` emits local hash links such as `#section-title`, while
 * `document.getElementById()` expects the raw id without the leading `#`. Decoding keeps the lookup
 * correct for non-ASCII or URL-escaped heading ids.
 */
function getHeadingIdFromHref(href: string): string {
  const id = href.slice(1)
  return decodeURIComponent(id)
}
