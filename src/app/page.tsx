import * as React from "react"

import { homeConfig } from "content-collections"

import { HomeHero } from "@/components/home/home-hero"
import { HomeSectionArticles } from "@/components/home/home-section-articles"
import { HomeSectionNews } from "@/components/home/home-section-news"
import { HomeSectionResearch } from "@/components/home/home-section-research"
import { PageShell } from "@/components/pages/basic/page-shell"
import { JsonLd } from "@/components/seo/json-ld"
import { getPostMetaBySlug, newsConfig, postMetas } from "@/lib/content"
import { siteConfig } from "@/lib/site/config"
import { buildWebsiteJsonLd } from "@/lib/site/json-ld"

export default function HomePage() {
  return (
    <PageShell.Root className="max-w-5xl gap-20 lg:gap-20">
      <JsonLd data={buildWebsiteJsonLd()} />

      <HomeHero
        greeting={homeConfig.hero.greeting}
        name={homeConfig.hero.name ?? siteConfig.author}
        introduction={homeConfig.content}
        actions={homeConfig.hero.actions}
      />

      {homeConfig.sections.map((section) => {
        switch (section.type) {
          case "news":
            const newsItems = section.items ?? newsConfig?.items ?? []

            return (
              <HomeSectionNews
                key={section.type}
                title={section.title}
                summary={section.summary}
                href={section.href}
                actionLabel={section.actionLabel}
                items={newsItems.slice(0, section.limit)}
              />
            )

          case "research":
            return (
              <HomeSectionResearch
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
              <HomeSectionArticles
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
