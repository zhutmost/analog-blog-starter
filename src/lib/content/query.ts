import {
  type Author,
  type AuthorMeta,
  authorMetas,
  authors,
  type Post,
  type PostMeta,
  postMetas,
  posts,
  type Userpage,
  userpages,
} from "@/lib/content/collections"

/**
 * Finds a full post by slug.
 *
 * Use this for post detail pages that need compiled MDX content and a table of contents.
 */
export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug)
}

/**
 * Finds post metadata by slug.
 *
 * Use this when compiled MDX content is not needed.
 */
export function getPostMetaBySlug(slug: string): PostMeta | undefined {
  return postMetas.find((post) => post.slug === slug)
}

/** Finds a full author entry by slug. */
export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((author) => author.slug === slug)
}

/** Finds author metadata by slug. */
export function getAuthorMetaBySlug(slug: string): AuthorMeta | undefined {
  return authorMetas.find((author) => author.slug === slug)
}

/**
 * Returns post metadata written by an author.
 *
 * The returned posts preserve the global ordering defined by `postMetas`.
 */
export function getPostMetasByAuthorSlug(authorSlug: string): PostMeta[] {
  return postMetas.filter((post) =>
    post.authors.some((author) => author.kind === "internal" && author.slug === authorSlug)
  )
}
/** Finds a user page by slug. */
export function getUserpageBySlug(slug: string): Userpage | undefined {
  return userpages.find((page) => page.slug === slug)
}
