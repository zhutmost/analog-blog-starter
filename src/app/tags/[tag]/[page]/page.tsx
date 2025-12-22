import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import slugify from 'slug'

import { PostCardList } from '@/components/post/post-card'
import SimplePageLayout from '@/layouts/simple-page-layout'
import { postsByTag } from '@/lib/coco'
import generatePageMetadata from '@/lib/page-metadata'
import siteConfig from '@/lib/site-config'

export async function generateStaticParams(): Promise<{ tag: string; page: string }[]> {
  return Object.keys(postsByTag).flatMap((tag) => {
    const totalPages = Math.ceil(postsByTag[tag].length / siteConfig.pagination)
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

  const tag = Object.keys(postsByTag).find((t) => slugify(t) === decodeURI(paramTag))
  if (!tag) return

  return generatePageMetadata({
    title: `Tag - ${tag}`,
    description: `"${tag}" tagged posts on ${siteConfig.siteTitle}`,
  })
}

export default async function Page(props: PageProps<'/tags/[tag]/[page]'>) {
  const { tag: paramTag, page: paramPage } = await props.params
  const tag = Object.keys(postsByTag).find((t) => slugify(t) === decodeURI(paramTag))
  if (!tag) return notFound()

  const currentPage = parseInt(paramPage, 10)
  const totalPages = Math.ceil(postsByTag[tag].length / siteConfig.pagination)
  if (Number.isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
    redirect(`/tags/${paramTag}/1`)
  }

  return (
    <SimplePageLayout title={`Tag - ${tag}`} greeting={siteConfig.pages.greetings.archive}>
      <PostCardList currentPage={currentPage} allPosts={postsByTag[tag]} />
    </SimplePageLayout>
  )
}
