import path from "node:path"

import { type Meta } from "@content-collections/core"
import { type CollectionContext } from "@content-collections/core"
import { compileMDX } from "@content-collections/mdx"
import { rehypeGithubAlerts } from "rehype-github-alerts"
import rehypeKatex from "rehype-katex"
import { rehypePrettyCode } from "rehype-pretty-code"
import rehypeProbeImageSize from "rehype-probe-image-size"
import rehypeSlug from "rehype-slug"
import rehypeUnwrapImages from "rehype-unwrap-images"
import remarkFlexibleToc, { type TocItem } from "remark-flexible-toc"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import slugify from "slug"
import { z } from "zod"

import { githubAlertsOptions } from "@/content-collections/rehype/github-alerts-options"
import { prettyCodeOptions } from "@/content-collections/rehype/pretty-code-options"
import { rehypeRewriteImageSrc } from "@/content-collections/rehype/rehype-rewrite-img-src"
import { rehypeTwemoji } from "@/content-collections/rehype/rehype-twemoji"
import { mz } from "@/lib/utils"

export const basicContentSchema = z.object({
  title: mz.nonEmptyString(),
  summary: mz.nonEmptyString(),
  comment: z.boolean().default(false),

  seo: z
    .object({
      description: mz.optionalString(),
      noIndex: z.boolean().default(false),
    })
    .prefault({}),
})

export const mdxContentSchema = basicContentSchema.extend({ content: z.string() })

export async function basicTransform<
  T extends { _meta: Meta } & z.infer<typeof basicContentSchema>,
>(file: T) {
  const { _meta: fileInfo, seo, ...contentFile } = file

  const slug: string = file._meta.path
    .split("/")
    .map((part) => slugify(part))
    .join("/")

  return {
    fileInfo,
    ...contentFile,
    seo: {
      description: seo.description ?? file.summary,
      noIndex: seo.noIndex,
    },
    slug,
  }
}

export async function mdxTransform(file: { _meta: Meta; content: string }, ctx: CollectionContext) {
  // Although `compileMDX` has its own cache, the TOC is produced via a remark plugin side effect
  // (`tocRef`). If compileMDX returns from cache, that side effect does not run. This outer cache
  // stores `{ content, toc }` together so the compiled MDX and its TOC are reused as one atomic result.
  return await ctx.cache({ filePath: file._meta.filePath, content: file.content }, async () => {
    const toc: TocItem[] = []

    const content: string = await compileMDX(ctx, file, {
      remarkPlugins: [remarkGfm, remarkMath, [remarkFlexibleToc, { tocRef: toc }]],
      rehypePlugins: [
        [rehypeGithubAlerts, githubAlertsOptions],
        rehypeKatex,
        [rehypePrettyCode, prettyCodeOptions],
        rehypeSlug,
        [
          rehypeRewriteImageSrc,
          { assetDirPath: path.posix.join("_assets", ctx.collection.directory, file._meta.path) },
        ],
        rehypeUnwrapImages,
        // @ts-expect-error Types not assignable
        [rehypeProbeImageSize, { staticDir: "public" }],
        rehypeTwemoji,
      ],
    })
    return {
      content,
      toc: toc.map(({ data: _data, parent: _parent, ...item }) => item),
    }
  })
}
