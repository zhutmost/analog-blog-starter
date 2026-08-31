import { type InputSiteConfig } from "@/lib/config"

import { news } from "./src/news"

const config: InputSiteConfig = {
  siteUrl: "https://analog-demo.zhutmost.com",
  siteTitle: "Demo Site",
  description:
    "Explore the demo and documentation for a content-driven Next.js website starter, including its layouts, content collections, and reusable components.",
  author: "Luna Lovegood",
  favicon: {
    ico: "/favicon/favicon.ico",
    svg: "/favicon/favicon.svg",
    png96x96: "/favicon/favicon-96x96.png",
    apple: "/favicon/apple-touch-icon.png",
    manifest192x192: "/favicon/web-app-manifest-192x192.png",
    manifest512x512: "/favicon/web-app-manifest-512x512.png",
  },
  header: {
    title: "Demo Site",
    logo: "/favicon/favicon.svg",
    nav: [
      { label: "Home", href: "/" },
      { label: "Blog", href: "/posts" },
      { label: "Teaching", href: "/course" },
      { label: "News", href: "/news" },
      { label: "People", href: "/people" },
      { label: "About", href: "/about" },
    ],
  },
  home: {
    hero: {
      actions: [
        { label: "Articles", href: "/posts", primary: true },
        { label: "GitHub", href: "https://github.com/zhutmost/analog-blog-starter" },
        { label: "Getting Started", href: "/post/docs/getting-started" },
      ],
    },
    sections: [
      {
        type: "news",
        href: "/news",
        summary: "Sample updates demonstrating the news timeline.",
        items: news.slice(0, 5),
      },
      {
        type: "research",
        summary: "Example topics showing how structured research areas can be presented.",
        areas: [
          {
            title: "Magical Creatures",
            description:
              "Field observations, classification, and encounters with creatures best approached with curiosity and an open mind.",
            keywords: ["Magizoology", "Field Work", "Creatures"],
          },
          {
            title: "Wizarding Culture",
            description:
              "Notes on communities, customs, stories, and unusual phenomena across the wizarding world.",
            keywords: ["Culture", "Travel", "History"],
          },
          {
            title: "Unusual Phenomena",
            description:
              "Explorations of questions that do not always fit neatly into established categories.",
            keywords: ["Discovery", "Observation", "Curiosity"],
          },
        ],
      },
      {
        type: "posts",
        summary: "Sample articles covering typography, media, taxonomy, and layout behavior.",
      },
    ],
  },
  post: {
    tagAliases: {
      Markdown: ["MDX"],
    },
  },
  analytics: {
    umami: {
      websiteId: "4ae56858-7872-446f-980e-32d1c8db927e",
    },
  },
  comment: {
    provider: "giscus",
    repo: "zhutmost/analog-blog-starter",
    repoId: "R_kgDONEFqpw",
    categoryId: "DIC_kwDONEFqp84CjmEV",
  },
  socialShare: {
    defaultImages: ["social-images-default.png"],
    twitterSite: "@zhutmost",
  },
}

export default config
