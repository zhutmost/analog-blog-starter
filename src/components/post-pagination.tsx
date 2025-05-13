'use client'

import * as React from 'react'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

export interface PostPaginationProps {
  currentPage: number
  totalPages: number
  parentPath?: string
}

export default function PostPagination({
  currentPage,
  totalPages,
  parentPath = '/archive',
}: PostPaginationProps) {
  const isFirstPage = currentPage <= 1
  const isLastPage = currentPage >= totalPages
  const prevPage = currentPage - 1
  const nextPage = currentPage + 1

  const firstPageLink = `${parentPath}/page/1`
  const prevPageLink = `${parentPath}/page/${prevPage.toString()}`
  const nextPageLink = `${parentPath}/page/${nextPage.toString()}`
  const lastPageLink = `${parentPath}/page/${totalPages.toString()}`
  const currentPageLink = `${parentPath}/page/${currentPage.toString()}`

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={prevPageLink} disabled={isFirstPage} />
        </PaginationItem>
        {prevPage > 1 && (
          <PaginationItem>
            <PaginationLink href={firstPageLink}>1</PaginationLink>
          </PaginationItem>
        )}
        {prevPage > 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {prevPage >= 1 && (
          <PaginationItem>
            <PaginationLink href={prevPageLink}>{prevPage}</PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink href={currentPageLink} isActive>
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        {nextPage <= totalPages && (
          <PaginationItem>
            <PaginationLink href={nextPageLink}>{currentPage + 1}</PaginationLink>
          </PaginationItem>
        )}
        {nextPage < totalPages - 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {nextPage < totalPages && (
          <PaginationItem>
            <PaginationLink href={lastPageLink}>{totalPages}</PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext href={nextPageLink} disabled={isLastPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
