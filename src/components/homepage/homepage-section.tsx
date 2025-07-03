import * as React from 'react'
import { IconArrowRight } from '@tabler/icons-react'
import NextLink from 'next/link'

import PopularTags from '@/components/homepage/popular-tags'
import { PageHeader, PageHeaderDescription } from '@/components/page-header'
import PostCard from '@/components/post-card'
import Timeline from '@/components/timeline'
import Twemojify from '@/components/twemoji'
import timelineNews from '@/data/news/timeline-news'
import allPostsSorted from '@/lib/post-sort'
import siteConfig from '@/lib/site-config'

export interface HomepageSectionProps {
  children: React.ReactNode
  href: string
  title: string
  description?: string
}

export default function HomepageSection({
  children,
  href,
  title,
  description,
}: HomepageSectionProps) {
  return (
    <div>
      <PageHeader>
        <div className="flex w-full flex-wrap items-end justify-between">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter hover:opacity-80 md:text-4xl lg:leading-[1.1]">
            <NextLink href={href}>{title}</NextLink>
          </h2>
          <NextLink
            href={href}
            className="inline-flex items-center text-base font-medium leading-6 text-primary hover:text-primary/80"
          >
            View all <IconArrowRight className="ml-1 size-5" />
          </NextLink>
        </div>
        <PageHeaderDescription>
          <Twemojify>{description}</Twemojify>
        </PageHeaderDescription>
      </PageHeader>
      {children}
    </div>
  )
}

export const homepageSectionMap = {
  popularTags: HomepageSectionPopularTags,
  recentPosts: HomepageSectionRecentPosts,
  latestNews: HomepageSectionLatestNews,
}

export function HomepageSectionRecentPosts() {
  const posts = allPostsSorted.slice(0, siteConfig.postPerPage)
  return (
    <HomepageSection
      href="/archive"
      title="Recent Posts"
      description={siteConfig.pages.greetings.archive}
    >
      <div>
        <ul>
          {!posts.length && 'No posts found.'}
          {posts.map((post) => (
            <li key={post.slug} className="py-4">
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </div>
    </HomepageSection>
  )
}

export function HomepageSectionLatestNews() {
  const recentNews = timelineNews.slice(0, siteConfig.homepage.latestNewsNum)
  if (recentNews.length === 0) return

  return (
    <HomepageSection
      href="/news"
      title="Latest News"
      description={siteConfig.pages.greetings.otherDefault}
    >
      <Timeline timelineNews={recentNews} findMore />
    </HomepageSection>
  )
}

export function HomepageSectionPopularTags() {
  return (
    <HomepageSection
      href="/tags"
      title="Popular Tags"
      description={siteConfig.pages.greetings.tags}
    >
      <PopularTags />
    </HomepageSection>
  )
}
