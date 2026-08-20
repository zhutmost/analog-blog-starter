"use client"

import NextLink from "next/link"
import * as React from "react"

import { IconSearch } from "@tabler/icons-react"

import { TwemojifyText } from "@/components/ui/my"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/shadcn/empty"
import { Input } from "@/components/ui/shadcn/input"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/shadcn/toggle-group"
import { type TaxonCount } from "@/lib/content"
import { cn } from "@/lib/utils"

type TagSortMode = "count" | "name"

export type TagIndexProps = {
  tags: readonly TaxonCount[]
}

export function TagIndex({ tags }: TagIndexProps) {
  const searchInputId = React.useId()
  const [query, setQuery] = React.useState("")
  const [sortMode, setSortMode] = React.useState<TagSortMode>("count")

  const normalizedQuery = query.trim().toLocaleLowerCase()

  const filteredTags = normalizedQuery
    ? tags.filter((tag) => tag.name.toLocaleLowerCase().includes(normalizedQuery))
    : tags

  const visibleTags =
    sortMode === "name"
      ? filteredTags.toSorted((a, b) => a.name.localeCompare(b.name))
      : filteredTags

  const alphabeticalGroups = sortMode === "name" ? groupTagsAlphabetically(visibleTags) : []

  return (
    <div data-slot="tag-index">
      <TagIndexToolbar
        searchInputId={searchInputId}
        query={query}
        onQueryChange={setQuery}
        sortMode={sortMode}
        onSortModeChange={setSortMode}
        visibleCount={visibleTags.length}
        totalCount={tags.length}
      />

      {visibleTags.length > 0 ? (
        sortMode === "count" ? (
          <MostUsedTags tags={visibleTags} />
        ) : (
          <AlphabeticalTags groups={alphabeticalGroups} />
        )
      ) : (
        <Empty className="py-16">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <IconSearch />
            </EmptyMedia>

            <EmptyTitle>No tags found</EmptyTitle>

            <EmptyDescription>Try searching with another name or keyword.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
    </div>
  )
}

type TagIndexToolbarProps = {
  searchInputId: string
  query: string
  onQueryChange: (query: string) => void
  sortMode: TagSortMode
  onSortModeChange: (mode: TagSortMode) => void
  visibleCount: number
  totalCount: number
}

function TagIndexToolbar({
  searchInputId,
  query,
  onQueryChange,
  sortMode,
  onSortModeChange,
  visibleCount,
  totalCount,
}: TagIndexToolbarProps) {
  return (
    <div
      data-slot="tag-index-controls"
      className={cn("mb-5 flex min-w-0 flex-col gap-3", "sm:flex-row sm:items-end sm:gap-6")}
    >
      <div className="relative min-w-0 flex-1 sm:max-w-sm">
        <label htmlFor={searchInputId} className="sr-only">
          Search tags
        </label>

        <IconSearch
          aria-hidden
          className={cn(
            "pointer-events-none absolute bottom-2.5 left-0 size-3.5",
            "text-muted-foreground/65"
          )}
        />

        <Input
          id={searchInputId}
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search tags..."
          autoComplete="off"
          className={cn(
            "h-9 rounded-none border-0 border-b",
            "bg-transparent px-0 pl-6 shadow-none",
            "text-sm",
            "focus-visible:border-primary",
            "focus-visible:ring-0"
          )}
        />
      </div>

      <div className="flex min-w-0 items-center justify-between gap-4 sm:flex-1">
        <ToggleGroup
          value={[sortMode]}
          onValueChange={(value) => {
            const nextMode = value[0]

            // Keep exactly one sorting mode active.
            if (nextMode === "count" || nextMode === "name") {
              onSortModeChange(nextMode)
            }
          }}
          size="sm"
          spacing={1}
          aria-label="Sort tags"
          data-slot="tag-index-sort"
          className="gap-1"
        >
          <ToggleGroupItem
            value="count"
            className={cn(
              "relative rounded-sm bg-transparent px-2",
              "text-muted-foreground shadow-none",
              "hover:bg-transparent hover:text-foreground",
              "aria-pressed:bg-transparent",
              "aria-pressed:text-foreground",
              "after:absolute after:inset-x-2 after:bottom-0",
              "after:h-px after:origin-center after:scale-x-0",
              "after:bg-primary after:transition-transform",
              "aria-pressed:after:scale-x-100"
            )}
          >
            Most used
          </ToggleGroupItem>

          <ToggleGroupItem
            value="name"
            className={cn(
              "relative rounded-sm bg-transparent px-2",
              "text-muted-foreground shadow-none",
              "hover:bg-transparent hover:text-foreground",
              "aria-pressed:bg-transparent",
              "aria-pressed:text-foreground",
              "after:absolute after:inset-x-2 after:bottom-0",
              "after:h-px after:origin-center after:scale-x-0",
              "after:bg-primary after:transition-transform",
              "aria-pressed:after:scale-x-100"
            )}
          >
            A–Z
          </ToggleGroupItem>
        </ToggleGroup>

        <p
          aria-live="polite"
          data-slot="tag-index-summary"
          className={cn(
            "shrink-0 font-mono text-[0.6875rem]",
            "text-muted-foreground/65 tabular-nums"
          )}
        >
          {visibleCount === totalCount ? `${totalCount} tags` : `${visibleCount} / ${totalCount}`}
        </p>
      </div>
    </div>
  )
}

type MostUsedTagsProps = {
  tags: readonly TaxonCount[]
}

function MostUsedTags({ tags }: MostUsedTagsProps) {
  return (
    <ul
      data-slot="tag-index-list"
      className={cn(
        "grid min-w-0 grid-cols-1 gap-x-7",
        "sm:grid-cols-2",
        "lg:grid-cols-3",
        "xl:grid-cols-4"
      )}
    >
      {tags.map((tag, index) => (
        <li key={tag.slug} data-slot="tag-index-item" className="min-w-0">
          <TagIndexLink
            tag={tag}
            prefix={
              <span
                aria-hidden
                className={cn(
                  "w-5 shrink-0 font-mono text-[0.625rem]",
                  "text-muted-foreground/35 tabular-nums"
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            }
          />
        </li>
      ))}
    </ul>
  )
}

type AlphabeticalTagsProps = {
  groups: readonly TagGroup[]
}

function AlphabeticalTags({ groups }: AlphabeticalTagsProps) {
  return (
    <div data-slot="tag-index-alphabetical">
      {groups.map((group) => (
        <section
          key={group.label}
          data-slot="tag-index-group"
          className={cn(
            "grid min-w-0 grid-cols-[3.5rem_minmax(0,1fr)]",
            "gap-x-3 py-4",
            "sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-x-4"
          )}
        >
          <h2
            className={cn(
              "font-heading text-xl leading-none font-semibold",
              "tracking-tight text-primary/75",
              "sm:text-2xl"
            )}
          >
            {group.label}
          </h2>

          <ul
            className={cn(
              "grid min-w-0 grid-cols-1 gap-x-7",
              "md:grid-cols-2",
              "lg:grid-cols-3",
              "xl:grid-cols-4"
            )}
          >
            {group.tags.map((tag) => (
              <li key={tag.slug} className="min-w-0">
                <TagIndexLink tag={tag} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

type TagIndexLinkProps = {
  tag: TaxonCount
  prefix?: React.ReactNode
}

function TagIndexLink({ tag, prefix }: TagIndexLinkProps) {
  return (
    <NextLink
      href={`/posts/by-tag/${tag.slug}`}
      title={`${tag.name} · ${formatArticleCount(tag.count)}`}
      aria-label={`${tag.name}: ${formatArticleCount(tag.count)}`}
      className={cn(
        "group/tag flex min-w-0 items-baseline gap-2",
        "border-b border-border/50 py-2.5",
        "transition-colors outline-none",
        "hover:border-primary/30",
        "focus-visible:rounded-sm",
        "focus-visible:ring-[3px]",
        "focus-visible:ring-ring/50"
      )}
    >
      {prefix}

      <span
        data-slot="tag-index-name"
        className="flex min-w-0 flex-1 items-baseline text-sm font-medium tracking-tight"
      >
        <span
          aria-hidden
          className={cn(
            "mr-0.5 shrink-0 text-primary/75",
            "transition-colors",
            "group-hover/tag:text-primary"
          )}
        >
          #
        </span>

        <span
          className={cn(
            "truncate text-foreground/75",
            "transition-colors",
            "group-hover/tag:text-foreground"
          )}
        >
          <TwemojifyText text={tag.name} />
        </span>
      </span>

      <span
        data-slot="tag-index-count"
        className={cn(
          "shrink-0 font-mono text-[0.6875rem]",
          "text-muted-foreground/55 tabular-nums",
          "transition-colors",
          "group-hover/tag:text-muted-foreground"
        )}
      >
        {tag.count}
      </span>
    </NextLink>
  )
}

type TagGroup = {
  label: string
  tags: TaxonCount[]
}

function groupTagsAlphabetically(tags: readonly TaxonCount[]): TagGroup[] {
  const groups = new Map<string, TaxonCount[]>()

  for (const tag of tags) {
    const label = getTagGroupLabel(tag.name)
    const group = groups.get(label)

    if (group) {
      group.push(tag)
    } else {
      groups.set(label, [tag])
    }
  }

  return [...groups.entries()]
    .toSorted(([a], [b]) => compareTagGroupLabels(a, b))
    .map(([label, groupTags]) => ({
      label,
      tags: groupTags,
    }))
}

function getTagGroupLabel(name: string): string {
  const firstCharacter = name[0]

  if (!firstCharacter) {
    return "Other"
  }

  if (/\d/u.test(firstCharacter)) {
    return "0–9"
  }

  if (/[a-z]/iu.test(firstCharacter)) {
    return firstCharacter.toLocaleUpperCase()
  }

  return "Other"
}

function compareTagGroupLabels(a: string, b: string): number {
  if (a === b) {
    return 0
  }

  if (a === "0–9") {
    return -1
  }

  if (b === "0–9") {
    return 1
  }

  if (a === "Other") {
    return 1
  }

  if (b === "Other") {
    return -1
  }

  return a.localeCompare(b)
}

function formatArticleCount(count: number): string {
  return `${count} ${count === 1 ? "article" : "articles"}`
}
