import type * as React from 'react'
import { Box, StackSeparator, VStack } from '@chakra-ui/react'

import PageHeader from '@/components/page-header'
import siteConfig from '@/lib/site-config'

export interface SimplePageLayoutProps {
  children: React.ReactNode
  title: string
  greeting?: string
}

export default function SimplePageLayout({ children, title, greeting }: SimplePageLayoutProps) {
  return (
    <VStack as="article" separator={<StackSeparator />} w="full">
      <PageHeader.Root>
        <PageHeader.Title>{title}</PageHeader.Title>
        <PageHeader.Description>
          {greeting ?? siteConfig.pages.greetings.otherDefault}
        </PageHeader.Description>
      </PageHeader.Root>

      <Box w="full" mt={8}>
        {children}
      </Box>
    </VStack>
  )
}
