import { StackSeparator, VStack } from '@chakra-ui/react'
import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import slugify from 'slug'

import PageHeader from '@/components/page-header'
import { PostCardList } from '@/components/post/post-card'
import { tagCounter } from '@/lib/coco'
import generatePageMetadata from '@/lib/page-metadata'
import siteConfig from '@/lib/site-config'

export async function generateStaticParams(): Promise<{ tag: string; page: string }[]> {
  return Object.keys(tagCounter).flatMap((tag) => {
    const totalPages = Math.ceil(tagCounter[tag].count / siteConfig.pagination)
    return Array.from({ length: totalPages }, (_, i) => ({
      tag: encodeURI(slugify(tag)),
      page: (i + 1).toString(),
    }))
  })
}

export async function generateMetadata(
  props: PageProps<'/tags/[tag]/[page]'>
): Promise<Metadata | undefined> {
  const { tag: paramTag } = await props.params

  const tag = Object.keys(tagCounter).find((t) => slugify(t) === decodeURI(paramTag))
  if (!tag) return

  return generatePageMetadata({
    title: `Tag - ${tag}`,
    description: `"${tag}" tagged posts on ${siteConfig.siteTitle}`,
  })
}

export default async function Page(props: PageProps<'/tags/[tag]/[page]'>) {
  const { tag: paramTag, page: paramPage } = await props.params
  const tag = Object.keys(tagCounter).find((t) => slugify(t) === decodeURI(paramTag))
  if (!tag) return notFound()

  const currentPage = parseInt(paramPage, 10)
  const totalPages = Math.ceil(tagCounter[tag].count / siteConfig.pagination)
  if (Number.isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
    redirect(`/tags/${paramTag}/1`)
  }

  const filteredPosts = tagCounter[tag].posts

  return (
    <VStack as="article" separator={<StackSeparator />} w="full">
      <PageHeader.Root>
        <PageHeader.Title>Tag - {tag}</PageHeader.Title>
        <PageHeader.Description>{siteConfig.pages.greetings.archive}</PageHeader.Description>
      </PageHeader.Root>

      <PostCardList currentPage={currentPage} allPosts={filteredPosts} />
    </VStack>
  )
}
