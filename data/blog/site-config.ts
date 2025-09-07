import type { SiteConfig } from '@/lib/site-config'
import type { DeepPartial } from '@/lib/utils'

import HomepageSectionContents from '../../src/components/homepage/sections'
import timelineNews from '../blog/news/timeline-news-2025'

const userConfig: DeepPartial<SiteConfig> = {
  siteUrl: 'https://zhutmost.com',
  siteTitle: "Haozhe's Blog",
  description:
    "This is Haozhe Zhu (@zhutmost)'s personal blog. I write about my research, thoughts, and life.",
  locale: 'en-US',
  author: 'Haozhe Zhu',
  homepage: {
    greetings: ['I am a dedicated silicon researcher 🔬 and a tech enthusiast 🎧.'],
    githubCalendar: 'zhutmost',
    sections: [
      {
        href: '/news',
        title: 'Latest News',
        description: 'Stay up-to-date with the latest happenings.',
        content: HomepageSectionContents.LatestNews,
        contentProps: {
          hrefViewAll: '/news',
          news: timelineNews.slice(0, 10),
        },
      },
      {
        href: '/tags',
        title: 'Popular Tags',
        description: 'Popular tags feature the most widely favored topics.',
        content: HomepageSectionContents.PopularTags,
      },
      {
        href: '/archive',
        title: 'Recent Posts',
        description: 'My digital garden, where I share my thoughts and ideas.',
        content: HomepageSectionContents.RecentPosts,
      },
    ],
  },
  header: {
    logo: '/icon.svg',
    title: "Haozhe's Blog",
    menu: [
      { name: 'Home', href: '/' },
      { name: 'Blog', href: '/archive' },
      { name: 'Tags', href: '/tags' },
      { name: 'News', href: '/news' },
      { name: 'Publication', href: '/publication' },
      { name: 'About', href: '/about' },
    ],
  },
  footer: {
    icons: {
      GitHub: { icon: 'IconBrandGithub', href: 'https://github.com/zhutmost' },
      RSS: { icon: 'IconRss', href: '/rss.xml' },
      Analytics: {
        icon: 'IconChartDots',
        href: 'https://cloud.umami.is/share/Xhuqb7y5CtlUaz3U/blog.zhutmost.com',
      },
    },
  },
  comment: {
    provider: 'giscus',
    giscusConfig: {
      repo: 'zhutmost/zhutmost-blog',
      repoId: 'R_kgDONUD9-A',
      category: 'Announcements',
      categoryId: 'DIC_kwDONUD9-M4Ckkm1',
    },
  },
  analytics: {
    umamiAnalytics: {
      websiteId: 'd4fee704-edd5-4eee-bc79-5dd8fa412c2b',
    },
  },
  seo: {
    socialBanner: '/banner-zhutmost-com.png',
  },
  license: 'cc-by-nc-sa',
}

export default userConfig
