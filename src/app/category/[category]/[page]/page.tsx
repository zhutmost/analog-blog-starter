import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import slugify from 'slug'

import { PostCardList } from '@/components/post/post-card'
import SimplePageLayout from '@/layouts/simple-page-layout'
import { allPosts, categoryCounter } from '@/lib/coco'
import generatePageMetadata from '@/lib/page-metadata'
import siteConfig from '@/lib/site-config'

export async function generateStaticParams(): Promise<{ category: string; page: string }[]> {
  return Object.keys(categoryCounter).flatMap((category) => {
    const totalPages = Math.ceil(categoryCounter[category].count / siteConfig.pagination)
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

  const category = Object.keys(categoryCounter).find((t) => slugify(t) === decodeURI(paramCategory))
  if (!category) return

  return generatePageMetadata({
    title: `Category - ${category}`,
    description: `"${category}" category posts on ${siteConfig.siteTitle}`,
  })
}

export default async function Page(props: PageProps<'/category/[category]/[page]'>) {
  const { category: paramCategory, page: paramPage } = await props.params
  const category = Object.keys(categoryCounter).find((t) => slugify(t) === decodeURI(paramCategory))
  if (!category) return notFound()

  const currentPage = parseInt(paramPage, 10)
  const totalPages = Math.ceil(allPosts.length / siteConfig.pagination)
  if (Number.isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
    redirect(`/category/${paramCategory}/1`)
  }

  const filteredPosts = categoryCounter[category].posts

  return (
    <SimplePageLayout
      title={`Category - ${category}`}
      greeting={siteConfig.pages.greetings.archive}
    >
      <PostCardList currentPage={currentPage} allPosts={filteredPosts} />
    </SimplePageLayout>
  )
}
