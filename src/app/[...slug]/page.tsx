import { MDXContent } from '@content-collections/mdx/react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import mdxComponents from '@/components/mdx/mdx-components'
import { allPages, Page as PageType } from '@/content-collections'
import PageLayout from '@/layouts/page-layout'
import { generatePageMetadata } from '@/lib/page-metadata'
import siteConfig from '@/lib/site-config'

// eslint-disable-next-line @typescript-eslint/require-await
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
    description: page.description ?? siteConfig.description,
  })
}

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params
  const page: PageType | undefined = allPages.find((page) => page.slug === params.slug.join('/'))
  if (!page) {
    return notFound()
  }

  return (
    <PageLayout content={page}>
      <MDXContent code={page.mdx} components={mdxComponents} />
    </PageLayout>
  )
}
