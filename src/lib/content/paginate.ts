import { siteConfig } from "@/lib/site/config"

export type PaginatedResult<T> = {
  items: T[]
  meta: {
    page: number
    pageSize: number

    totalItems: number
    totalPages: number

    hasPreviousPage: boolean
    hasNextPage: boolean
    previousPage: number | null
    nextPage: number | null

    isFirstPage: boolean
    isLastPage: boolean

    isRequestedPageOutOfRange: boolean
  }
}

/**
 * Parses a route page parameter into a positive integer page number.
 *
 * Invalid, empty, non-finite, or non-positive values are normalized to page 0.
 *
 * @param page - The raw page parameter from a route.
 * @returns The parsed positive integer page number, or `0` when the input is invalid.
 */
function parsePageParam(page: string | number | undefined | null): number {
  if (typeof page === "number") {
    return Number.isSafeInteger(page) && page > 0 ? page : 0
  }

  if (typeof page !== "string" || !/^\d+$/u.test(page)) {
    return 0
  }

  const value = Number(page)

  return Number.isSafeInteger(value) && value > 0 ? value : 0
}

/**
 * Paginates an array of items (posts or other things) and returns the items for the requested page
 * together with pagination metadata.
 *
 * The requested page is clamped to the valid range `[1, totalPages]`, so the returned `meta.page`
 * is always safe to use. When the original `page` argument is outside the valid range,
 * `meta.isRequestedPageOutOfRange` is set to `true`.
 *
 * For an empty item list, `totalPages` is normalized to `1`, and the returned `items` array is
 * empty.
 *
 * @typeParam T - The type of each item in the input array.
 * @param items - The readonly array of items to paginate.
 * @param page - The 1-based page number requested by the caller.
 * @param pageSize - The number of items per page. Defaults to `siteConfig.post.pageSize`.
 * @returns A paginated result containing the current page items and pagination metadata.
 */
export function paginate<T>(
  items: readonly T[],
  page: string | number | undefined | null,
  pageSize: number = siteConfig.post.pageSize
): PaginatedResult<T> {
  if (!Number.isSafeInteger(pageSize) || pageSize <= 0) {
    throw new RangeError(`pageSize must be a positive safe integer, received ${pageSize}.`)
  }

  const pageNumber = parsePageParam(page)

  const totalItems = items.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))

  const safePage = Math.min(Math.max(1, pageNumber), totalPages)
  const startPage = (safePage - 1) * pageSize
  const endPage = startPage + pageSize

  return {
    items: items.slice(startPage, endPage),
    meta: {
      page: safePage,
      pageSize,

      totalItems,
      totalPages,

      hasPreviousPage: safePage > 1,
      hasNextPage: safePage < totalPages,
      previousPage: safePage > 1 ? safePage - 1 : null,
      nextPage: safePage < totalPages ? safePage + 1 : null,

      isFirstPage: safePage === 1,
      isLastPage: safePage === totalPages,

      isRequestedPageOutOfRange: pageNumber < 1 || pageNumber > totalPages,
    },
  }
}

export function createPaginatedStaticParams(
  totalPages: number,
  startPage = 1
): Array<{ page: string }> {
  const pageCount = Math.max(0, totalPages - startPage + 1)

  return Array.from({ length: pageCount }, (_, index) => ({
    page: String(startPage + index),
  }))
}
