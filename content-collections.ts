import path from "node:path"

import { defineCollection, defineConfig, defineSingleton } from "@content-collections/core"

import { authorContentSchema, authorTransform } from "@/content-collections/collections/authors"
import { userpageContentSchema, userpageTransform } from "@/content-collections/collections/pages"
import { postContentSchema, postTransform } from "@/content-collections/collections/posts"
import { homeSingletonSchema, homeTransform } from "@/content-collections/singletons/home"
import { newsSingletonSchema } from "@/content-collections/singletons/news"
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
  name: "homeConfig",
  filePath: path.join(siteDir, "home.mdx"),
  schema: homeSingletonSchema,
  transform: homeTransform,
})

const newsSingleton = defineSingleton({
  name: "newsConfig",
  filePath: path.join(siteDir, "news.yml"),
  optional: true,
  parser: "yaml",
  schema: newsSingletonSchema,
})

const peopleSingleton = defineSingleton({
  name: "peopleConfig",
  filePath: path.join(siteDir, "people.yml"),
  optional: true,
  parser: "yaml",
  schema: peopleSingletonSchema,
})

export default defineConfig({
  content: [
    postCollection,
    pageCollection,
    authorCollection,
    homeSingleton,
    newsSingleton,
    peopleSingleton,
  ],
})
