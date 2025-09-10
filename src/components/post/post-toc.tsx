'use client'

import * as React from 'react'
import { Box, Span } from '@chakra-ui/react'
import type { TocItem } from 'remark-flexible-toc'

import SmartLink from '@/components/smart-link'

function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = React.useState(null as string | null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: `0% 0% -80% 0%` }
    )

    itemIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      itemIds.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [itemIds])

  return activeId
}

export interface PostTocProps {
  toc: TocItem[]
}

export default function PostToc({ toc }: PostTocProps) {
  // use .slice(1) to remove the leading '#'
  const activeHeading = useActiveItem(toc.map((item) => item.href.slice(1)))
  const activeHeadingNumbering = toc.find((item) => item.href.slice(1) === activeHeading)?.numbering

  return (
    <Box as="nav" maxH="85svh" overflow="auto" py={2} lineHeight="tall">
      <Box as="ul">
        {toc.map((item) => (
          <Box
            as="li"
            key={item.href}
            px={2}
            py={1}
            bgColor={{ base: 'bg', _hover: 'bg.muted' }}
            color={
              activeHeadingNumbering &&
              item.numbering.every((value, index) => value === activeHeadingNumbering[index])
                ? 'brand'
                : 'fg.muted'
            }
            transition="color"
            fontSize={item.depth === 2 ? 'md' : item.depth === 3 ? 'sm' : 'xs'}
            fontWeight={item.depth === 2 ? 'medium' : 'normal'}
            ml={item.depth > 3 ? 8 : item.depth === 3 ? 5 : 0}
          >
            <SmartLink href={item.href}>
              {item.depth === 2 && <Span pr={2}>{item.numbering.slice(1).join('.')}</Span>}
              {item.value}
            </SmartLink>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
