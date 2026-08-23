"use client"

import * as React from "react"

import { IconCheck, IconLink } from "@tabler/icons-react"

import { cn } from "@/lib/utils"

type HeadingAnchorProps = {
  id: string
}

export function HeadingAnchor({ id }: HeadingAnchorProps) {
  const [copied, setCopied] = React.useState(false)
  const timeoutRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  async function handleClick() {
    const url = new URL(window.location.href)
    url.hash = id

    try {
      await navigator.clipboard.writeText(url.toString())
      setCopied(true)

      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = window.setTimeout(() => {
        setCopied(false)
        timeoutRef.current = null
      }, 2000)
    } catch {
      setCopied(false)
    }
  }

  const label = copied ? "Link copied" : "Copy link to this section"

  return (
    <a
      href={`#${id}`}
      aria-label={label}
      title={label}
      data-slot="mdx-heading-anchor"
      onClick={handleClick}
      className={cn(
        "ml-1.5 inline-flex rounded-sm p-1 align-middle",
        "text-muted-foreground opacity-0 transition-[color,opacity]",
        "group-hover:opacity-100 hover:text-primary",
        "focus-visible:opacity-100 focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "[@media(hover:none)]:opacity-60",
        "motion-reduce:transition-none print:hidden"
      )}
    >
      {copied ? (
        <IconCheck aria-hidden="true" className="size-[0.8em]" />
      ) : (
        <IconLink aria-hidden="true" className="size-[0.8em]" />
      )}
    </a>
  )
}
