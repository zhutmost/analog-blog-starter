import type * as React from 'react'

import TimelineNews, { type TimelineNewsProps } from '@/components/timeline'

import HomepageSectionPopularTags from './popular-tags'
import HomepageSectionRecentPosts from './recent-posts'

export * from './home-section'

const HomepageSectionContents: Record<string, React.FC<never>> = {
  LatestNews: (props: TimelineNewsProps) => <TimelineNews {...props} />,
  RecentPosts: HomepageSectionRecentPosts,
  PopularTags: HomepageSectionPopularTags,
}

export default HomepageSectionContents
