import type * as React from 'react'

import { PostCardList } from '@/components/post/post-card'
import { allPosts } from '@/lib/coco'

export interface HomepageSectionRecentPostsProps {
  postCount?: number
}

const HomepageSectionRecentPosts: React.FC<HomepageSectionRecentPostsProps> = ({
  postCount = 5,
}: HomepageSectionRecentPostsProps) => {
  return (
    <PostCardList currentPage={1} allPosts={allPosts.slice(0, postCount)} pagination={postCount} />
  )
}

export default HomepageSectionRecentPosts
