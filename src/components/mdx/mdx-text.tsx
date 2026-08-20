import React from "react"

import { cn } from "@/lib/utils"

export function MdxParagraph({ className, ...props }: React.ComponentPropsWithoutRef<"p">) {
  return (
    <p data-slot="mdx-paragraph" className={cn("leading-7", "text-pretty", className)} {...props} />
  )
}

export function MdxStrong({ className, ...props }: React.ComponentPropsWithoutRef<"strong">) {
  return (
    <strong
      data-slot="mdx-strong"
      className={cn("font-semibold text-foreground", className)}
      {...props}
    />
  )
}

export function MdxEm({ className, ...props }: React.ComponentPropsWithoutRef<"em">) {
  return <em data-slot="mdx-em" className={cn("italic", className)} {...props} />
}

export function MdxDel({ className, ...props }: React.ComponentPropsWithoutRef<"del">) {
  return (
    <del
      data-slot="mdx-del"
      className={cn("line-through decoration-foreground/50", className)}
      {...props}
    />
  )
}
