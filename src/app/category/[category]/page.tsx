import { StackSeparator, VStack } from '@chakra-ui/react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import slugify from 'slug'

import PageHeader from '@/components/page-header'
import { PostCardList } from '@/components/post/post-card'
import { categoryCounter } from '@/lib/coco'
import generatePageMetadata from '@/lib/page-metadata'
import siteConfig from '@/lib/site-config'

export async function generateStaticParams(): Promise<{ category: string }[]> {
  return Object.keys(categoryCounter).map((category) => {
    return {
      category: encodeURI(slugify(category)),
    }
  })
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata | undefined> {
  const paramCategory = (await params).category

  const category = Object.keys(categoryCounter).find((t) => slugify(t) === decodeURI(paramCategory))
  if (!category) return

  return generatePageMetadata({
    title: `Category - ${category}`,
    description: `"${category}" category posts on ${siteConfig.siteTitle}`,
  })
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>
  searchParams: Promise<{ page?: string }>
}) {
  const paramPage = parseInt((await searchParams).page ?? '1', 10)
  const paramCategory = (await params).category

  const category = Object.keys(categoryCounter).find((t) => slugify(t) === decodeURI(paramCategory))
  if (!category) return notFound()

  const filteredPosts = categoryCounter[category].posts

  return (
    <VStack as="article" separator={<StackSeparator />} w="full">
      <PageHeader.Root>
        <PageHeader.Title>Category - {category}</PageHeader.Title>
        <PageHeader.Description>{siteConfig.pages.greetings.archive}</PageHeader.Description>
      </PageHeader.Root>

      <PostCardList currentPage={paramPage} allPosts={filteredPosts} />
    </VStack>
  )
}
