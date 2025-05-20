import * as React from 'react'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/page-header'
import PostCard from '@/components/post-card'
import PostPagination from '@/components/post-pagination'
import Twemojify from '@/components/twemoji'
import { generatePageMetadata } from '@/lib/page-metadata'
import allPostsSorted from '@/lib/post-sort'
import siteConfig from '@/lib/site-config'

// eslint-disable-next-line @typescript-eslint/require-await
export async function generateStaticParams(): Promise<{ page: string }[]> {
  const totalPages = Math.ceil(allPostsSorted.length / siteConfig.postPerPage)
  return Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))
}

export const metadata: Metadata = generatePageMetadata({
  title: 'All Posts',
})

export default async function Page({ params }: { params: Promise<{ page: string }> }) {
  const totalPages = Math.ceil(allPostsSorted.length / siteConfig.postPerPage)
  const currPage = parseInt((await params).page)
  if (currPage < 1 || currPage > totalPages) {
    redirect('/archive/page/1')
  }

  const posts = allPostsSorted.slice(
    siteConfig.postPerPage * (currPage - 1),
    siteConfig.postPerPage * currPage
  )

  return (
    <article className="divide-y divide-border">
      <PageHeader>
        <PageHeaderHeading>All Posts</PageHeaderHeading>
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
        <PostPagination currentPage={currPage} totalPages={totalPages} />
      </div>
    </article>
  )
}
