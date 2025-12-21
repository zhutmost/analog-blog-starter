import { StackSeparator, VStack } from '@chakra-ui/react'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import PageHeader from '@/components/page-header'
import { PostCardList } from '@/components/post/post-card'
import { allPosts } from '@/lib/coco'
import generatePageMetadata from '@/lib/page-metadata'
import siteConfig from '@/lib/site-config'

export async function generateStaticParams(): Promise<{ page: string }[]> {
  const totalPages = Math.ceil(allPosts.length / siteConfig.pagination)
  return Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))
}

export const metadata: Metadata = generatePageMetadata({
  title: 'All Posts',
})

export default async function Page(props: PageProps<'/archive/[page]'>) {
  const { page: paramPage } = await props.params

  const currentPage = parseInt(paramPage, 10)
  const totalPages = Math.ceil(allPosts.length / siteConfig.pagination)
  if (Number.isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
    redirect('/archive/1')
  }

  return (
    <VStack as="article" separator={<StackSeparator />} w="full">
      <PageHeader.Root>
        <PageHeader.Title>All Posts</PageHeader.Title>
        <PageHeader.Description>{siteConfig.pages.greetings.archive}</PageHeader.Description>
      </PageHeader.Root>

      <PostCardList currentPage={currentPage} allPosts={allPosts} />
    </VStack>
  )
}
