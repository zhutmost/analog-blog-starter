import * as React from "react"

import { GiscusComment } from "@/components/comment/giscus-comment"
import { siteConfig } from "@/lib/config"
import { cn } from "@/lib/utils"

export function CommentSystem({ className, ...props }: React.ComponentPropsWithoutRef<"section">) {
  switch (siteConfig.comment.provider) {
    case "giscus":
      return (
        <section
          {...props}
          aria-label={props["aria-label"] ?? "comments"}
          className={cn("mt-16 border-t pt-10", className)}
        >
          <GiscusComment {...siteConfig.comment} />
        </section>
      )
    default:
      return null
  }
}
