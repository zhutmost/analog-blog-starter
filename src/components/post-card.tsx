import type { Post } from '@/content-collections'
import NextLink from 'next/link'
import * as React from 'react'
import siteConfig from '@/lib/site-config'
import Tag from '@/components/tag'
import NextImage from 'next/image'
import { IconArrowRight } from '@tabler/icons-react'
import slugify from '@sindresorhus/slugify'
import Twemojify from '@/components/twemoji'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const { title, summary, datePublish, slugPath, tags, banner, category, readingTime } = post
  return (
    <article className="xl:grid xl:grid-cols-4 xl:items-baseline">
      {banner && (
        <div className="mx-auto h-auto w-full pb-5 xl:col-span-6">
          <NextLink href={`/post/${slugPath}`}>
            <NextImage
              src={banner}
              alt={`Cover image of post: ${title}`}
              height={400}
              width={1000}
              className="rounded-lg"
            />
          </NextLink>
        </div>
      )}
      <dl className="flex flex-row justify-between xl:flex-col">
        <dt className="sr-only">Category</dt>
        {siteConfig.multiCategories && (
          <dd className="text-base font-semibold leading-6 text-foreground hover:text-foreground/80">
            <Twemojify>
              <NextLink href={`/category/${slugify(category)}`}>{category}</NextLink>
            </Twemojify>
          </dd>
        )}
        <dt className="sr-only">Published on</dt>
        <dd className="text-sm leading-6 text-muted-foreground">
          <time dateTime={datePublish.toDateString()}>
            {datePublish.toLocaleDateString(siteConfig.locale, {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </time>
        </dd>
        <dt className="sr-only">Estimated reading time</dt>
        <dd className="hidden text-sm leading-6 text-muted-foreground xl:block">
          {Math.round(readingTime)} min read
        </dd>
      </dl>
      <div className="space-y-3 xl:col-span-3">
        <div>
          <h3 className="text-2xl font-bold leading-8 tracking-tight">
            <NextLink href={`/post/${slugPath}`} className="text-foreground">
              {title}
            </NextLink>
          </h3>
          <div className="flex flex-wrap">{tags?.map((tag) => <Tag key={tag} text={tag} />)}</div>
        </div>
        <div className="prose max-w-none text-muted-foreground">{summary}</div>
        <div className="text-base font-medium leading-6">
          <NextLink
            href={`/post/${slugPath}`}
            className="inline-flex items-center text-primary hover:text-primary/80"
            aria-label={`Read more: "${title}"`}
          >
            Read more <IconArrowRight className="ml-1 inline h-5 w-5" />
          </NextLink>
        </div>
      </div>
    </article>
  )
}
