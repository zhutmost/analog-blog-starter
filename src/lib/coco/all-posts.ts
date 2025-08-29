import { allPosts, type Post as CocoPost } from '@/coco-generated'
import { type Author, allAuthors, authorDefault } from '@/lib/coco/all-authors'

const isProduction: boolean = process.env.NODE_ENV === 'production'

export type Post = Omit<CocoPost, 'authors'> & {
  authors: Author[]
}

export function sortPosts(
  posts: Post[],
  order: 'asc' | 'desc' = 'desc',
  method: 'datePublish' | 'dateUpdate' = 'datePublish'
): Post[] {
  const compareFn = (a: Post, b: Post): number => {
    const methods = {
      datePublish: () => b.datePublish.getTime() - a.datePublish.getTime(),
      dateUpdate: () => b.dateUpdate.getTime() - a.dateUpdate.getTime(),
    }
    return methods[method]()
  }

  const postsDesc: Post[] = posts
    .filter((post: Post) => !isProduction || !post.draft)
    .toSorted(compareFn)
  return order === 'asc' ? postsDesc.reverse() : postsDesc
}

function authorsFind(authors: string[]): Author[] {
  function findAuthor(author: string): Author {
    return (
      allAuthors.find((a: Author) => author === a.slug) ??
      allAuthors.find((a: Author) => author === a._meta.path) ??
      allAuthors.find((a: Author) => author === a.name) ??
      authorDefault
    )
  }
  const authorsFound = authors.map((author: string) => findAuthor(author))
  return authorsFound.length > 0 ? authorsFound : [authorDefault]
}

export const allPostsSorted: Post[] = sortPosts(
  allPosts.map((post: CocoPost) => {
    return { ...post, authors: authorsFind(post.authors) }
  })
)
export { allPostsSorted as allPosts }
