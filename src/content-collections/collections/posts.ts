import child_process from "node:child_process"
import path from "node:path"

import { type CollectionContext, type Meta } from "@content-collections/core"
import slugify from "slug"
import { z } from "zod"

import {
  basicTransform,
  mdxContentSchema,
  mdxTransform,
} from "@/content-collections/collections/basic"
import { normalizePublicUrl } from "@/content-collections/rehype/rehype-rewrite-img-src"
import { mz } from "@/lib/utils"

const postAuthorSchema = z.union([
  mz.nonEmptyString(),

  z.object({
    name: mz.nonEmptyString(),
    href: mz.href().optional(),
  }),
])

export const postContentSchema = mdxContentSchema.extend({
  comment: z.boolean().default(true),

  authors: z.array(postAuthorSchema).default([]),
  datePublish: z.iso.date(),
  dateUpdate: z.iso.date().optional(),
  category: mz.nonEmptyString(),
  tags: z.array(mz.nonEmptyString()).default([]),
  cover: mz.optionalString(),
  draft: z.boolean().default(false),
})

function taxonomyToRef(taxonomy: string) {
  return { name: taxonomy, slug: slugify(taxonomy) }
}

function getGitDateUpdate(filePath: string): string | undefined {
  try {
    const isShallowRepository =
      child_process
        .execFileSync("git", ["rev-parse", "--is-shallow-repository"], { encoding: "utf8" })
        .trim() === "true"

    // File history is not reliable in a shallow clone. Let the caller use its semantic fallback instead.
    if (isShallowRepository) {
      return undefined
    }

    const date = child_process
      .execFileSync("git", ["log", "-1", "--format=%cs", "--", filePath], { encoding: "utf8" })
      .trim()

    return date || undefined
  } catch {
    return undefined
  }
}

export async function postTransform(
  file: { _meta: Meta } & z.infer<typeof postContentSchema>,
  ctx: CollectionContext
) {
  const basicTransformed = await basicTransform(file)
  const mdxTransformed = await mdxTransform(file, ctx)

  const gitDateUpdate = getGitDateUpdate(path.join(ctx.collection.directory, file._meta.filePath))
  const dateUpdate = file.dateUpdate ?? gitDateUpdate ?? file.datePublish

  const cover = normalizePublicUrl(
    path.posix.join("_assets", ctx.collection.directory, file._meta.path),
    file.cover
  )

  return {
    ...basicTransformed,
    ...mdxTransformed,

    dateUpdate: dateUpdate > file.datePublish ? dateUpdate : file.datePublish,
    cover,
    category: taxonomyToRef(file.category),
    tags: file.tags.map(taxonomyToRef),
  }
}
