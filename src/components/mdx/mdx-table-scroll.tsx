"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type MdxTableScrollProps = React.ComponentPropsWithoutRef<"table">

type ScrollState = {
  hasOverflow: boolean
  canScrollLeft: boolean
  canScrollRight: boolean
}

const initialScrollState: ScrollState = {
  hasOverflow: false,
  canScrollLeft: false,
  canScrollRight: false,
}

export function MdxTableScroll({ className, ...props }: MdxTableScrollProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [scrollState, setScrollState] = React.useState(initialScrollState)

  const updateScrollState = React.useCallback(() => {
    const container = containerRef.current

    if (!container) {
      return
    }

    const hasOverflow = container.scrollWidth > container.clientWidth + 1
    const canScrollLeft = hasOverflow && container.scrollLeft > 1
    const canScrollRight =
      hasOverflow && container.scrollLeft + container.clientWidth < container.scrollWidth - 1

    setScrollState((current) => {
      if (
        current.hasOverflow === hasOverflow &&
        current.canScrollLeft === canScrollLeft &&
        current.canScrollRight === canScrollRight
      ) {
        return current
      }

      return { hasOverflow, canScrollLeft, canScrollRight }
    })
  }, [])

  React.useEffect(() => {
    const container = containerRef.current

    if (!container) {
      return undefined
    }

    updateScrollState()

    const resizeObserver = new ResizeObserver(updateScrollState)
    resizeObserver.observe(container)

    const table = container.querySelector("table")
    if (table) {
      resizeObserver.observe(table)
    }

    return () => resizeObserver.disconnect()
  }, [updateScrollState])

  return (
    <div data-slot="mdx-table-scroll" className="relative min-w-0">
      <div
        ref={containerRef}
        role={scrollState.hasOverflow ? "region" : undefined}
        aria-label={scrollState.hasOverflow ? "Scrollable table" : undefined}
        tabIndex={scrollState.hasOverflow ? 0 : undefined}
        onScroll={updateScrollState}
        className={cn(
          "w-full overflow-x-auto",
          "focus-visible:rounded-sm focus-visible:outline-none",
          "focus-visible:ring-2 focus-visible:ring-ring/50"
        )}
      >
        <table
          data-slot="mdx-table"
          className={cn("w-full caption-bottom text-sm", className)}
          {...props}
        />
      </div>

      <div
        aria-hidden="true"
        data-slot="mdx-table-scroll-start"
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 w-8",
          "bg-linear-to-r from-background to-transparent",
          "transition-opacity duration-200 motion-reduce:transition-none",
          scrollState.canScrollLeft ? "opacity-100" : "opacity-0"
        )}
      />

      <div
        aria-hidden="true"
        data-slot="mdx-table-scroll-end"
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 w-8",
          "bg-linear-to-l from-background to-transparent",
          "transition-opacity duration-200 motion-reduce:transition-none",
          scrollState.canScrollRight ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  )
}
