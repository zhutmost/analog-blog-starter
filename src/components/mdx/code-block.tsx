"use client"

import * as React from "react"

import { IconChevronDown, IconChevronUp } from "@tabler/icons-react"

import { CodeCopyButton } from "@/components/mdx/code-copy-button"
import { HStack } from "@/components/ui/layout"
import { IconButton } from "@/components/ui/my"
import { cn } from "@/lib/utils"

const COLLAPSIBLE_LINE_COUNT = 15

type CodeBlockProps = {
  title?: string
  languageName: string
  code: string
  lineCount: number
  children: React.ReactNode
}

export function CodeBlock({ title, languageName, code, lineCount, children }: CodeBlockProps) {
  const canCollapse = lineCount > COLLAPSIBLE_LINE_COUNT

  const [isExpanded, setIsExpanded] = React.useState(!canCollapse)

  const bodyId = React.useId()

  const isCollapsed = canCollapse && !isExpanded

  return (
    <>
      <div
        data-slot="mdx-code-header"
        className="flex min-h-10 items-center gap-2 border-b bg-muted/40 px-3"
      >
        <span
          className={cn(
            "rounded-sm border bg-background/60",
            "px-1.5 py-0.5 font-mono",
            "text-[0.625rem] leading-none",
            "tracking-wide text-muted-foreground uppercase"
          )}
        >
          {languageName}
        </span>

        {title && (
          <span
            className="min-w-0 truncate font-mono text-xs font-medium text-foreground"
            title={title}
          >
            {title}
          </span>
        )}

        <HStack gap="sm" className="ml-auto shrink-0 items-center">
          {canCollapse && (
            <IconButton
              label={isExpanded ? "Collapse" : "Expand"}
              tooltipCloseOnClick={false}
              aria-controls={bodyId}
              aria-expanded={isExpanded}
              onClick={() => setIsExpanded((expanded) => !expanded)}
              className="text-muted-foreground hover:text-foreground print:hidden"
            >
              {isExpanded ? <IconChevronUp aria-hidden /> : <IconChevronDown aria-hidden />}
            </IconButton>
          )}

          <CodeCopyButton value={code} />
        </HStack>
      </div>

      <div
        id={bodyId}
        data-slot="mdx-code-body"
        data-collapsed={isCollapsed ? "" : undefined}
        className="relative"
      >
        {children}

        {isCollapsed && (
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-x-0 bottom-0 h-12",
              "bg-linear-to-t from-card to-transparent",
              "print:hidden"
            )}
          />
        )}
      </div>
    </>
  )
}
