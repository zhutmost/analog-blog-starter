import * as React from 'react'
import { PageHeader, PageHeaderDescription } from '@/components/page-header'
import siteConfig from '@/lib/site-config'
import PostCard from '@/components/post-card'
import allPostsSorted from '@/lib/post-sort'
import PopularTags from '@/components/popular-tags'
import Timeline from '@/components/timeline'
import timelineNews from '@/data/timeline-news'
import HomepageIntro from '@/components/homepage-intro'
import HomepageSection from '@/components/homepage-section'

export default function HomePage() {
  const posts = allPostsSorted.slice(0, siteConfig.postPerPage)
  const recentNews = timelineNews.slice(0, 5)

  return (
    <div>
      <div className="px-4 pb-2 pt-8 md:pt-12 lg:pt-12">
        <HomepageIntro />
      </div>

      {recentNews.length > 0 && (
        <HomepageSection
          href="/news"
          title="Latest News"
          description={siteConfig.pageGreetings.news}
        >
          <Timeline timelineNews={recentNews} findMore />
        </HomepageSection>
      )}

      <HomepageSection
        href="/tags"
        title="Popular Tags"
        description={siteConfig.pageGreetings.tags}
      >
        <PopularTags />
      </HomepageSection>

      <HomepageSection
        href="/archive"
        title="Recent Posts"
        description={siteConfig.pageGreetings.archive}
      >
        <div>
          <ul>
            {!posts.length && 'No posts found.'}
            {posts.map((post) => (
              <li key={post.slugPath} className="py-4">
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        </div>
      </HomepageSection>
    </div>
  )
}
