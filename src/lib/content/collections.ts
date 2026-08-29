import {
  allAuthors as allAuthorsRaw,
  allPages as allPagesRaw,
  allPosts as allPostsRaw,
  type Author as AuthorRaw,
  type Page as PageRaw,
  type Post as PostRaw,
} from "content-collections"

import { createAuthorResolver } from "@/lib/content/author-resolver"
import { comparePosts } from "@/lib/content/post-sort"
import { createTaxonomyResolver } from "@/lib/content/taxonomy-resolver"
import { siteConfig } from "@/lib/site/config"

export type Author = AuthorRaw
export type AuthorMeta = Omit<Author, "content" | "toc">
export type InternalPostAuthor = AuthorMeta & {
  kind: "internal"
}

export type ExternalPostAuthor = {
  kind: "external"
  name: string
  href?: string
}

export type PostAuthor = InternalPostAuthor | ExternalPostAuthor

export type Post = Omit<PostRaw, "authors"> & { authors: PostAuthor[] }
export type PostMeta = Omit<Post, "content" | "toc">
export type Userpage = PageRaw

const tagResolver = createTaxonomyResolver(siteConfig.content.tagAliases)
const categoryResolver = createTaxonomyResolver(siteConfig.content.categoryAliases)

function isVisibleContent(c: { draft: boolean }) {
  if (process.env.NODE_ENV !== "production" || siteConfig.content.includeDraft) {
    return true
  }
  return !c.draft
}

export const authors: Author[] = allAuthorsRaw
export const authorMetas: AuthorMeta[] = authors.map(
  ({ content: _content, toc: _toc, ...author }: Author) => author
)

export const authorResolver = createAuthorResolver(authorMetas)

function resolvePostAuthor(author: PostRaw["authors"][number], referencedBy: string): PostAuthor {
  if (typeof author !== "string") {
    return { kind: "external", name: author.name, href: author.href }
  }

  const result = authorResolver.resolve({ by: "slug-or-name", value: author })

  if (result.status === "resolved") {
    return {
      ...result.author,
      kind: "internal",
    }
  }

  if (result.status === "ambiguous") {
    throw new Error(
      `Ambiguous author "${author}" referenced by ${referencedBy}: ${result.authors
        .map((matchedAuthor) => `"${matchedAuthor.slug}"`)
        .join(", ")}. Use an author slug to disambiguate.`
    )
  }

  throw new Error(`Unknown author "${author}" referenced by ${referencedBy}.`)
}

export const posts: Post[] = allPostsRaw
  .filter(isVisibleContent)
  .map((post): Post =>
    Object.assign({}, post, {
      category: categoryResolver.resolve(post.category),
      tags: tagResolver.resolveMany(post.tags),
      authors: post.authors.map((author) => resolvePostAuthor(author, `post "${post.slug}"`)),
    })
  )
  .toSorted(comparePosts(siteConfig.content.post.sortKey, siteConfig.content.post.sortDirection))

export const userpages: Userpage[] = allPagesRaw.filter(isVisibleContent)

export const postMetas: PostMeta[] = posts.map(
  ({ content: _content, toc: _toc, ...post }: Post) => post
)
