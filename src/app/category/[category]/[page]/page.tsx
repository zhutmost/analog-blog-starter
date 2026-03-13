import { Box, StackSeparator, VStack } from '@chakra-ui/react'
import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import slugify from 'slug'

import { PostCardList } from '@/components/features/post/post-card'
import PageHeader from '@/components/layout/page-header'
import { postsByCategory } from '@/lib/coco'
import generatePageMetadata from '@/lib/page-metadata'
import siteConfig from '@/lib/site-config'

export async function generateStaticParams(): Promise<{ category: string; page: string }[]> {
  return Object.keys(postsByCategory).flatMap((category) => {
    const totalPages = Math.ceil(postsByCategory[category].length / siteConfig.pagination)
    return Array.from({ length: totalPages }, (_, i) => ({
      category: encodeURI(slugify(category)),
      page: (i + 1).toString(),
    }))
  })
}

export async function generateMetadata(
  props: PageProps<'/category/[category]/[page]'>
): Promise<Metadata | undefined> {
  const { category: paramCategory } = await props.params

  const category = Object.keys(postsByCategory).find((t) => slugify(t) === decodeURI(paramCategory))
  if (!category) return

  return generatePageMetadata({
    title: `Category - ${category}`,
    description: `"${category}" category posts on ${siteConfig.siteTitle}`,
  })
}

export default async function Page(props: PageProps<'/category/[category]/[page]'>) {
  const { category: paramCategory, page: paramPage } = await props.params
  const category = Object.keys(postsByCategory).find((t) => slugify(t) === decodeURI(paramCategory))
  if (!category) return notFound()

  const currentPage = parseInt(paramPage, 10)
  const totalPages = Math.ceil(postsByCategory[category].length / siteConfig.pagination)
  if (Number.isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
    redirect(`/category/${paramCategory}/1`)
  }

  return (
    <VStack separator={<StackSeparator />} w="full">
      <PageHeader.Root>
        <PageHeader.Title>{`Category - ${category}`}</PageHeader.Title>
        <PageHeader.Description>{siteConfig.pages.greetings.archive}</PageHeader.Description>
      </PageHeader.Root>

      <Box w="full" mt={8}>
        <PostCardList currentPage={currentPage} allPosts={postsByCategory[category]} />
      </Box>
    </VStack>
  )
}
