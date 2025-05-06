import { SiteConfig } from '@/lib/site-config'
import { DeepPartial } from '@/lib/utils'

const userConfig: DeepPartial<SiteConfig> = {
  siteUrl: 'https://analog-demo.zhutmost.com',
  siteTitle: 'Analog Demo',
  description: 'Analog: Another Blog Template with Next.js',
  locale: 'en-US',
  author: 'John Doe',
  homepage: {
    popularTags: [
      { tag: 'markdown', icon: 'IconMarkdown', title: 'Markdown' },
      { tag: 'mac', icon: 'IconCommand', title: 'MacOS' },
      { tag: 'shopping', icon: 'IconTag', title: 'Shopping' },
      { tag: 'writing', icon: 'IconNote', title: 'Writing' },
      { tag: 'windows', icon: 'IconBrandWindows', title: 'Windows' },
    ],
    githubCalendar: 'zhutmost',
  },
  header: {
    logo: '/favicons/favicon.svg',
    title: 'Analog Demo',
    themeSwitch: true,
    menu: {
      Home: '/',
      Blog: '/archive',
      Tags: '/tags',
      News: '/news',
      About: '/about',
    },
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
  analytics: {
    umamiAnalytics: {
      umamiWebsiteId: '4ae56858-7872-446f-980e-32d1c8db927e',
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
  license: 'cc-by-nc-sa',
}

export default userConfig
