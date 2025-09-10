import type * as React from 'react'
import { Box, StackSeparator, VStack } from '@chakra-ui/react'

import PageHeader from '@/components/page-header'
import type { Page as PageType } from '@/lib/coco'
import siteConfig from '@/lib/site-config'

export interface PageLayoutProps {
  children: React.ReactNode
  content: PageType
}

export default function PageLayout({ children, content }: PageLayoutProps) {
  return (
    <VStack separator={<StackSeparator />} w="full">
      <PageHeader.Root>
        <PageHeader.Title>{content.title}</PageHeader.Title>
        <PageHeader.Description>
          {content.greeting ?? siteConfig.pages.greetings.otherDefault}
        </PageHeader.Description>
      </PageHeader.Root>

      <Box>{children}</Box>
    </VStack>
  )
}
