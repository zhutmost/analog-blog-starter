import { z } from "zod"

import { basicContentSchema } from "@/content-collections/collections/basic"
import { mz } from "@/lib/utils"

const yearSchema = z.int().min(1900).max(2100)

const studentBaseSchema = z.object({
  name: mz.nonEmptyString(),
  startYear: yearSchema,
  avatar: mz.optionalString(),
  github: mz.optionalString(),
  cosupervisors: z
    .array(
      z.object({
        name: mz.nonEmptyString(),
        href: mz.href().optional(),
      })
    )
    .default([]),

  /**
   * Optional slug of an entry in the Author collection.
   *
   * When provided, the person's avatar and name link to the corresponding `/author/[slug]` page.
   */
  author: mz.optionalString(),
})

const currentStudentSchema = studentBaseSchema.extend({
  research: z.array(mz.nonEmptyString()).min(1),
})

const alumniSchema = studentBaseSchema.extend({
  endYear: yearSchema,

  /** A short note such as "Now pursuing a Ph.D. at ..." or "Joined ...". */
  description: mz.optionalString(),
})

export const peopleSingletonSchema = basicContentSchema
  .extend({
    title: mz.nonEmptyString().default("People"),
    summary: mz.nonEmptyString().default("Meet the current members and alumni."),
    current: z.record(mz.nonEmptyString(), z.array(currentStudentSchema).min(1)).default({}),
    alumni: z.record(mz.nonEmptyString(), z.array(alumniSchema).min(1)).default({}),
  })
  .superRefine(({ alumni }, ctx) => {
    for (const [role, people] of Object.entries(alumni)) {
      for (const [index, person] of people.entries()) {
        if (person.endYear < person.startYear) {
          ctx.addIssue({
            code: "custom",
            path: ["alumni", role, index, "endYear"],
            message: "endYear must not be earlier than startYear",
          })
        }
      }
    }
  })
