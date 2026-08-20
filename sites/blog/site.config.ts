import { type InputSiteConfig } from "@/lib/site/schema"

const config: InputSiteConfig = {
  siteUrl: "https://zhutmost.com",
  siteTitle: "Haozhe's Blog",
  description:
    "This is Haozhe Zhu (@zhutmost)'s personal blog. I write about my research, thoughts, and life.",
  author: "Haozhe Zhu",
  locale: "en-US",
  favicon: {
    ico: "/favicon/favicon.ico",
    svg: "/favicon/favicon.svg",
    png96x96: "/favicon/favicon-96x96.png",
    apple: "/favicon/apple-touch-icon.png",
    manifest192x192: "/favicon/web-app-manifest-192x192.png",
    manifest512x512: "/favicon/web-app-manifest-512x512.png",
  },
  header: {
    logo: "/favicon/favicon.svg",
    title: "Haozhe's Blog",
    nav: [
      { label: "Home", href: "/" },
      { label: "Blog", href: "/posts" },
      { label: "News", href: "/news" },
      { label: "Publication", href: "/publication" },
      { label: "Team", href: "/team" },
      { label: "About", href: "/author/haozhe-zhu" },
    ],
  },
  footer: {
    socialIcons: [
      {
        label: "GitHub",
        icon: "IconBrandGithub",
        href: "https://github.com/zhutmost",
      },
      {
        label: "RSS Feed",
        icon: "IconRss",
        href: "/rss.xml",
      },
    ],
  },
  analytics: {
    umami: {
      websiteId: "d4fee704-edd5-4eee-bc79-5dd8fa412c2b",
    },
  },
  comment: {
    provider: "giscus",
    repo: "zhutmost/zhutmost-blog",
    repoId: "R_kgDONUD9-A",
    category: "Announcements",
    categoryId: "DIC_kwDONUD9-M4Ckkm1",
  },
  socialShare: {
    defaultImages: ["/banner-zhutmost-com.png"],
    twitterSite: "@zhutmost",
  },
}

export default config
