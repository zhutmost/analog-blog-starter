import type { HomepageSectionContent } from '@/components/homepage/sections/home-section'
import { PostCardList } from '@/components/post/post-card'
import { allPosts } from '@/lib/coco'

export interface HomepageSectionRecentPostsProps {
  postCount?: number
}

const HomepageSectionRecentPosts: HomepageSectionContent<HomepageSectionRecentPostsProps> = ({
  postCount = 5,
}: HomepageSectionRecentPostsProps) => {
  return (
    <PostCardList currentPage={1} allPosts={allPosts.slice(0, postCount)} pagination={postCount} />
  )
}

export default HomepageSectionRecentPosts
