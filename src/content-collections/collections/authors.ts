import path from "node:path"

import { type CollectionContext, type Meta } from "@content-collections/core"
import { z } from "zod"

import {
  basicTransform,
  mdxContentSchema,
  mdxTransform,
} from "@/content-collections/collections/basic"
import { normalizePublicUrl } from "@/content-collections/rehype/rehype-rewrite-img-src"
import { mz } from "@/lib/utils"

export const authorContentSchema = mdxContentSchema.extend({
  avatar: mz.optionalString(),
  info: z
    .array(
      z.object({
        label: mz.nonEmptyString(),
        value: mz.nonEmptyString(),
      })
    )
    .default([]),
  socials: z
    .array(
      z.object({
        label: mz.nonEmptyString(),
        href: mz.href(),
        icon: mz.nonEmptyString(),
      })
    )
    .default([]),
})

export async function authorTransform(
  file: { _meta: Meta } & z.infer<typeof authorContentSchema>,
  ctx: CollectionContext
) {
  const basicTransformed = await basicTransform(file)
  const mdxTransformed = await mdxTransform(file, ctx)

  return {
    ...basicTransformed,
    ...mdxTransformed,

    name: basicTransformed.title,
    avatar: normalizePublicUrl(
      path.posix.join("_assets", ctx.collection.directory, file._meta.path),
      file.avatar
    ),
  }
}
