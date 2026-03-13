import { Box, StackSeparator, VStack } from '@chakra-ui/react'

import PageHeader from '@/components/layout/page-header'
import MdxProse from '@/components/mdx/mdx-prose'
import type { Page } from '@/lib/coco'
import siteConfig from '@/lib/site-config'

export interface PageTemplateProps {
  page: Page
}

export default function PageTemplate({ page }: PageTemplateProps) {
  return (
    <VStack as="article" separator={<StackSeparator />} w="full">
      <PageHeader.Root>
        <PageHeader.Title>{page.title}</PageHeader.Title>
        <PageHeader.Description>
          {page.greeting ?? siteConfig.pages.greetings.otherDefault}
        </PageHeader.Description>
      </PageHeader.Root>

      <Box w="full" mt={8}>
        <MdxProse code={page.mdx} />
      </Box>
    </VStack>
  )
}
