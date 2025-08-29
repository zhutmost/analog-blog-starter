import { StackSeparator, VStack } from '@chakra-ui/react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import slugify from 'slug'

import PageHeader from '@/components/page-header'
import { PostCardList } from '@/components/post/post-card'
import { tagCounter } from '@/lib/coco/'
import generatePageMetadata from '@/lib/page-metadata'
import siteConfig from '@/lib/site-config'

// eslint-disable-next-line @typescript-eslint/require-await
export async function generateStaticParams(): Promise<{ tag: string }[]> {
  return Object.keys(tagCounter).map((tag) => {
    return {
      tag: encodeURI(slugify(tag)),
    }
  })
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>
}): Promise<Metadata | undefined> {
  const paramTag = (await params).tag

  const tag = Object.keys(tagCounter).find((t) => slugify(t) === decodeURI(paramTag))
  if (!tag) return

  return generatePageMetadata({
    title: `Tag - ${tag}`,
    description: `"${tag}" tagged posts on ${siteConfig.siteTitle}`,
  })
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ tag: string }>
  searchParams: Promise<{ page?: string }>
}) {
  const paramPage = parseInt((await searchParams).page ?? '1', 10)
  const paramTag = (await params).tag

  const tag = Object.keys(tagCounter).find((t) => slugify(t) === decodeURI(paramTag))
  if (!tag) return notFound()

  const filteredPosts = tagCounter[tag].posts

  return (
    <VStack as="article" separator={<StackSeparator />} width="full">
      <PageHeader.Root>
        <PageHeader.Title>Tag - {tag}</PageHeader.Title>
        <PageHeader.Description>{siteConfig.pages.greetings.archive}</PageHeader.Description>
      </PageHeader.Root>

      <PostCardList currentPage={paramPage} allPosts={filteredPosts} />
    </VStack>
  )
}
