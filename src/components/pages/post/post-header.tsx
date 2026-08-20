import NextImage from "next/image"
import * as React from "react"

import { PostMetaInfo } from "@/components/pages/post/post-meta-info"
import { PostTagList } from "@/components/pages/post/post-tag-list"
import { VStack } from "@/components/ui/layout"
import { TwemojifyText } from "@/components/ui/my"
import { type Post } from "@/lib/content"
import { cn } from "@/lib/utils"

export type PostHeaderProps = Omit<React.ComponentPropsWithoutRef<"header">, "children"> & {
  post: Post
}

export function PostHeader({ post, className, ...props }: PostHeaderProps) {
  return (
    <VStack
      as="header"
      {...props}
      data-slot="post-header"
      gap="lg"
      className={cn("min-w-0", className)}
    >
      <VStack data-slot="post-header-content" className="min-w-0">
        <h1
          data-slot="post-header-title"
          className={cn(
            "min-w-0 font-heading text-4xl leading-tight font-semibold tracking-tight",
            "text-balance wrap-break-word sm:text-5xl lg:text-6xl"
          )}
        >
          <TwemojifyText text={post.title} />
        </h1>

        <PostMetaInfo
          authors={post.authors}
          datePublish={post.datePublish}
          dateUpdate={post.dateUpdate}
          className="sm:text-base"
        />

        <PostTagList tags={post.tags} />
      </VStack>

      {post.cover && (
        <div
          data-slot="post-header-cover"
          className="relative aspect-2/1 w-full min-w-0 overflow-hidden rounded-2xl border bg-muted shadow-xs"
        >
          <NextImage
            src={post.cover}
            alt=""
            fill
            priority
            sizes="(max-width: 1279px) calc(100vw - 2rem), 72rem"
            data-slot="post-header-cover-image"
            className="object-cover"
          />
        </div>
      )}
    </VStack>
  )
}
