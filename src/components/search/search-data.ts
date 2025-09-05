import { allPages, allPosts } from '@/lib/coco'
import siteConfig from '@/lib/site-config'

export interface SearchDataItem {
  label: string
  value: string
  sublabel?: string
  icon?: string
  searchContent?: string[]
}

const dateOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
}

const posts: SearchDataItem[] = allPosts.map((post) => ({
  label: post.title,
  value: `/post/${post.slug}`,
  sublabel: `${post.category} - ${post.datePublish.toLocaleDateString(siteConfig.locale, dateOptions)}`,
  icon: 'IconNews',
  searchContent: [post.category, ...post.tags, post.summary],
}))

const pages: SearchDataItem[] = allPages.map((page) => ({
  label: page.title,
  value: `/${page.slug}`,
  sublabel: page.greeting,
  icon: 'IconCode',
}))

const about: SearchDataItem = {
  label: 'About',
  value: '/about',
  sublabel: `About me and this site.`,
  icon: 'IconUser',
  searchContent: ['contact', 'email', 'authors'],
}

const home: SearchDataItem = {
  label: 'Home',
  value: '/',
  sublabel: `Go back to the homepage.`,
  icon: 'IconHome',
}

const searchData: SearchDataItem[] = [...posts, ...pages, home, about]

export default searchData
