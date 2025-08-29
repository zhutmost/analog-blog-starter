import HomepageSectionContents from '@/components/homepage/sections'
import timelineNews from '@/data/news/timeline-news'
import { SiteConfig } from '@/lib/site-config'
import { DeepPartial } from '@/lib/utils'

const userConfig: DeepPartial<SiteConfig> = {
  siteUrl: 'https://analog-demo.zhutmost.com',
  siteTitle: 'Analog Demo',
  description:
    'Explore Analog: An open-source blog template built with Next.js by zhutmost. Perfect for technical contents, research teams, and academic blogs. Modern, SEO-optimized, and fully customizable.',
  locale: 'en-US',
  author: 'John Doe',
  homepage: {
    greetings: [
      '🔥 Etiam elit libero, interdum eu urna ac, pharetra dignissim diam.',
      '⚽️ Donec iaculis, massa id commodo commodo, nisl eros rutrum ipsum, in lobortis.',
    ],
    githubCalendar: 'zhutmost',
    sections: [
      {
        href: '/news',
        title: 'Latest News',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        content: HomepageSectionContents.LatestNews,
        contentProps: {
          hrefViewAll: '/news',
          news: timelineNews,
        },
      },
      {
        href: '/tags',
        title: 'Popular Tags',
        description: 'Aenean et augue porttitor, imperdiet nisl vitae, egestas magna.',
        content: HomepageSectionContents.PopularTags,
        contentProps: {
          tags: [
            { tag: 'markdown', icon: 'IconMarkdown', title: 'Markdown' },
            { tag: 'mac', icon: 'IconCommand', title: 'MacOS' },
            { tag: 'shopping', icon: 'IconTag', title: 'Shopping' },
            { tag: 'writing', icon: 'IconNote', title: 'Writing' },
            { tag: 'windows', icon: 'IconBrandWindows', title: 'Windows' },
          ],
        },
      },
      {
        href: '/archive',
        title: 'Recent Posts',
        description: 'Cras rhoncus tempor nunc at euismod cras cursus libero turpis.',
        content: HomepageSectionContents.RecentPosts,
      },
    ],
  },
  header: {
    logo: '/icon.svg',
    title: 'Analog Demo',
    menu: [
      { name: 'Home', href: '/' },
      { name: 'Blog', href: '/archive' },
      { name: 'News', href: '/news' },
      { name: 'Tags', href: '/tags' },
      { name: 'Team', href: '/team' },
      { name: 'About', href: '/about' },
    ],
  },
  footer: {
    // beian: '粤ICP备2021******号',
    icons: {
      Facebook: { icon: 'IconBrandFacebook', href: 'https://facebook.com' },
      X: { icon: 'IconBrandX', href: 'https://x.com' },
      RSS: { icon: 'IconRss', href: '/rss.xml' },
      Analytics: {
        icon: 'IconChartDots',
        href: 'https://cloud.umami.is/share/unndQ4BKaNaSgfys/analog-demo.zhutmost.com',
      },
    },
  },
  comment: {
    provider: 'giscus',
    giscusConfig: {
      repo: 'zhutmost/analog-blog-starter',
      repoId: 'R_kgDONEFqpw',
      category: 'Announcements',
      categoryId: 'DIC_kwDONEFqp84CjmEV',
    },
  },
  analytics: {
    umamiAnalytics: {
      websiteId: '4ae56858-7872-446f-980e-32d1c8db927e',
    },
  },
  license: 'cc-by-nc-sa',
}

export default userConfig
