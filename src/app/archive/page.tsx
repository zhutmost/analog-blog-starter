import { StackSeparator, VStack } from '@chakra-ui/react'
import type { Metadata } from 'next'

import PageHeader from '@/components/page-header'
import { PostCardList } from '@/components/post/post-card'
import { allPosts } from '@/lib/coco'
import generatePageMetadata from '@/lib/page-metadata'
import siteConfig from '@/lib/site-config'

export const metadata: Metadata = generatePageMetadata({
  title: 'All Posts',
})

export default async function Page({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const paramPage = parseInt((await searchParams).page ?? '1', 10)

  return (
    <VStack as="article" separator={<StackSeparator />} w="full">
      <PageHeader.Root>
        <PageHeader.Title>All Posts</PageHeader.Title>
        <PageHeader.Description>{siteConfig.pages.greetings.archive}</PageHeader.Description>
      </PageHeader.Root>

      <PostCardList currentPage={paramPage} allPosts={allPosts} />
    </VStack>
  )
}
