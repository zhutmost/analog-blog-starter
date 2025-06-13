import * as React from 'react'
import slugify from '@sindresorhus/slugify'
import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/page-header'
import PostCard from '@/components/post-card'
import PostPagination from '@/components/post-pagination'
import Twemojify from '@/components/twemoji'
import tagData from '@/data/tag-data.json'
import { TagCounter } from '@/lib/content-collections/post-counter'
import { generatePageMetadata } from '@/lib/page-metadata'
import allPostsSorted from '@/lib/post-sort'
import siteConfig from '@/lib/site-config'

// eslint-disable-next-line @typescript-eslint/require-await
export async function generateStaticParams(): Promise<{ tag: string; page: string }[]> {
  const tagCounter = tagData as TagCounter
  return Object.keys(tagCounter).flatMap((tag) => {
    const totalPages = Math.ceil(tagCounter[tag] / siteConfig.postPerPage)
    return Array.from({ length: totalPages }, (_, i) => ({
      tag: encodeURI(slugify(tag)),
      page: (i + 1).toString(),
    }))
  })
}

export async function generateMetadata(props: {
  params: Promise<{ tag: string; page: string }>
}): Promise<Metadata | undefined> {
  const params = await props.params
  const tagCounter = tagData as TagCounter
  const tags = Object.keys(tagCounter)
  const tag = tags.find((t) => slugify(t) === decodeURI(params.tag))

  if (!tag) return

  return generatePageMetadata({
    title: `Tag - ${tag}`,
    description: `"${tag}" tagged posts on ${siteConfig.siteTitle}`,
  })
}

export default async function Page(props: { params: Promise<{ tag: string; page: string }> }) {
  const params = await props.params
  const tagCounter = tagData as TagCounter
  const tag = Object.keys(tagCounter).find((t) => slugify(t) === decodeURI(params.tag))

  if (!tag) return notFound()

  const totalPages = Math.ceil(tagCounter[tag] / siteConfig.postPerPage)
  const filteredPosts = allPostsSorted.filter((post) => post.tags.includes(tag))

  if (filteredPosts.length != tagCounter[tag]) {
    console.error(
      `Tag "${tag}" should include ${tagCounter[tag].toString()} posts but got ${filteredPosts.length.toString()}`
    )
    return notFound()
  }

  const currPage = parseInt(params.page)
  if (currPage < 1 || currPage > totalPages) {
    redirect(`/tags/${params.tag}/page/1`)
  }

  const posts = filteredPosts.slice(
    siteConfig.postPerPage * (currPage - 1),
    siteConfig.postPerPage * currPage
  )

  const tagTitle = tag[0].toUpperCase() + tag.slice(1)

  return (
    <div className="divide-y divide-border">
      <PageHeader>
        <PageHeaderHeading>Tag - {tagTitle}</PageHeaderHeading>
        <PageHeaderDescription>
          <Twemojify>{siteConfig.pages.greetings.archive}</Twemojify>
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
        <PostPagination currentPage={currPage} totalPages={totalPages} parentPath={'/tags'} />
      </div>
    </div>
  )
}
