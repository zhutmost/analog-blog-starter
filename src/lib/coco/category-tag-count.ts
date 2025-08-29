import { allPosts, type Post } from '@/lib/coco/all-posts'

export type TagCounter = Record<string, { count: number; posts: Post[] }>
export type CategoryCounter = Record<string, { count: number; posts: Post[] }>

const tagCounter: TagCounter = {}
const categoryCounter: CategoryCounter = {}

allPosts.forEach((post) => {
  post.tags.forEach((tag) => {
    tagCounter[tag] ??= { count: 0, posts: [] }
    tagCounter[tag].count++
    tagCounter[tag].posts.push(post)
  })
  categoryCounter[post.category] ??= { count: 0, posts: [] }
  categoryCounter[post.category].count++
  categoryCounter[post.category].posts.push(post)
})

export { tagCounter, categoryCounter }
