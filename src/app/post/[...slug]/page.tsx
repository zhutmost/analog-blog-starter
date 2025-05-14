import '@/styles/highlight.css'
import 'katex/dist/katex.css'

import { MDXContent } from '@content-collections/mdx/react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import mdxComponents from '@/components/mdx/mdx-components'
import { allPosts, type Author, type Post } from '@/content-collections'
import PostLayout from '@/layouts/post-layout'
import authorsFind from '@/lib/authors-find'
import allPostsSorted from '@/lib/post-sort'
import siteConfig from '@/lib/site-config'

// eslint-disable-next-line @typescript-eslint/require-await
export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  return allPosts.map((post) => ({ slug: post.slug.split('/') }))
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
  const params = await props.params
  const postCurr: Post | undefined = allPostsSorted.find(
    (post: Post) => post.slug === params.slug.join('/')
  )
  if (!postCurr) {
    return
  }

  const authorsCurr: Author[] = authorsFind(postCurr.authors)
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
      locale: postCurr.locale ?? siteConfig.seo.openGraph?.locale,
      type: 'article',
      publishedTime: datePublish,
      modifiedTime: dateUpdate,
      url: './',
      images: ogImage,
      authors: authorsCurr.map((a) => a.name),
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
  const postIndex = allPostsSorted.findIndex((post: Post) => post.slug === params.slug.join('/'))
  if (postIndex === -1) {
    return notFound()
  }

  const postCurr: Post = allPostsSorted[postIndex]
  const postPrev: Post = allPostsSorted[postIndex + 1]
  const postNext: Post = allPostsSorted[postIndex - 1]
  const authorsCurr: Author[] = authorsFind(postCurr.authors)

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
    <PostLayout content={postCurr} authors={authorsCurr} postNext={postNext} postPrev={postPrev}>
      <MDXContent code={postCurr.mdx} components={mdxComponents} />
    </PostLayout>
  )
}
