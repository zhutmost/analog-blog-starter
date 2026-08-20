import NextLink from "next/link"
import * as React from "react"

import { IconArrowRight, IconChevronDown } from "@tabler/icons-react"

import { PageSidebar } from "@/components/pages/basic/page-sidebar"
import { TwemojifyText } from "@/components/ui/my"
import { categories, tags, type TaxonCount } from "@/lib/content"
import { cn } from "@/lib/utils"

const POPULAR_TAG_LIMIT = 8

type ArchiveSidebarActiveEntry = {
  kind: "category" | "tag"
  slug: string
}

export type ArchiveSidebarProps = Omit<React.ComponentPropsWithoutRef<"nav">, "children"> & {
  activeEntry?: ArchiveSidebarActiveEntry
}

export function ArchiveSidebar({ activeEntry, className, ...props }: ArchiveSidebarProps) {
  const popularTags = tags.slice(0, POPULAR_TAG_LIMIT)

  const hasCategories = categories.length > 0
  const hasPopularTags = popularTags.length > 0
  const hasBothTaxonomies = hasCategories && hasPopularTags

  return (
    <PageSidebar.Root
      aria-label="Browse the archive"
      {...props}
      data-slot="archive-sidebar"
      className={cn(
        "grid gap-y-8",
        hasBothTaxonomies && "sm:grid-cols-2 sm:gap-x-10",
        "xl:block",
        className
      )}
    >
      {hasCategories && (
        <PageSidebar.Group>
          <PageSidebar.Title>Categories</PageSidebar.Title>

          <PageSidebar.Content>
            <ul className="space-y-1">
              {categories.map((category) => (
                <li key={category.slug}>
                  <ArchiveTaxonomyLink
                    taxon={category}
                    href={`/posts/by-category/${category.slug}`}
                    kind="category"
                    isActive={
                      activeEntry?.kind === "category" && activeEntry.slug === category.slug
                    }
                  />
                </li>
              ))}
            </ul>
          </PageSidebar.Content>
        </PageSidebar.Group>
      )}

      {hasPopularTags && (
        <PageSidebar.Group className={cn(hasCategories && "xl:mt-8")}>
          <PageSidebar.Title>Popular tags</PageSidebar.Title>

          <PageSidebar.Content>
            <ul className="space-y-1">
              {popularTags.map((tag) => (
                <li key={tag.slug}>
                  <ArchiveTaxonomyLink
                    taxon={tag}
                    href={`/posts/by-tag/${tag.slug}`}
                    kind="tag"
                    isActive={activeEntry?.kind === "tag" && activeEntry.slug === tag.slug}
                  />
                </li>
              ))}

              <li>
                <NextLink
                  href="/posts/tags"
                  className={cn(
                    "group/archive-all-tags -ml-px",
                    "flex min-w-0 items-center gap-1.5",
                    "border-l-2 border-transparent py-1 pl-4",
                    "text-muted-foreground underline-offset-4",
                    "transition-colors",
                    "hover:text-foreground",
                    "focus-visible:rounded-sm",
                    "focus-visible:outline-none",
                    "focus-visible:ring-[3px]",
                    "focus-visible:ring-ring/50"
                  )}
                >
                  <span
                    className={cn(
                      "underline decoration-transparent decoration-2 underline-offset-4",
                      "transition-[text-decoration-color] duration-200",
                      "group-hover/archive-all-tags:decoration-muted-foreground/65"
                    )}
                  >
                    All tags
                  </span>

                  <IconArrowRight
                    aria-hidden="true"
                    size={15}
                    className={cn(
                      "ml-auto shrink-0 transition-transform",
                      "group-hover/archive-all-tags:translate-x-0.5",
                      "motion-reduce:transition-none"
                    )}
                  />
                </NextLink>
              </li>
            </ul>
          </PageSidebar.Content>
        </PageSidebar.Group>
      )}
    </PageSidebar.Root>
  )
}

export function MobileArchiveSidebar({ activeEntry, className, ...props }: ArchiveSidebarProps) {
  const activeTaxon =
    activeEntry?.kind === "category"
      ? categories.find((category) => category.slug === activeEntry.slug)
      : activeEntry?.kind === "tag"
        ? tags.find((tag) => tag.slug === activeEntry.slug)
        : undefined

  return (
    <details data-slot="mobile-archive-sidebar" className="group border-y xl:hidden">
      <summary
        className={cn(
          "flex cursor-pointer list-none items-center gap-3 py-3",
          "text-sm font-medium text-foreground",
          "outline-none",
          "focus-visible:rounded-sm focus-visible:ring-[3px] focus-visible:ring-ring/50",
          "[&::-webkit-details-marker]:hidden"
        )}
      >
        <span>Categories & tags</span>

        {activeTaxon && (
          <span className="ml-auto min-w-0 truncate text-xs font-normal text-muted-foreground">
            {activeEntry?.kind === "tag" && "# "}
            <TwemojifyText text={activeTaxon.name} />
          </span>
        )}

        <IconChevronDown
          aria-hidden="true"
          className={cn(
            "size-4 shrink-0 text-muted-foreground",
            !activeTaxon && "ml-auto",
            "transition-transform group-open:rotate-180",
            "motion-reduce:transition-none"
          )}
        />
      </summary>

      <ArchiveSidebar {...props} activeEntry={activeEntry} className={cn("pt-4 pb-5", className)} />
    </details>
  )
}

type ArchiveTaxonomyLinkProps = {
  taxon: TaxonCount
  href: string
  kind: "category" | "tag"
  isActive?: boolean
}

function ArchiveTaxonomyLink({ taxon, href, kind, isActive = false }: ArchiveTaxonomyLinkProps) {
  return (
    <NextLink
      href={href}
      title={`${taxon.name} · ${formatArticleCount(taxon.count)}`}
      aria-label={`${taxon.name}: ${formatArticleCount(taxon.count)}`}
      aria-current={isActive ? "page" : undefined}
      data-active={isActive ? "" : undefined}
      className={cn(
        "group/archive-taxon -ml-px",
        "flex min-w-0 items-baseline gap-3",
        "border-l-2 py-1 pl-4",
        "underline-offset-4 transition-colors",
        "hover:text-foreground",
        "focus-visible:rounded-sm",
        "focus-visible:outline-none",
        "focus-visible:ring-[3px]",
        "focus-visible:ring-ring/50",
        isActive
          ? "border-primary font-medium text-foreground"
          : "border-transparent text-muted-foreground"
      )}
    >
      <span className="flex min-w-0 flex-1 items-baseline">
        {kind === "tag" && (
          <span
            aria-hidden="true"
            className={cn(
              "mr-0.5 shrink-0 transition-colors",
              isActive
                ? "text-primary"
                : ["text-primary/75", "group-hover/archive-taxon:text-primary"]
            )}
          >
            #
          </span>
        )}

        <span
          className={cn(
            "truncate underline decoration-transparent decoration-2 underline-offset-4",
            "transition-[text-decoration-color] duration-200",
            !isActive && "group-hover/archive-taxon:decoration-muted-foreground/65"
          )}
        >
          <TwemojifyText text={taxon.name} />
        </span>
      </span>

      <span
        aria-hidden="true"
        className={cn(
          "shrink-0 font-mono text-[0.6875rem] tabular-nums",
          "transition-colors",
          isActive
            ? "text-muted-foreground/80"
            : ["text-muted-foreground/50", "group-hover/archive-taxon:text-muted-foreground"]
        )}
      >
        {taxon.count}
      </span>
    </NextLink>
  )
}

function formatArticleCount(count: number): string {
  return `${count} ${count === 1 ? "article" : "articles"}`
}
