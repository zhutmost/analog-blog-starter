"use client"

import { useRouter } from "next/navigation"
import * as React from "react"

import { IconSearch } from "@tabler/icons-react"

import { IconButton, PersonAvatar, TwemojifyText } from "@/components/ui/my"
import { Button } from "@/components/ui/shadcn/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/shadcn/command"
import { Kbd, KbdGroup } from "@/components/ui/shadcn/kbd"
import { classifyHref } from "@/lib/href"
import {
  type SiteSearchData,
  type SiteSearchDocument,
  type SiteSearchQuickLink,
} from "@/lib/search/search-data"
import { cn } from "@/lib/utils"

type SearchDataStatus = "idle" | "loading" | "ready" | "error"

const EMPTY_SEARCH_DATA: SiteSearchData = {
  documents: [],
  quickLinks: [],
}

export function SiteSearch() {
  const router = useRouter()

  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [searchData, setSearchData] = React.useState<SiteSearchData | null>(null)
  const [loadStatus, setLoadStatus] = React.useState<SearchDataStatus>("idle")

  const searchDataRequest = React.useRef<Promise<SiteSearchData> | null>(null)

  const loadSearchData = React.useCallback(async () => {
    if (searchData) {
      return
    }

    let request = searchDataRequest.current

    if (!request) {
      setLoadStatus("loading")
      request = fetchSiteSearchData()
      searchDataRequest.current = request
    }

    try {
      const nextData = await request

      setSearchData(nextData)
      setLoadStatus("ready")
    } catch {
      searchDataRequest.current = null
      setLoadStatus("error")
    }
  }, [searchData])

  const { documents, quickLinks } = searchData ?? EMPTY_SEARCH_DATA

  const groupedDocuments = React.useMemo(
    () => ({
      articles: documents.filter((document) => document.kind === "article"),
      pages: documents.filter((document) => document.kind === "page"),
      topics: documents.filter(
        (document) => document.kind === "category" || document.kind === "tag"
      ),
      people: documents.filter((document) => document.kind === "person"),
    }),
    [documents]
  )

  const recentArticles = groupedDocuments.articles.slice(0, 4)
  const hasQuery = query.trim().length > 0

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.repeat || event.isComposing) {
        return
      }

      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()

        if (open) {
          setOpen(false)
          setQuery("")
        } else {
          setOpen(true)
          void loadSearchData()
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [loadSearchData, open])

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)

    if (nextOpen) {
      void loadSearchData()
    } else {
      setQuery("")
    }
  }

  function handleSelect(href: string) {
    setOpen(false)
    setQuery("")

    switch (classifyHref(href)) {
      case "internal":
        router.push(href)
        return

      case "same-document":
      case "contact":
        window.location.assign(href)
        return

      case "external":
        window.open(href, "_blank", "noopener,noreferrer")
        return

      case "invalid":
        throw new Error(`Cannot navigate to invalid href "${href}".`)
    }
  }

  return (
    <>
      <IconButton
        label="Search site"
        tooltip={
          <span className="flex items-center gap-2">
            Search
            <Kbd>⌘ K</Kbd>
          </span>
        }
        aria-haspopup="dialog"
        aria-expanded={open}
        onPointerEnter={() => void loadSearchData()}
        onFocus={() => void loadSearchData()}
        onClick={() => handleOpenChange(true)}
      >
        <IconSearch aria-hidden="true" className="size-5" />
      </IconButton>

      <CommandDialog
        open={open}
        onOpenChange={handleOpenChange}
        title="Search"
        description="Search articles, pages, topics, and people."
        className={cn(
          "top-4 max-h-[calc(100dvh-2rem)]",
          "sm:top-[18vh] sm:max-w-xl",
          "lg:max-w-2xl"
        )}
      >
        <Command label="Site search" shouldFilter={hasQuery} filter={filterSearchDocument}>
          <CommandInput
            value={query}
            onValueChange={setQuery}
            placeholder="Search articles, pages, and people…"
            aria-label="Search this site"
          />
          <CommandList className={cn("max-h-[min(28rem,calc(100dvh-8rem))]", "overscroll-contain")}>
            {!searchData ? (
              <SearchDataState status={loadStatus} onRetry={() => void loadSearchData()} />
            ) : hasQuery ? (
              <>
                <SearchDocumentGroup
                  heading="Articles"
                  documents={groupedDocuments.articles}
                  onSelect={handleSelect}
                />

                <SearchDocumentGroup
                  heading="Pages"
                  documents={groupedDocuments.pages}
                  onSelect={handleSelect}
                />

                <SearchDocumentGroup
                  heading="Topics"
                  documents={groupedDocuments.topics}
                  onSelect={handleSelect}
                />

                <SearchDocumentGroup
                  heading="People"
                  documents={groupedDocuments.people}
                  onSelect={handleSelect}
                />

                <CommandEmpty className="px-6 py-10">
                  <p className="font-medium text-foreground">No matches for “{query.trim()}”.</p>

                  <p className="mt-1 text-muted-foreground">Try a title, topic, or author.</p>
                </CommandEmpty>
              </>
            ) : (
              <>
                {recentArticles.length > 0 && (
                  <CommandGroup heading="Recently published">
                    {recentArticles.map((document) => (
                      <SearchDocumentItem
                        key={document.id}
                        document={document}
                        onSelect={handleSelect}
                      />
                    ))}
                  </CommandGroup>
                )}

                {quickLinks.length > 0 && (
                  <CommandGroup heading="Explore">
                    {quickLinks.map((link) => (
                      <QuickLinkItem
                        key={`${link.label}:${link.href}`}
                        link={link}
                        onSelect={handleSelect}
                      />
                    ))}
                  </CommandGroup>
                )}
              </>
            )}
          </CommandList>

          {searchData && <SearchFooter />}
        </Command>
      </CommandDialog>
    </>
  )
}

async function fetchSiteSearchData(): Promise<SiteSearchData> {
  const response = await fetch("/api/search", {
    headers: {
      Accept: "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to load search data: ${response.status}`)
  }

  const data: unknown = await response.json()

  if (!isSiteSearchData(data)) {
    throw new Error("Invalid search data response")
  }

  return data
}

function isSiteSearchData(value: unknown): value is SiteSearchData {
  return (
    typeof value === "object" &&
    value !== null &&
    "documents" in value &&
    Array.isArray(value.documents) &&
    "quickLinks" in value &&
    Array.isArray(value.quickLinks)
  )
}

type SearchDataStateProps = {
  status: SearchDataStatus
  onRetry: () => void
}

function SearchDataState({ status, onRetry }: SearchDataStateProps) {
  const hasError = status === "error"

  return (
    <div
      role={hasError ? "alert" : "status"}
      aria-busy={!hasError}
      className="flex min-h-36 flex-col items-center justify-center gap-3 px-6 py-10 text-center"
    >
      {hasError ? (
        <>
          <div>
            <p className="font-medium text-foreground">Search couldn&apos;t be loaded.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Check your connection and try again.
            </p>
          </div>

          <Button type="button" variant="outline" size="sm" onClick={onRetry}>
            Try again
          </Button>
        </>
      ) : (
        <p className="text-sm text-muted-foreground">Preparing search…</p>
      )}
    </div>
  )
}

type SearchDocumentGroupProps = {
  heading: string
  documents: SiteSearchDocument[]
  onSelect: (href: string) => void
}

function SearchDocumentGroup({ heading, documents, onSelect }: SearchDocumentGroupProps) {
  if (documents.length === 0) {
    return null
  }

  return (
    <CommandGroup heading={heading}>
      {documents.map((document) => (
        <SearchDocumentItem key={document.id} document={document} onSelect={onSelect} />
      ))}
    </CommandGroup>
  )
}

type SearchDocumentItemProps = {
  document: SiteSearchDocument
  onSelect: (href: string) => void
}

function SearchDocumentItem({ document, onSelect }: SearchDocumentItemProps) {
  const hasDescription = Boolean(document.description)
  const hasMetadata = Boolean(document.meta || document.secondaryMeta)
  const hasAvatar = Boolean(document.avatar)

  const showCompactMetadata = !hasDescription && !hasAvatar && hasMetadata
  const showStackedMetadata = hasMetadata && (hasDescription || hasAvatar)

  return (
    <CommandItem
      value={document.id}
      keywords={document.keywords}
      onSelect={() => onSelect(document.href)}
      className={cn("@container items-start gap-3 px-3 py-2.5", "[&>svg:last-child]:hidden")}
    >
      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-baseline gap-3">
          <div className="min-w-0 flex-1 truncate leading-5 font-medium">
            {document.prefix && (
              <span aria-hidden="true" className="mr-0.5 text-primary">
                {document.prefix}
              </span>
            )}

            <TwemojifyText text={document.title} />
          </div>

          {showCompactMetadata && <SearchDocumentMetadata document={document} compact />}
        </div>

        {document.description && (
          <p className="mt-0.5 line-clamp-2 text-sm leading-snug text-muted-foreground">
            <TwemojifyText text={document.description} />
          </p>
        )}

        {showStackedMetadata && <SearchDocumentMetadata document={document} />}
      </div>

      {document.avatar && (
        // document.keyword[0] has been fixed to the person's name
        <PersonAvatar
          name={document.keywords[0]}
          src={document.avatar}
          size="sm"
          className="hidden self-center @lg:flex"
        />
      )}
    </CommandItem>
  )
}

type SearchDocumentMetadataProps = {
  document: SiteSearchDocument
  compact?: boolean
}

function SearchDocumentMetadata({ document, compact = false }: SearchDocumentMetadataProps) {
  const { meta, secondaryMeta } = document

  if (!meta && !secondaryMeta) {
    return null
  }

  return (
    <span
      className={cn(
        compact
          ? "max-w-[45%] shrink-0 truncate text-xs text-muted-foreground"
          : "mt-1 flex flex-wrap items-center gap-x-1.5 text-[0.6875rem] text-muted-foreground/75"
      )}
    >
      {meta && (
        <span className={cn(document.kind === "article" && "font-medium text-primary")}>
          <TwemojifyText text={meta} />
        </span>
      )}

      {meta && secondaryMeta && <span aria-hidden="true">·</span>}

      {secondaryMeta && (
        <span>
          <TwemojifyText text={secondaryMeta} />
        </span>
      )}
    </span>
  )
}

type QuickLinkItemProps = {
  link: SiteSearchQuickLink
  onSelect: (href: string) => void
}

function QuickLinkItem({ link, onSelect }: QuickLinkItemProps) {
  return (
    <CommandItem
      value={`quick-link:${link.href}`}
      keywords={[link.label]}
      onSelect={() => onSelect(link.href)}
      className="px-3 py-2.5 [&>svg:last-child]:hidden"
    >
      <span className="min-w-0 flex-1 truncate font-medium">
        <TwemojifyText text={link.label} />
      </span>

      <span className="max-w-32 shrink-0 truncate text-xs text-muted-foreground/70 sm:max-w-48">
        {formatHrefLabel(link.href)}
      </span>
    </CommandItem>
  )
}

function SearchFooter() {
  return (
    <div className="hidden items-center gap-5 border-t px-4 py-2 text-xs text-muted-foreground select-none sm:flex">
      <span className="inline-flex items-center gap-1.5">
        <KbdGroup>
          <Kbd>↑</Kbd>
          <Kbd>↓</Kbd>
        </KbdGroup>
        Navigate
      </span>

      <span className="inline-flex items-center gap-1.5">
        <Kbd>↵</Kbd>
        Open
      </span>

      <span className="ml-auto inline-flex items-center gap-1.5">
        <Kbd>Esc</Kbd>
        Close
      </span>
    </div>
  )
}

function filterSearchDocument(_value: string, search: string, keywords?: string[]): number {
  const query = normalizeSearchValue(search)

  if (!query) {
    return 1
  }

  const normalizedKeywords = (keywords ?? []).map(normalizeSearchValue)

  const title = normalizedKeywords.at(0) ?? ""
  const searchableText = normalizedKeywords.join(" ")

  if (title === query) {
    return 1
  }

  if (title.startsWith(query)) {
    return 0.95
  }

  if (title.includes(query)) {
    return 0.9
  }

  if (searchableText.includes(query)) {
    return 0.75
  }

  const terms = query.split(/\s+/u).filter(Boolean)

  if (terms.length > 1 && terms.every((term) => searchableText.includes(term))) {
    return 0.6
  }

  return 0
}

function normalizeSearchValue(value: string): string {
  return value.normalize("NFKC").toLocaleLowerCase().trim()
}

function formatHrefLabel(href: string): string {
  if (classifyHref(href) !== "external") {
    return href
  }
  return new URL(href).hostname.replace(/^www\./u, "")
}
