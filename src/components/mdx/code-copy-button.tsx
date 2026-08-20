"use client"

import * as React from "react"

import { IconCheck, IconCopy } from "@tabler/icons-react"

import { Button } from "@/components/ui/shadcn/button"

type CodeCopyButtonProps = {
  value: string
}

export function CodeCopyButton({ value }: CodeCopyButtonProps) {
  const [copied, setCopied] = React.useState(false)
  const timeoutRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value)
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

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : "Copy code"}
      className="shrink-0 text-muted-foreground hover:text-foreground"
    >
      {copied ? <IconCheck aria-hidden /> : <IconCopy aria-hidden />}
    </Button>
  )
}
