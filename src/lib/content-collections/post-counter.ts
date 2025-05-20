import siteConfig from '@/lib/site-config'

const isProduction: boolean = process.env.NODE_ENV === 'production'

export type TagCounter = Record<string, number>

export function countPostTags(posts: { tags: string[]; draft: boolean }[]): TagCounter {
  const tagCounter: TagCounter = {}
  posts.forEach((post) => {
    if (post.tags.length && (!isProduction || !post.draft)) {
      post.tags.forEach((tag) => {
        tagCounter[tag] = (tagCounter[tag] || 0) + 1
      })
    }
  })
  return tagCounter
}

export type CategoryCounter = Record<string, number>

export function countPostCategories(
  posts: { category: string; draft: boolean }[]
): CategoryCounter {
  const categoryCounter: CategoryCounter = {}
  posts.forEach((post) => {
    if (post.category && (!isProduction || !post.draft)) {
      const category = siteConfig.pages.category ? post.category : 'Uncategorized'
      categoryCounter[category] = (categoryCounter[category] || 0) + 1
    }
  })
  return categoryCounter
}
