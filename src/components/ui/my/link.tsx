import NextLink from "next/link"
import * as React from "react"

import { cva, type VariantProps } from "class-variance-authority"

import { classifyHref } from "@/lib/href"
import { cn } from "@/lib/utils"

export type AutoLinkProps = Omit<React.ComponentPropsWithoutRef<"a">, "href"> & {
  href: string
}

export const AutoLink = React.forwardRef<HTMLAnchorElement, AutoLinkProps>(function AutoLink(
  { href, target, rel, children, ...props },
  ref
) {
  const kind = classifyHref(href)

  if (kind === "invalid") {
    throw new Error(`Invalid href "${href}".`)
  }

  const resolvedTarget = target ?? (kind === "external" ? "_blank" : undefined)

  const resolvedRel = rel ?? (resolvedTarget === "_blank" ? "noopener noreferrer" : undefined)

  if (kind === "internal") {
    return (
      <NextLink ref={ref} href={href} target={resolvedTarget} rel={resolvedRel} {...props}>
        {children}
      </NextLink>
    )
  }

  return (
    <a ref={ref} href={href} target={resolvedTarget} rel={resolvedRel} {...props}>
      {children}
    </a>
  )
})

export const textLinkVariants = cva(
  [
    "underline decoration-[1.5px] underline-offset-[0.2em]",
    "transition-[color,text-decoration-color] duration-200 outline-none",
    "focus-visible:rounded-xs focus-visible:ring-[3px]",
    "focus-visible:ring-ring/50",
    "motion-reduce:transition-none",
  ],
  {
    variants: {
      variant: {
        plain: [
          "decoration-transparent",
          "hover:decoration-muted-foreground/65",
          "focus-visible:decoration-muted-foreground/70",
        ],
        underline: [
          "decoration-muted-foreground/45",
          "hover:decoration-muted-foreground/75",
          "focus-visible:decoration-muted-foreground/75",
        ],
      },
    },
    defaultVariants: {
      variant: "plain",
    },
  }
)

export type TextLinkProps = AutoLinkProps & VariantProps<typeof textLinkVariants>

export const TextLink = React.forwardRef<HTMLAnchorElement, TextLinkProps>(function TextLink(
  { variant = "plain", className, ...props },
  ref
) {
  return (
    <AutoLink
      ref={ref}
      data-slot="text-link"
      {...props}
      className={cn(textLinkVariants({ variant }), className)}
    />
  )
})
