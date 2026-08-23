import * as React from "react"

import { VStack, type VStackProps } from "@/components/ui/layout"
import { cn } from "@/lib/utils"

const pageShellWidthClassNames = {
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
} as const

type PageShellWidth = keyof typeof pageShellWidthClassNames

type PageShellRootProps = Omit<React.ComponentPropsWithoutRef<"div">, "children"> & {
  children: React.ReactNode
  as?: "div" | "article"
  width?: PageShellWidth
}

function PageShellRoot({
  children,
  className,
  as = "div",
  width = "6xl",
  ...props
}: PageShellRootProps) {
  const Comp = as

  return (
    <Comp
      {...props}
      data-slot="page-shell"
      className={cn(
        "mx-auto flex w-full flex-1 flex-col",
        "gap-10 px-4 py-10",
        "sm:px-6 sm:py-14",
        "lg:gap-12 lg:px-8 lg:py-16",
        pageShellWidthClassNames[width],
        className
      )}
    >
      {children}
    </Comp>
  )
}

type PageShellTopProps = VStackProps

function PageShellTop({ gap = "lg", className, ...props }: PageShellTopProps) {
  return (
    <VStack gap={gap} {...props} data-slot="page-shell-top" className={cn("min-w-0", className)} />
  )
}

type PageShellBodyProps = React.ComponentPropsWithoutRef<"div"> & {
  asidePosition?: "left" | "right"
}

function PageShellBody({ asidePosition, className, ...props }: PageShellBodyProps) {
  return (
    <div
      {...props}
      data-slot="page-shell-body"
      className={cn(
        "min-w-0",
        asidePosition === "right" &&
          "grid gap-6 sm:gap-8 xl:grid-cols-[minmax(0,48rem)_16rem] xl:justify-between xl:gap-12",
        asidePosition === "left" &&
          "grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[18rem_minmax(0,48rem)] xl:justify-between",
        className
      )}
    />
  )
}

const contentWidthClassNames = {
  default: "",
  prose: "max-w-3xl",
  full: "max-w-none",
} as const

type PageShellContentProps = React.ComponentPropsWithoutRef<"div"> & {
  width?: keyof typeof contentWidthClassNames
}

function PageShellContent({ width = "default", className, ...props }: PageShellContentProps) {
  return (
    <div
      {...props}
      data-slot="page-shell-content"
      className={cn("min-w-0", contentWidthClassNames[width], className)}
    />
  )
}

type PageShellAsideProps = React.ComponentPropsWithoutRef<"aside"> & {
  sticky?: boolean
}

function PageShellAside({ sticky = false, className, ...props }: PageShellAsideProps) {
  return (
    <aside
      {...props}
      data-slot="page-shell-aside"
      className={cn("min-w-0", sticky && "lg:sticky lg:top-24 lg:self-start", className)}
    />
  )
}

export const PageShell = {
  Root: PageShellRoot,
  Top: PageShellTop,
  Body: PageShellBody,
  Content: PageShellContent,
  Aside: PageShellAside,
}

export type {
  PageShellRootProps,
  PageShellTopProps,
  PageShellBodyProps,
  PageShellContentProps,
  PageShellAsideProps,
}
