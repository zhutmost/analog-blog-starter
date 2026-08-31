import NextImage from "next/image"
import NextLink from "next/link"
import * as React from "react"

import { IconArrowRight } from "@tabler/icons-react"

import { TextLink, TwemojifyText } from "@/components/ui/my"
import { siteConfig } from "@/lib/config"
import { type AuthorMeta, type PostMeta } from "@/lib/content"
import { formatDate } from "@/lib/site/format-date"
import { cn } from "@/lib/utils"

const RECENT_ARTICLE_LIMIT = 3

type AuthorRecentArticlesProps = Omit<React.ComponentPropsWithoutRef<"section">, "children"> & {
  author: AuthorMeta
  posts: PostMeta[]
}

export function AuthorRecentArticles({
  author,
  posts,
  className,
  ...props
}: AuthorRecentArticlesProps) {
  const recentPosts = posts.slice(0, RECENT_ARTICLE_LIMIT)

  if (recentPosts.length === 0) {
    return null
  }

  return (
    <section
      {...props}
      aria-labelledby="author-recent-articles-title"
      data-slot="author-recent-articles"
      className={cn("min-w-0 border-t pt-7", className)}
    >
      <h2
        id="author-recent-articles-title"
        className="font-heading text-xl font-semibold tracking-tight lg:text-base"
      >
        Recent articles
      </h2>

      <ul
        data-slot="author-recent-article-list"
        className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-1"
      >
        {recentPosts.map((post) => (
          <li key={post.slug}>
            <RecentArticleCard post={post} />
          </li>
        ))}
      </ul>

      <TextLink
        href={`/posts/by-author/${author.slug}`}
        className={cn(
          "group/author-articles-action mt-5 inline-flex items-center gap-1.5",
          "text-sm font-medium text-muted-foreground",
          "hover:text-foreground"
        )}
      >
        All {posts.length} {posts.length === 1 ? "article" : "articles"}
        <IconArrowRight
          aria-hidden="true"
          size={15}
          className={cn(
            "transition-transform",
            "group-hover/author-articles-action:translate-x-0.5",
            "motion-reduce:transition-none"
          )}
        />
      </TextLink>
    </section>
  )
}

type RecentArticleCardProps = {
  post: PostMeta
}

function RecentArticleCard({ post }: RecentArticleCardProps) {
  const href = `/post/${post.slug}`

  return (
    <article data-slot="author-recent-article" className="group/author-recent-article min-w-0">
      {post.cover && (
        <NextLink
          href={href}
          aria-label={`Read article: ${post.title}`}
          data-slot="author-recent-article-cover-link"
          className={cn(
            "relative block aspect-2/1 w-full min-w-0 overflow-hidden",
            "rounded-xl border bg-muted outline-none",
            "focus-visible:ring-[3px] focus-visible:ring-ring/50"
          )}
        >
          <NextImage
            src={post.cover}
            alt=""
            fill
            sizes="(min-width: 1024px) 18rem, (min-width: 640px) 50vw, calc(100vw - 2rem)"
            data-slot="author-recent-article-cover"
            className={cn(
              "object-cover transition-transform duration-300",
              "group-hover/author-recent-article:scale-[1.025]",
              "motion-reduce:transition-none"
            )}
          />
        </NextLink>
      )}

      <div data-slot="author-recent-article-content" className={cn(post.cover && "mt-3")}>
        <h3
          data-slot="author-recent-article-title"
          className={cn(
            "font-heading text-sm leading-snug font-semibold tracking-tight",
            "wrap-break-word"
          )}
        >
          <TextLink href={href} className="hover:text-primary">
            <TwemojifyText text={post.title} />
          </TextLink>
        </h3>

        <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
          {post.category && (
            <>
              <TextLink
                href={`/posts/by-category/${post.category.slug}`}
                className="font-semibold tracking-wide text-primary hover:text-primary"
              >
                <TwemojifyText text={post.category.name} />
              </TextLink>

              <span aria-hidden="true">·</span>
            </>
          )}

          <time dateTime={post.datePublish} className="whitespace-nowrap tabular-nums">
            {formatDate(post.datePublish, siteConfig.locale)}
          </time>
        </div>
      </div>
    </article>
  )
}
