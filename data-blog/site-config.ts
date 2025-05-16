import { SiteConfig } from '@/lib/site-config'
import { DeepPartial } from '@/lib/utils'

const userConfig: DeepPartial<SiteConfig> = {
  siteUrl: 'https://zhutmost.com',
  siteTitle: "Haozhe's Blog",
  description:
    "This is Haozhe Zhu (@zhutmost)'s personal blog. I write about my research, thoughts, and life.",
  locale: 'en-US',
  author: 'Haozhe Zhu',
  teamPage: false,
  homepage: {
    sections: ['latestNews', 'recentPosts'],
    popularTags: [],
    githubCalendar: 'zhutmost',
  },
  header: {
    logo: '/icon.svg',
    title: "Haozhe's Blog",
    themeSwitch: true,
    menu: {
      Home: '/',
      Blog: '/archive',
      Tags: '/tags',
      News: '/news',
      Publication: '/publication',
      About: '/about',
    },
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
  analytics: {
    umamiAnalytics: {
      umamiWebsiteId: 'd4fee704-edd5-4eee-bc79-5dd8fa412c2b',
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
  seo: {
    socialBanner: '/banner-zhutmost-com.png',
  },
  license: 'cc-by-nc-sa',
}

export default userConfig
