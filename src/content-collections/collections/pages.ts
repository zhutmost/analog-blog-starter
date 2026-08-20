import { type CollectionContext, type Meta } from "@content-collections/core"
import { z } from "zod"

import {
  basicTransform,
  mdxContentSchema,
  mdxTransform,
} from "@/content-collections/collections/basic"

export const userpageContentSchema = mdxContentSchema.extend({
  draft: z.boolean().default(false),
})

export async function userpageTransform(
  file: { _meta: Meta } & z.infer<typeof userpageContentSchema>,
  ctx: CollectionContext
) {
  const basicTransformed = await basicTransform(file)
  const mdxTransformed = await mdxTransform(file, ctx)

  return {
    ...basicTransformed,
    ...mdxTransformed,
  }
}
