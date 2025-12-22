import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import MdxProse from '@/components/mdx/mdx-prose'
import SimplePageLayout from '@/layouts/simple-page-layout'
import { allPages, type Page as PageType } from '@/lib/coco'
import generatePageMetadata from '@/lib/page-metadata'

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  return allPages.map((page) => ({ slug: page.slug.split('/') }))
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
  const params = await props.params
  const page: PageType | undefined = allPages.find((page) => page.slug === params.slug.join('/'))
  if (!page) {
    return
  }

  return generatePageMetadata({
    title: page.title,
    description: page.head?.description,
    locale: page.head?.locale,
  })
}

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params
  const page: PageType | undefined = allPages.find((page) => page.slug === params.slug.join('/'))
  if (!page) {
    return notFound()
  }

  return (
    <SimplePageLayout title={page.title} greeting={page.greeting}>
      <MdxProse code={page.mdx} />
    </SimplePageLayout>
  )
}
