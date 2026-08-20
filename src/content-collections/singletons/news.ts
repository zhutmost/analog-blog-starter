import { z } from "zod"

import { basicContentSchema } from "@/content-collections/collections/basic"
import { mz } from "@/lib/utils"

export const newsItemSchema = z.object({
  date: z.iso.date(),
  type: z.enum(["publication", "talk", "project", "award", "people", "event"]).optional(),
  title: mz.nonEmptyString(),
  description: mz.optionalString(),
})

export const newsSingletonSchema = basicContentSchema.extend({
  title: mz.nonEmptyString().default("News"),
  summary: mz.nonEmptyString().default("Recent updates, announcements, and milestones."),
  items: z.array(newsItemSchema).default([]),
})
