import * as React from "react"

import { TextLink, textLinkVariants } from "@/components/ui/my"
import { cn } from "@/lib/utils"

type MdxLinkProps = React.ComponentPropsWithoutRef<"a"> & {
  "data-footnote-ref"?: string | boolean
  "data-footnote-backref"?: string | boolean
}

export function MdxLink({
  href,
  className,
  children,
  "data-footnote-ref": footnoteRef,
  "data-footnote-backref": footnoteBackref,
  ...props
}: MdxLinkProps) {
  if (footnoteRef !== undefined) {
    return (
      <a
        href={href}
        data-footnote-ref={footnoteRef}
        className={cn(
          "mx-0.5 inline-flex min-w-4 items-center justify-center rounded-sm px-1",
          "bg-primary/10 text-[0.6875rem] leading-4 font-semibold text-primary",
          "tabular-nums no-underline",
          "transition-colors hover:bg-primary/20",
          "focus-visible:outline-2 focus-visible:outline-offset-2",
          className
        )}
        {...props}
      >
        {children}
      </a>
    )
  }

  if (footnoteBackref !== undefined) {
    return (
      <a
        href={href}
        data-footnote-backref={footnoteBackref}
        className={cn(
          "ml-1 inline-flex min-w-5 items-center justify-center rounded-sm px-1",
          "text-xs leading-5 text-muted-foreground no-underline",
          "transition-colors hover:bg-muted hover:text-foreground",
          "focus-visible:outline-2 focus-visible:outline-offset-2",
          className
        )}
        {...props}
      >
        {children}
      </a>
    )
  }

  const proseLinkClassName = cn("font-medium text-primary", "[overflow-wrap:anywhere]", className)

  // Preserve support for malformed or manually constructed <a> elements
  // without weakening TextLink's required href type.
  if (!href) {
    return (
      <a className={cn(textLinkVariants({ variant: "underline" }), proseLinkClassName)} {...props}>
        {children}
      </a>
    )
  }

  return (
    <TextLink href={href} variant="underline" className={proseLinkClassName} {...props}>
      {children}
    </TextLink>
  )
}
