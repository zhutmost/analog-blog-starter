import NextImage from "next/image"
import NextLink from "next/link"
import * as React from "react"

import { PostMetaInfo } from "@/components/pages/post/post-meta-info"
import { PostTagList } from "@/components/pages/post/post-tag-list"
import { VStack } from "@/components/ui/layout"
import { TextLink, TwemojifyText } from "@/components/ui/my"
import { type PostMeta } from "@/lib/content"
import { cn } from "@/lib/utils"

export type PostCardProps = Omit<React.ComponentPropsWithoutRef<"article">, "children"> & {
  post: PostMeta
  titleAs?: "h2" | "h3"
}

export function PostCard({ post, titleAs: Title = "h2", className, ...props }: PostCardProps) {
  const postHref = `/post/${post.slug}`
  const image = post.cover

  return (
    <article
      {...props}
      data-slot="post-card"
      className={cn(
        "group/post-card grid min-w-0 gap-5",
        image &&
          "md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] md:gap-6 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-8",
        className
      )}
    >
      {image && (
        <NextLink
          href={postHref}
          aria-label={`Read article: ${post.title}`}
          data-slot="post-card-thumbnail-link"
          className={cn(
            "relative block aspect-video w-full min-w-0 overflow-hidden rounded-xl border bg-muted",
            "transition-colors outline-none",
            "focus-visible:ring-[3px] focus-visible:ring-ring/50",
            "md:aspect-5/4"
          )}
        >
          <NextImage
            src={image}
            alt=""
            fill
            sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) 14rem, 16rem"
            data-slot="post-card-thumbnail"
            className={cn(
              "object-cover transition-transform duration-300",
              "group-hover/post-card:scale-[1.025]",
              "motion-reduce:transition-none"
            )}
          />
        </NextLink>
      )}

      <VStack
        data-slot="post-card-content"
        className={cn("min-w-0", image && "py-2 md:h-full md:justify-between")}
      >
        <VStack data-slot="post-card-main" gap="sm" className="min-w-0">
          <Title
            data-slot="post-card-title"
            className={cn(
              "font-heading text-xl leading-snug font-semibold tracking-tight",
              "text-balance wrap-break-word sm:text-2xl"
            )}
          >
            <TextLink href={postHref} className="hover:text-primary">
              <TwemojifyText text={post.title} />
            </TextLink>
          </Title>

          {post.summary && (
            <p
              data-slot="post-card-description"
              className="line-clamp-3 text-sm text-muted-foreground sm:text-base md:line-clamp-2"
            >
              <TwemojifyText text={post.summary} />
            </p>
          )}

          <PostTagList tags={post.tags} limit={4} showOverflowCount />
        </VStack>

        <PostMetaInfo
          category={post.category}
          authors={post.authors}
          datePublish={post.datePublish}
          dateUpdate={post.dateUpdate}
          compactAuthors
          className={image && "md:mt-auto"}
        />
      </VStack>
    </article>
  )
}
