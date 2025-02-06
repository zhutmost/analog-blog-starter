import * as React from 'react'
import NextLink from 'next/link'

import BackToTop from '@/components/back-to-top'
import Comments from '@/components/comments'
import PostLicense from '@/components/post-license'
import PostToc from '@/components/post-toc'
import SmartImage from '@/components/smart-image'
import Tag from '@/components/tag'
import type { Author, Post } from '@/content-collections'
import siteConfig from '@/lib/site-config'
import { cn } from '@/lib/utils'

export interface PostLayoutProps {
  children: React.ReactNode
  content: Post
  authors: Author[]
  postNext?: Post
  postPrev?: Post
}

function PostSidebarItem({
  label = undefined,
  children,
  className,
  ...rest
}: {
  label?: string
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('py-4 xl:py-8', className)} {...rest}>
      {label && (
        <h2 className="text-xs font-medium uppercase leading-5 tracking-wide text-muted-foreground">
          {label}
        </h2>
      )}
      <div className="text-sm font-medium">{children}</div>
    </div>
  )
}

function PostSidebar({ content, authors, postNext, postPrev }: Omit<PostLayoutProps, 'children'>) {
  const { tags, toc } = content

  // Because the 1st item is the post title, we filter out the 1st item. So it will display 2nd and 3rd level headings.
  const filteredToc = toc.filter((item) => item.depth <= 3)

  return (
    <div className="flex flex-col justify-start divide-border xl:divide-y">
      {/* Author */}
      <dl className="pb-10 pt-6 xl:pt-11">
        <dt className="sr-only">Authors</dt>
        <dd className="">
          <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
            {authors.map((author) => (
              <li className="flex items-center space-x-2" key={author.name}>
                {author.avatar && (
                  <NextLink href={`/about/${author.slug}`}>
                    <SmartImage
                      src={author.avatar}
                      width={38}
                      height={38}
                      alt="avatar"
                      className="h-10 w-10 rounded-full"
                    />
                  </NextLink>
                )}
                <dl className="whitespace-nowrap indent-3 text-sm font-medium leading-5">
                  <NextLink href={`/about/${author.slug}`}>
                    <dt className="sr-only">Name</dt>
                    <dd className="text-foreground">{author.name}</dd>
                  </NextLink>
                  {author.bio && (
                    <div>
                      <dt className="sr-only">Bio</dt>
                      <dd className="text-sm text-muted-foreground">{author.bio}</dd>
                    </div>
                  )}
                </dl>
              </li>
            ))}
          </ul>
        </dd>
      </dl>

      {/* Tags */}
      {tags.length && (
        <PostSidebarItem label="Tags">
          <div className="flex flex-wrap">
            {tags.map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
          </div>
        </PostSidebarItem>
      )}

      {/* Next, Prev */}
      {(postNext ?? postPrev) && (
        <div className="flex flex-wrap justify-between gap-8 py-4 xl:py-8">
          {postPrev && (
            <PostSidebarItem label="Previous Article" className="py-0 xl:py-0">
              <div className="text-primary hover:text-primary/80">
                <NextLink href={`/post/${postPrev.slug}`}>{postPrev.title}</NextLink>
              </div>
            </PostSidebarItem>
          )}
          {postNext && (
            <PostSidebarItem label="Next Article" className="py-0 xl:py-0">
              <div className="text-primary hover:text-primary/80">
                <NextLink href={`/post/${postNext.slug}`}>{postNext.title}</NextLink>
              </div>
            </PostSidebarItem>
          )}
        </div>
      )}

      {/* TOC */}
      {filteredToc.length > 0 && (
        <div className="container h-full">
          <PostSidebarItem
            label="Table of Contents"
            className="sticky inset-x-0 top-14 hidden space-y-4 xl:block"
          >
            <PostToc toc={toc} />
          </PostSidebarItem>
        </div>
      )}
    </div>
  )
}

export default function PostLayout({
  content,
  authors,
  postNext,
  postPrev,
  children,
}: PostLayoutProps) {
  const { title, datePublish, slug, banner } = content
  return (
    <>
      <BackToTop />
      <article>
        <div className="xl:divide-y xl:divide-border">
          <header className="pb-6 pt-6">
            {banner && (
              <div className="w-full pb-10">
                <div className="relative aspect-5/2 w-full">
                  <SmartImage src={banner} alt={title} fill className="object-cover" />
                </div>
              </div>
            )}
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-muted-foreground">
                    <time dateTime={datePublish.toDateString()}>
                      {new Date(datePublish).toLocaleDateString(siteConfig.locale, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  </dd>
                </div>
              </dl>
              <h1 className="md:leading-14 text-3xl font-extrabold leading-9 tracking-tight text-foreground sm:text-4xl sm:leading-10 md:text-5xl">
                {title}
              </h1>
            </div>
          </header>

          <div className="divide-y divide-border pb-8 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0">
            <PostSidebar
              content={content}
              authors={authors}
              postNext={postNext}
              postPrev={postPrev}
            />

            <div className="gap-16 pb-8 pt-10 xl:col-span-3 xl:pb-0">
              <div className="prose prose-slate max-w-none pb-8 dark:prose-invert prose-code:font-mono prose-pre:p-0">
                {children}
              </div>

              {siteConfig.license && <PostLicense post={content} authors={authors} />}

              {siteConfig.comment.provider && (
                <div className="pt-10" id="comment">
                  <Comments slug={slug} />
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
