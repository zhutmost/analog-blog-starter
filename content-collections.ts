import path from "node:path"

import { defineCollection, defineConfig, defineSingleton } from "@content-collections/core"
import { z } from "zod"

import { authorContentSchema, authorTransform } from "@/content-collections/collections/authors"
import { mdxTransform } from "@/content-collections/collections/basic"
import { userpageContentSchema, userpageTransform } from "@/content-collections/collections/pages"
import { postContentSchema, postTransform } from "@/content-collections/collections/posts"
import { peopleSingletonSchema } from "@/content-collections/singletons/people"

const siteDir = process.env.SITE_DIR ?? "sites/demo"

const postCollection = defineCollection({
  name: "posts",
  directory: path.join(siteDir, "_posts"),
  include: ["**/*.mdx"],
  schema: postContentSchema,
  transform: postTransform,
})

const pageCollection = defineCollection({
  name: "pages",
  directory: path.join(siteDir, "_pages"),
  include: ["**/*.mdx"],
  schema: userpageContentSchema,
  transform: userpageTransform,
})

const authorCollection = defineCollection({
  name: "authors",
  directory: path.join(siteDir, "_authors"),
  include: ["*.mdx"],
  schema: authorContentSchema,
  transform: authorTransform,
})

const homeSingleton = defineSingleton({
  name: "homeIntro",
  filePath: path.join(siteDir, "home-intro.mdx"),
  optional: true,
  schema: z.object({
    content: z.string(),
  }),
  transform: async (file, ctx) => {
    const mdxTransformed = await mdxTransform(file, ctx)
    return { ...file, ...mdxTransformed }
  },
})

const peopleSingleton = defineSingleton({
  name: "peopleConfig",
  filePath: path.join(siteDir, "people.yml"),
  optional: true,
  parser: "yaml",
  schema: peopleSingletonSchema,
})

export default defineConfig({
  content: [postCollection, pageCollection, authorCollection, homeSingleton, peopleSingleton],
})
