import { allPosts, type Post as CocoPost } from '@/coco-generated'
import { type Author, allAuthors } from '@/lib/coco/all-authors'

const isProduction: boolean = process.env.NODE_ENV === 'production'

export type Post = Omit<CocoPost, 'authors'> & {
  authors: {
    name: string
    href?: string
    avatar?: string
    bio?: string
  }[]
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

const allPostsSorted: Post[] = sortPosts(
  allPosts.map((post: CocoPost) => {
    const authors = post.authors.map((author) => {
      const authorFound =
        allAuthors.find((a: Author) => author.name === a.slug) ??
        allAuthors.find((a: Author) => author.name === a._meta.path) ??
        allAuthors.find((a: Author) => author.name === a.name)
      if (authorFound)
        return {
          name: authorFound.name,
          href: authorFound.slug === 'default' ? '/about' : `/about/${authorFound.slug}`,
          avatar: authorFound.avatar ?? '/avatar-default.jpg',
          bio: authorFound.bio,
        }
      else
        return {
          ...author,
          avatar: author.avatar ?? '/avatar-default.jpg',
        }
    })
    return { ...post, authors }
  })
)

export { allPostsSorted as allPosts }
