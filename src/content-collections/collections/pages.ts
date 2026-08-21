import { type CollectionContext, type Meta } from "@content-collections/core"
import { z } from "zod"

import {
  basicTransform,
  mdxContentSchema,
  mdxTransform,
} from "@/content-collections/collections/basic"

const RESERVED_USERPAGE_ROOT_SEGMENTS = new Set([
  "api",
  "author",
  "news",
  "people",
  "post",
  "posts",
])

export const userpageContentSchema = mdxContentSchema.extend({
  draft: z.boolean().default(false),
})

function assertAvailableUserpageSlug(slug: string, filePath: string): void {
  const rootSegment = slug.split("/").at(0)

  if (!rootSegment || !RESERVED_USERPAGE_ROOT_SEGMENTS.has(rootSegment)) {
    return
  }

  throw new Error(
    `Userpage "${filePath}" resolves to reserved route "/${slug}". ` +
      `The top-level segment "/${rootSegment}" is owned by the application.`
  )
}

export async function userpageTransform(
  file: { _meta: Meta } & z.infer<typeof userpageContentSchema>,
  ctx: CollectionContext
) {
  const basicTransformed = await basicTransform(file)
  assertAvailableUserpageSlug(basicTransformed.slug, file._meta.filePath)

  const mdxTransformed = await mdxTransform(file, ctx)

  return {
    ...basicTransformed,
    ...mdxTransformed,
  }
}
