import * as React from 'react'
import slugify from '@sindresorhus/slugify'
import { IconArrowRight } from '@tabler/icons-react'
import NextLink from 'next/link'

import SmartImage from '@/components/smart-image'
import Tag from '@/components/tag'
import Twemojify from '@/components/twemoji'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import type { Post } from '@/content-collections'
import siteConfig from '@/lib/site-config'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const { title, summary, datePublish, slug, tags, banner, category, readingTime } = post
  return (
    <article className="xl:grid xl:grid-cols-4 xl:items-baseline">
      {banner && (
        <div className="mx-auto h-auto w-full pb-5 xl:col-span-6">
          <NextLink href={`/post/${slug}`}>
            <AspectRatio ratio={5 / 2}>
              <SmartImage
                src={banner}
                alt={`Cover image of post: ${title}`}
                fill
                className="rounded-lg object-cover"
              />
            </AspectRatio>
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
            <NextLink href={`/post/${slug}`} className="text-foreground">
              {title}
            </NextLink>
          </h3>
          <div className="flex flex-wrap">
            {tags.map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
          </div>
        </div>
        <div className="prose max-w-none text-muted-foreground">{summary}</div>
        <div className="text-base font-medium leading-6">
          <NextLink
            href={`/post/${slug}`}
            className="inline-flex items-center text-primary hover:text-primary/80"
            aria-label={`Read more: "${title}"`}
          >
            Read more <IconArrowRight className="ml-1 inline size-5" />
          </NextLink>
        </div>
      </div>
    </article>
  )
}
