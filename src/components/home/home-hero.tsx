import * as React from "react"

import { IconArrowRight, IconArrowUpRight } from "@tabler/icons-react"

import { MdxProse } from "@/components/mdx/mdx-prose"
import { TextLink, TwemojifyText } from "@/components/ui/my"
import { classifyHref } from "@/lib/href"
import { cn } from "@/lib/utils"

export type HomeHeroAction = {
  label: string
  href: string
  primary?: boolean
}

export type HomeHeroProps = Omit<React.ComponentPropsWithoutRef<"header">, "children"> & {
  greeting?: string
  name: string
  introduction?: string
  actions?: HomeHeroAction[]
}

export function HomeHero({
  greeting = "Hi, I’m",
  name,
  introduction,
  actions,
  className,
  ...props
}: HomeHeroProps) {
  return (
    <header
      {...props}
      aria-labelledby="home-hero-title"
      data-slot="home-hero"
      className={cn("relative min-w-0 py-2", "sm:py-4", "lg:py-6", className)}
    >
      <h1
        id="home-hero-title"
        data-slot="home-hero-title"
        className={cn(
          "font-heading font-extrabold",
          "text-5xl leading-[1.02] tracking-tighter",
          "text-balance wrap-break-word",
          "sm:text-6xl",
          "lg:text-7xl"
        )}
      >
        <span className="text-foreground/90">{greeting}</span>{" "}
        <span
          className={cn(
            "whitespace-nowrap",
            "bg-linear-to-r from-primary via-primary to-sky-700 dark:to-sky-400",
            "bg-clip-text text-transparent",
            "forced-colors:bg-none forced-colors:text-[CanvasText]",
            "mr-6"
          )}
        >
          {name}
        </span>
        <TwemojifyText text={"👋"} size="2x" />
      </h1>

      {introduction && (
        <div data-slot="home-hero-intro" className="mt-8 sm:mt-10">
          <MdxProse
            code={introduction}
            className="max-w-3xl text-base text-muted-foreground sm:text-lg"
          />
        </div>
      )}

      {actions && actions.length > 0 && (
        <nav aria-label="Homepage links" data-slot="home-hero-actions" className="mt-8 sm:mt-10">
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-3">
            {actions.map((action) => {
              const opensNewTab = classifyHref(action.href) === "external"

              const Icon = opensNewTab ? IconArrowUpRight : IconArrowRight

              return (
                <li key={action.href}>
                  <TextLink
                    href={action.href}
                    variant={action.primary ? "underline" : "plain"}
                    className={cn(
                      "group/home-hero-link inline-flex items-center gap-1.5 py-1",
                      "text-sm font-medium tracking-tight",
                      action.primary
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {action.label}

                    <Icon
                      aria-hidden="true"
                      size={16}
                      className={cn(
                        "transition-transform duration-300",
                        opensNewTab
                          ? "group-hover/home-hero-link:translate-x-0.5 group-hover/home-hero-link:-translate-y-0.5"
                          : "group-hover/home-hero-link:translate-x-0.5",
                        "motion-reduce:transition-none"
                      )}
                    />

                    {opensNewTab && <span className="sr-only"> (opens in a new tab)</span>}
                  </TextLink>
                </li>
              )
            })}
          </ul>
        </nav>
      )}
    </header>
  )
}
