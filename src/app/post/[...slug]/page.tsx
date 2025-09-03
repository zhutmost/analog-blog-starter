import { MDXContent } from '@content-collections/mdx/react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import mdxComponents from '@/components/mdx/mdx-components'
import PostLayout from '@/layouts/post-layout'
import { allPosts, type Post } from '@/lib/coco'
import siteConfig from '@/lib/site-config'

import 'katex/dist/katex.css'

// eslint-disable-next-line @typescript-eslint/require-await
export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  return allPosts.map((post) => ({ slug: post.slug.split('/') }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
  const paramSlug = (await params).slug
  const postCurr = allPosts.find((post: Post) => post.slug === paramSlug.join('/'))
  if (!postCurr) {
    return
  }

  const datePublish: string = postCurr.datePublish.toISOString()
  const dateUpdate: string = postCurr.dateUpdate.toISOString()
  const seoImage: string = postCurr.banner ?? siteConfig.seo.socialBanner
  const ogImage: string = seoImage.includes('http')
    ? seoImage
    : new URL(seoImage, siteConfig.siteUrl).toString()

  return {
    title: postCurr.title,
    description: postCurr.summary,
    openGraph: {
      title: postCurr.title,
      description: postCurr.summary,
      siteName: siteConfig.siteTitle,
      locale: postCurr.head?.locale ?? siteConfig.seo.openGraph?.locale,
      type: 'article',
      publishedTime: datePublish,
      modifiedTime: dateUpdate,
      url: './',
      images: ogImage,
      authors: postCurr.authors.map((a) => a.name),
    },
    twitter: {
      card: 'summary_large_image',
      title: postCurr.title,
      description: postCurr.summary,
      images: seoImage,
    },
  }
}

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params

  const postIndex = allPosts.findIndex((post: Post) => post.slug === params.slug.join('/'))
  if (postIndex === -1) {
    return notFound()
  }

  const postCurr: Post = allPosts[postIndex]
  const postPrev: Post = allPosts[postIndex + 1]
  const postNext: Post = allPosts[postIndex - 1]

  // const jsonLd = post.structuredData
  // jsonLd['author'] = authorsCurr.map((author) => {
  //   return {
  //     '@type': 'Person',
  //     name: author.name,
  //   }
  // })
  //     {/*<script*/}
  //     {/*  type="application/ld+json"*/}
  //     {/*  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}*/}
  //     {/*/>*/}

  return (
    <PostLayout content={postCurr} postNext={postNext} postPrev={postPrev}>
      <MDXContent code={postCurr.mdx} components={mdxComponents} />
    </PostLayout>
  )
}
