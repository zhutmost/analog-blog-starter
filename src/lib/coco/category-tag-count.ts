import { allPosts, type Post } from '@/lib/coco/all-posts'

const postsByTag: Record<string, Post[]> = {}
const postsByCategory: Record<string, Post[]> = {}

// Because the posts are already sorted, we can just iterate over them
allPosts.forEach((post) => {
  post.tags.forEach((tag) => {
    postsByTag[tag] ??= []
    postsByTag[tag].push(post)
  })
  postsByCategory[post.category] ??= []
  postsByCategory[post.category].push(post)
})

export { postsByTag, postsByCategory }
