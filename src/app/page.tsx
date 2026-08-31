import * as React from "react"

import { homeIntro } from "content-collections"

import { HomeHero } from "@/components/home/home-hero"
import { HomeSections } from "@/components/home/home-sections"
import { PageShell } from "@/components/pages/basic/page-shell"
import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/lib/config"
import { getPostMetaBySlug, postMetas } from "@/lib/content"
import { buildWebsiteJsonLd } from "@/lib/site/json-ld"

export default function HomePage() {
  return (
    <PageShell.Root width="5xl">
      <JsonLd data={buildWebsiteJsonLd()} />

      <HomeHero
        greeting={siteConfig.home.hero.greeting}
        name={siteConfig.home.hero.name ?? siteConfig.author}
        introduction={homeIntro?.content}
        actions={siteConfig.home.hero.actions}
      />

      {siteConfig.home.sections.map((section) => {
        switch (section.type) {
          case "news":
            const newsItems = section.items ?? []

            return (
              <HomeSections.News
                key={section.type}
                title={section.title}
                summary={section.summary}
                href={section.href ?? null}
                actionLabel={section.actionLabel}
                items={newsItems.slice(0, section.limit)}
              />
            )

          case "research":
            return (
              <HomeSections.Research
                key={section.type}
                title={section.title}
                summary={section.summary}
                href={section.href ?? null}
                actionLabel={section.actionLabel}
                areas={section.areas}
              />
            )

          case "posts":
            const postsItems = section.items
              ? section.items.map((slug) => {
                  const post = getPostMetaBySlug(slug)
                  if (!post) {
                    throw new Error(
                      `Unknown post "${slug}" referenced by the homepage posts section.`
                    )
                  }
                  return post
                })
              : postMetas

            return (
              <HomeSections.Articles
                key={section.type}
                title={section.title}
                summary={section.summary}
                href={section.href}
                actionLabel={section.actionLabel}
                posts={postsItems.slice(0, section.limit)}
              />
            )
          default:
            return null
        }
      })}
    </PageShell.Root>
  )
}
