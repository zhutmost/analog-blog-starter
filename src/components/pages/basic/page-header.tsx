import * as React from "react"

import { VStack } from "@/components/ui/layout"
import { TwemojifyText } from "@/components/ui/my"
import { cn } from "@/lib/utils"

type PageHeaderProps = {
  title: string
  summary?: string
  className?: string
}

export function PageHeader({ title, summary, className }: PageHeaderProps) {
  return (
    <VStack as="header" data-slot="page-header" className={cn(className)}>
      <hgroup className="space-y-3">
        <h1
          data-slot="page-header-title"
          className="font-heading text-4xl leading-tight font-semibold tracking-tight text-balance wrap-break-word sm:text-5xl"
        >
          <TwemojifyText text={title} />
        </h1>

        {summary && (
          <p
            data-slot="page-header-summary"
            className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg"
          >
            <TwemojifyText text={summary} />
          </p>
        )}
      </hgroup>
    </VStack>
  )
}
