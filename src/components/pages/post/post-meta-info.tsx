import * as React from "react"

import { TextLink, TwemojifyText } from "@/components/ui/my"
import { type PostMeta } from "@/lib/content"
import { formatDate, isSameDate } from "@/lib/site/format-date"
import { cn } from "@/lib/utils"

export type PostMetaInfoProps = Omit<React.ComponentPropsWithoutRef<"div">, "children"> & {
  category?: PostMeta["category"]
  authors: PostMeta["authors"]
  datePublish: PostMeta["datePublish"]
  dateUpdate: PostMeta["dateUpdate"]
  compactAuthors?: boolean
}

export function PostMetaInfo({
  category,
  authors,
  datePublish,
  dateUpdate,
  compactAuthors = false,
  className,
  ...props
}: PostMetaInfoProps) {
  const shouldShowUpdatedDate = !isSameDate(datePublish, dateUpdate)

  return (
    <div
      {...props}
      data-slot="post-meta-info"
      className={cn(
        "flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1",
        "text-sm text-muted-foreground",
        className
      )}
    >
      {category && (
        <>
          <TextLink
            href={`/posts/by-category/${category.slug}`}
            aria-label={`Category: ${category.name}`}
            data-slot="post-meta-category"
            className="shrink-0 font-semibold tracking-wide text-primary hover:text-primary"
          >
            <TwemojifyText text={category.name} />
          </TextLink>

          <span aria-hidden className="text-muted-foreground/80">
            /
          </span>
        </>
      )}

      {authors.length > 0 && (
        <>
          <span className="sr-only">By</span>

          <PostMetaAuthors authors={authors} compact={compactAuthors} />

          <span aria-hidden className="text-muted-foreground/80">
            ·
          </span>
        </>
      )}

      <span className="sr-only">Published on</span>

      <time dateTime={datePublish}>{formatDate(datePublish)}</time>

      {shouldShowUpdatedDate && (
        <>
          <span aria-hidden className="text-muted-foreground/80">
            ·
          </span>
          <span>
            Updated <time dateTime={dateUpdate}>{formatDate(dateUpdate)}</time>
          </span>
        </>
      )}
    </div>
  )
}

type PostMetaAuthorsProps = {
  authors: PostMeta["authors"]
  compact: boolean
}

type PostMetaAuthorProps = {
  author: PostMeta["authors"][number]
}

function PostMetaAuthors({ authors, compact }: PostMetaAuthorsProps) {
  if (compact) {
    const [firstAuthor] = authors

    if (!firstAuthor) {
      return null
    }

    return (
      <span data-slot="post-meta-authors" className="min-w-0">
        <PostMetaAuthor author={firstAuthor} />

        {authors.length > 1 && <span className="whitespace-nowrap"> et al.</span>}
      </span>
    )
  }

  return (
    <span data-slot="post-meta-authors" className="min-w-0">
      {authors.map((author, index) => (
        <React.Fragment
          // oxlint-disable-next-line react/no-array-index-key
          key={`${author.kind}:${
            author.kind === "internal" ? author.slug : (author.href ?? author.name)
          }:${index}`}
        >
          {index > 0 && ", "}
          <PostMetaAuthor author={author} />
        </React.Fragment>
      ))}
    </span>
  )
}

function PostMetaAuthor({ author }: PostMetaAuthorProps) {
  const href = author.kind === "internal" ? `/author/${author.slug}` : author.href

  if (!href) {
    return (
      <span className="font-medium text-foreground/70">
        <TwemojifyText text={author.name} />
      </span>
    )
  }

  return (
    <TextLink href={href} className="font-medium text-foreground/70 hover:text-foreground">
      <TwemojifyText text={author.name} />
    </TextLink>
  )
}
