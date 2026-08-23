"use client"

import * as React from "react"

import { IconChevronDown, IconChevronUp } from "@tabler/icons-react"

import { CodeCopyButton } from "@/components/mdx/code-copy-button"
import { Button } from "@/components/ui/shadcn/button"
import { cn } from "@/lib/utils"

const COLLAPSED_LINE_COUNT = 10

type CodeBlockContentProps = {
  title?: string
  languageName: string
  code: string
  lineCount: number
  children: React.ReactNode
}

export function CodeBlockContent({
  title,
  languageName,
  code,
  lineCount,
  children,
}: CodeBlockContentProps) {
  const canCollapse = lineCount > COLLAPSED_LINE_COUNT
  const [isExpanded, setIsExpanded] = React.useState(!canCollapse)
  const bodyId = React.useId()

  const toggleLabel = isExpanded
    ? "Collapse code block"
    : `Show ${lineCount - COLLAPSED_LINE_COUNT} more ${
        lineCount - COLLAPSED_LINE_COUNT === 1 ? "line" : "lines"
      }`

  return (
    <>
      <div
        data-slot="mdx-code-header"
        className={cn("flex min-h-10 items-center gap-2", "border-b bg-muted/40 px-3")}
      >
        <span
          className={cn("min-w-0 flex-1 truncate", "font-mono text-xs font-medium text-foreground")}
          title={title}
        >
          {title ?? languageName}
        </span>

        {title && (
          <span
            className={cn(
              "shrink-0 rounded-sm border bg-background/60",
              "px-1.5 py-0.5 font-mono",
              "text-[0.625rem] leading-none",
              "tracking-wide text-muted-foreground uppercase"
            )}
          >
            {languageName}
          </span>
        )}

        {canCollapse && (
          <Button
            type="button"
            variant="ghost"
            size="xs"
            aria-controls={bodyId}
            aria-expanded={isExpanded}
            aria-label={toggleLabel}
            title={toggleLabel}
            onClick={() => setIsExpanded((expanded) => !expanded)}
            className="shrink-0 text-muted-foreground hover:text-foreground print:hidden"
          >
            {isExpanded ? <IconChevronUp aria-hidden /> : <IconChevronDown aria-hidden />}
            <span className="hidden sm:inline">{isExpanded ? "Collapse" : "Expand"}</span>
          </Button>
        )}

        <CodeCopyButton value={code} />
      </div>

      <div
        id={bodyId}
        data-slot="mdx-code-body"
        data-collapsed={canCollapse && !isExpanded ? "" : undefined}
        className={cn(
          "relative",
          canCollapse &&
            !isExpanded &&
            "max-h-[17rem] overflow-hidden print:max-h-none print:overflow-visible"
        )}
      >
        {children}

        {canCollapse && !isExpanded && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-card to-transparent print:hidden"
          />
        )}
      </div>
    </>
  )
}
