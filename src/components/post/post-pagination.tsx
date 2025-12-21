'use client'

import {
  ButtonGroup,
  IconButton,
  type IconButtonProps,
  Pagination,
  usePaginationContext,
} from '@chakra-ui/react'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import NextLink from 'next/link'

const PaginationLink = (props: IconButtonProps & { page: 'prev' | 'next' | number }) => {
  const { page, ...rest } = props
  const pagination = usePaginationContext()
  const pageValue =
    page === 'prev' ? pagination.previousPage : page === 'next' ? pagination.nextPage : page
  if (!pageValue) return null

  return (
    <IconButton asChild {...rest}>
      <NextLink href={`./${pageValue.toString()}`}>{props.children}</NextLink>
    </IconButton>
  )
}

export default function PostPagination(props: Pagination.RootProps) {
  return (
    <Pagination.Root {...props}>
      <ButtonGroup variant="ghost" size="sm">
        <PaginationLink page="prev">
          <IconChevronLeft />
        </PaginationLink>

        <Pagination.Items
          render={(page) => (
            <PaginationLink page={page.value} variant={{ base: 'ghost', _selected: 'outline' }}>
              {page.value}
            </PaginationLink>
          )}
        />

        <PaginationLink page="next">
          <IconChevronRight />
        </PaginationLink>
      </ButtonGroup>
    </Pagination.Root>
  )
}
