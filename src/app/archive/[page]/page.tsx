import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { PostCardList } from '@/components/features/post/post-card'
import { allPosts } from '@/lib/coco'
import generatePageMetadata from '@/lib/page-metadata'
import siteConfig from '@/lib/site-config'
import PageTemplate from '@/templates/page-template'

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
    <PageTemplate title="All Posts" greeting={siteConfig.pages.greetings.archive}>
      <PostCardList currentPage={currentPage} allPosts={allPosts} />
    </PageTemplate>
  )
}
