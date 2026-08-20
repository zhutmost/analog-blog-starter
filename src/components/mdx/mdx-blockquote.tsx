import * as React from "react"

import { cn } from "@/lib/utils"

export function MdxBlockquote({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"blockquote">) {
  return (
    <blockquote
      data-slot="mdx-blockquote"
      className={cn(
        "border-l-2 border-primary/40 pl-6 text-muted-foreground",
        "[&>*+*]:mt-4",
        "[&>*:first-child]:mt-0",
        "[&>*:last-child]:mb-0",
        "[&_strong]:text-foreground",
        "[&_blockquote]:border-primary/25",
        "[&_cite]:block",
        "[&_cite]:text-sm",
        "[&_cite]:font-normal",
        "[&_cite]:not-italic",
        className
      )}
      {...props}
    />
  )
}
