import * as React from "react"

import { IconArrowRight } from "@tabler/icons-react"

import { TextLink, type TextLinkProps } from "@/components/ui/my"
import { cn } from "@/lib/utils"

type HomeSectionRootProps = React.ComponentPropsWithoutRef<"section">

function HomeSectionRoot({ className, ...props }: HomeSectionRootProps) {
  return (
    <section
      {...props}
      data-slot="home-section"
      className={cn("min-w-0 border-t py-8", "sm:py-10", className)}
    />
  )
}

type HomeSectionHeaderProps = React.ComponentPropsWithoutRef<"header">

function HomeSectionHeader({ className, ...props }: HomeSectionHeaderProps) {
  return (
    <header
      {...props}
      data-slot="home-section-header"
      className={cn(
        "flex min-w-0 flex-col gap-4",
        "sm:flex-row sm:items-end sm:justify-between",
        "sm:gap-8",
        className
      )}
    />
  )
}

type HomeSectionHeadingProps = React.ComponentPropsWithoutRef<"div">

function HomeSectionHeading({ className, ...props }: HomeSectionHeadingProps) {
  return <div {...props} data-slot="home-section-heading" className={cn("min-w-0", className)} />
}

type HomeSectionTitleProps = React.ComponentPropsWithoutRef<"h2">

function HomeSectionTitle({ children, className, ...props }: HomeSectionTitleProps) {
  return (
    <h2
      {...props}
      data-slot="home-section-title"
      className={cn("font-heading text-2xl font-semibold tracking-tight", "sm:text-3xl", className)}
    >
      {children}
    </h2>
  )
}

type HomeSectionDescriptionProps = React.ComponentPropsWithoutRef<"p">

function HomeSectionDescription({ className, ...props }: HomeSectionDescriptionProps) {
  return (
    <p
      {...props}
      data-slot="home-section-description"
      className={cn("mt-2 max-w-xl text-sm leading-6", "text-muted-foreground", className)}
    />
  )
}

type HomeSectionActionProps = Omit<TextLinkProps, "children"> & {
  children: React.ReactNode
}

function HomeSectionAction({ children, className, ...props }: HomeSectionActionProps) {
  return (
    <TextLink
      {...props}
      data-slot="home-section-action"
      className={cn(
        "group/home-section-action inline-flex shrink-0 items-center gap-1.5",
        "text-sm font-medium text-muted-foreground",
        "hover:text-foreground",
        className
      )}
    >
      {children}

      <IconArrowRight
        aria-hidden="true"
        size={16}
        className={cn(
          "transition-transform",
          "group-hover/home-section-action:translate-x-0.5",
          "motion-reduce:transition-none"
        )}
      />
    </TextLink>
  )
}

type HomeSectionContentProps = React.ComponentPropsWithoutRef<"div">

function HomeSectionContent({ className, ...props }: HomeSectionContentProps) {
  return (
    <div
      {...props}
      data-slot="home-section-content"
      className={cn("mt-8 min-w-0 sm:mt-9", className)}
    />
  )
}

const HomeSection = {
  Root: HomeSectionRoot,
  Header: HomeSectionHeader,
  Heading: HomeSectionHeading,
  Title: HomeSectionTitle,
  Description: HomeSectionDescription,
  Action: HomeSectionAction,
  Content: HomeSectionContent,
}

export { HomeSection }

export type {
  HomeSectionRootProps,
  HomeSectionHeaderProps,
  HomeSectionHeadingProps,
  HomeSectionTitleProps,
  HomeSectionDescriptionProps,
  HomeSectionActionProps,
  HomeSectionContentProps,
}
