import * as React from 'react'
import slugify from '@sindresorhus/slugify'
import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/page-header'
import PostCard from '@/components/post-card'
import PostPagination from '@/components/post-pagination'
import Twemojify from '@/components/twemoji'
import categoryData from '@/data/category-data.json'
import tagData from '@/data/tag-data.json'
import { TagCounter, type CategoryCounter } from '@/lib/content-collections/post-counter'
import { generatePageMetadata } from '@/lib/page-metadata'
import allPostsSorted from '@/lib/post-sort'
import siteConfig from '@/lib/site-config'

// eslint-disable-next-line @typescript-eslint/require-await
export async function generateStaticParams(): Promise<{ category: string }[]> {
  const categoryCounter = categoryData as CategoryCounter
  return Object.keys(categoryCounter).flatMap((category) => {
    const totalPages = Math.ceil(categoryCounter[category] / siteConfig.postPerPage)
    return Array.from({ length: totalPages }, (_, i) => ({
      category: encodeURI(slugify(category)),
      page: (i + 1).toString(),
    }))
  })
}

export async function generateMetadata(props: {
  params: Promise<{ category: string; page: string }>
}): Promise<Metadata | undefined> {
  const params = await props.params
  const categoryCounter = tagData as TagCounter
  const category = Object.keys(categoryCounter).find(
    (t) => slugify(t) === decodeURI(params.category)
  )

  if (!category) return

  return generatePageMetadata({
    title: `Category - ${category}`,
    description: `"${category}" category posts on ${siteConfig.siteTitle}`,
  })
}

export default async function Page(props: { params: Promise<{ category: string; page: string }> }) {
  const params = await props.params
  const categoryCounter = categoryData as CategoryCounter
  const category = Object.keys(categoryCounter).find(
    (t) => slugify(t) === decodeURI(params.category)
  )

  if (!category) return notFound()

  const totalPages = Math.ceil(categoryCounter[category] / siteConfig.postPerPage)
  const filteredPosts = allPostsSorted.filter((post) => post.category === category)

  if (filteredPosts.length != categoryCounter[category]) {
    console.error(
      `Category "${category}" should include ${categoryCounter[category].toString()} posts but got ${filteredPosts.length.toString()}`
    )
    return notFound()
  }

  const currPage = parseInt(params.page)
  if (currPage < 1 || currPage > totalPages) {
    redirect(`/category/${params.category}/page/1`)
  }

  const posts = filteredPosts.slice(
    siteConfig.postPerPage * (currPage - 1),
    siteConfig.postPerPage * currPage
  )

  return (
    <div className="divide-y divide-border">
      <PageHeader>
        <PageHeaderHeading>Category - {category}</PageHeaderHeading>
        <PageHeaderDescription>
          <Twemojify>{siteConfig.pageGreetings.archive}</Twemojify>
        </PageHeaderDescription>
      </PageHeader>
      <div>
        <ul>
          {!posts.length && 'No posts found.'}
          {posts.map((post) => (
            <li key={post.slug} className="py-4">
              <PostCard post={post} />
            </li>
          ))}
        </ul>
        <PostPagination currentPage={currPage} totalPages={totalPages} parentPath={'/category'} />
      </div>
    </div>
  )
}
