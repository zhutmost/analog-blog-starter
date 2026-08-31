import { z } from "zod"

import { mz } from "@/lib/utils"

export const newsItemSchema = z.object({
  date: z.iso.date(),
  type: z.enum(["publication", "talk", "project", "award", "people", "event"]).optional(),
  title: mz.nonEmptyString(),
  description: mz.optionalString(),
})

const homeHeroSchema = z
  .object({
    greeting: mz.nonEmptyString().default("Hi, I’m"),
    name: mz.optionalString(),
    actions: z
      .array(
        z.object({
          label: mz.nonEmptyString(),
          href: mz.href(),
          primary: z.boolean().default(false),
        })
      )
      .prefault([{ label: "Articles", href: "/posts", primary: true }]),
  })
  .prefault({})

const homeNewsSectionSchema = z.object({
  type: z.literal("news"),
  title: mz.nonEmptyString().default("Latest News"),
  summary: mz.nonEmptyString().default("Recent updates, announcements, and milestones."),
  href: mz.href().nullable().optional(),
  actionLabel: mz.nonEmptyString().default("All updates"),

  limit: z.int().positive().default(5),

  // Omitted => render the section without news items.
  // Provided => preserve the declared item order.
  items: z.array(newsItemSchema).optional(),
})

const homeResearchSectionSchema = z.object({
  type: z.literal("research"),
  title: mz.nonEmptyString().default("Research"),
  summary: mz.nonEmptyString().default("Selected themes and areas of ongoing work."),
  href: mz.href().nullable().optional(),
  actionLabel: mz.nonEmptyString().default("All projects"),

  areas: z.array(
    z.object({
      title: mz.nonEmptyString(),
      description: mz.nonEmptyString(),
      keywords: z.array(mz.nonEmptyString()).default([]),
    })
  ),
})

const homePostsSectionSchema = z.object({
  type: z.literal("posts"),
  title: mz.nonEmptyString().default("Recent Articles"),
  summary: mz.nonEmptyString().default("Notes, articles, and longer-form explorations."),
  href: mz.href().nullable().default("/posts"),
  actionLabel: mz.nonEmptyString().default("All articles"),

  limit: z.int().positive().default(4),

  // Omitted => inherit from the global post ordering.
  // Provided => select posts by slug, preserving this order.
  items: z.array(mz.nonEmptyString()).optional(),
})

const homeSectionSchema = z.discriminatedUnion("type", [
  homeNewsSectionSchema,
  homeResearchSectionSchema,
  homePostsSectionSchema,
])

const homeSectionsSchema = z
  .array(homeSectionSchema)
  .superRefine((sections, ctx) => {
    const seen = new Set<string>()

    sections.forEach((section, index) => {
      if (seen.has(section.type)) {
        ctx.addIssue({
          code: "custom",
          path: [index, "type"],
          message: `Duplicate homepage section type "${section.type}".`,
        })
      }

      seen.add(section.type)
    })
  })
  .prefault([
    {
      type: "news",
    },
    {
      type: "posts",
    },
  ])

export const homepageSchema = z.object({
  hero: homeHeroSchema,
  sections: homeSectionsSchema,
})

export type InputNewsItem = z.input<typeof newsItemSchema>
export type NewsItem = z.output<typeof newsItemSchema>
