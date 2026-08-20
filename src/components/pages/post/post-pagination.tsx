import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/shadcn/pagination"

export type PostPaginationProps = {
  currentPage: number
  totalPages: number
  getPageHref: (page: number) => string
}

type PaginationEntry = number | "ellipsis"

function getPaginationEntries(currentPage: number, totalPages: number): PaginationEntry[] {
  if (totalPages <= 0) {
    return []
  }

  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const visiblePages = new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1])

  // Near either edge, expose a slightly wider and more useful window.
  if (currentPage <= 3) {
    visiblePages.add(2)
    visiblePages.add(3)
  }
  if (currentPage >= totalPages - 2) {
    visiblePages.add(totalPages - 2)
    visiblePages.add(totalPages - 1)
  }

  const pages = [...visiblePages]
    .filter((page) => page >= 1 && page <= totalPages)
    .toSorted((a, b) => a - b)

  const entries: PaginationEntry[] = []

  for (const page of pages) {
    const previousPage = entries.findLast((entry): entry is number => typeof entry === "number")

    if (previousPage !== undefined) {
      const gap = page - previousPage

      // If only one page is missing, showing it is clearer than an ellipsis.
      if (gap === 2) {
        entries.push(page - 1)
      } else if (gap > 2) {
        entries.push(`ellipsis`)
      }
    }

    entries.push(page)
  }

  return entries
}

export function PostPagination({ currentPage, totalPages, getPageHref }: PostPaginationProps) {
  if (
    totalPages <= 1 ||
    !Number.isSafeInteger(currentPage) ||
    !Number.isSafeInteger(totalPages) ||
    currentPage < 1 ||
    currentPage > totalPages
  ) {
    return null
  }

  const entries = getPaginationEntries(currentPage, totalPages)

  const hasPreviousPage = currentPage > 1
  const hasNextPage = currentPage < totalPages

  return (
    <Pagination aria-label="Post pagination" className="mt-12 sm:mt-16">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={getPageHref(hasPreviousPage ? currentPage - 1 : currentPage)}
            aria-disabled={!hasPreviousPage}
            tabIndex={hasPreviousPage ? undefined : -1}
            className={hasPreviousPage ? undefined : "pointer-events-none opacity-50"}
          />
        </PaginationItem>

        {entries.map((entry, index) => {
          if (entry === "ellipsis") {
            return (
              // oxlint-disable-next-line react/no-array-index-key
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          }

          return (
            <PaginationItem key={entry}>
              <PaginationLink
                href={getPageHref(entry)}
                isActive={entry === currentPage}
                aria-current={entry === currentPage ? "page" : undefined}
              >
                {entry}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        <PaginationItem>
          <PaginationNext
            href={getPageHref(hasNextPage ? currentPage + 1 : currentPage)}
            aria-disabled={!hasNextPage}
            tabIndex={hasNextPage ? undefined : -1}
            className={hasNextPage ? undefined : "pointer-events-none opacity-50"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
