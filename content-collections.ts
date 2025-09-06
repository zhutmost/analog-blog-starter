import * as console from 'node:console'
import * as path from 'node:path'
import { type Context, defineCollection, defineConfig, type Meta } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import readingTimeEstimate from 'reading-time'
import { rehypeGithubAlerts } from 'rehype-github-alerts'
import rehypeKatex from 'rehype-katex'
import rehypeMdxCodeProps from 'rehype-mdx-code-props'
import rehypePreLanguage from 'rehype-pre-language'
import rehypePresetMinify from 'rehype-preset-minify'
import rehypeProbeImageSize from 'rehype-probe-image-size'
import rehypeSlug from 'rehype-slug'
import rehypeUnwrapImages from 'rehype-unwrap-images'
import remarkFlexibleToc, { type TocItem } from 'remark-flexible-toc'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import slugify from 'slug'
import { z } from 'zod'

import rehypeAssetCopy, { assetSourceRedirect } from '@/coco/rehype-asset-copy'
import { rehypeGithubAlertsOptions } from '@/coco/rehype-gfm-alert'
import { assertSlugUnique, getDataUpdate } from '@/coco/utils'

const USER_DATA_DIR: string = process.env.USER_DATA_DIR ?? 'data/demo'

async function commonTransform(
  document: {
    _meta: Meta
    content: string
  },
  context: Context
): Promise<{
  mdx: string
  slug: string
  dateUpdate: Date
  toc: Omit<TocItem, 'data'>[]
}> {
  const { mdx, toc } = await context.cache(document, async () => {
    const toc: TocItem[] = []

    const assetPath = path.join(context.collection.directory, document._meta.path)

    const mdx: string = await compileMDX(
      {
        cache: async (input, fn) => fn(input), // avoid nested caching
      },
      document,
      {
        remarkPlugins: [remarkGfm, remarkMath, [remarkFlexibleToc, { tocRef: toc }]],
        rehypePlugins: [
          [rehypeGithubAlerts, rehypeGithubAlertsOptions],
          rehypeKatex,
          rehypeMdxCodeProps,
          [rehypePreLanguage, 'language'],
          rehypeSlug,
          [rehypeAssetCopy, { assetPath }],
          rehypeUnwrapImages,
          // @ts-expect-error Types not assignable
          [rehypeProbeImageSize, { staticDir: 'public' }],
          rehypePresetMinify,
        ],
      }
    )
    return { mdx, toc }
  })

  const slug: string = document._meta.path
    .split('/')
    .map((part) => slugify(part))
    .join('/')

  const dateUpdate: Date = getDataUpdate(
    path.join(context.collection.directory, document._meta.filePath)
  )

  return { mdx, toc, slug, dateUpdate }
}

function printCollectionInfo(
  collectionName: string,
  docs: { slug: string; dateUpdate: Date }[]
): void {
  console.log(
    `  - [${collectionName}] collected, including ${docs.length.toString()} documents. ` +
      `Latest documents in [${collectionName}]:`
  )
  docs
    .toSorted((a) => a.dateUpdate.getTime())
    .slice(-3)
    .forEach((doc) => {
      console.log(`    - ${doc.slug} - Last updated: ${doc.dateUpdate.toLocaleString()}`)
    })
}

const authors = defineCollection({
  name: 'authors',
  directory: path.join(USER_DATA_DIR, 'authors'),
  include: ['**/*.mdx'],
  schema: z.object({
    name: z.string(),
    avatar: z.string().optional(),
    bio: z.string().optional(),
    affiliation: z.string().optional(),
    icons: z
      .record(
        z.string(),
        z.object({
          icon: z.string(),
          href: z.string(),
        })
      )
      .optional(),
    head: z
      .object({
        description: z.string().optional(),
        locale: z.string().default('en-US'),
      })
      .optional(),
  }),
  transform: async (document, context) => {
    const avatar: string | undefined = assetSourceRedirect(
      document.avatar,
      path.join(context.collection.directory, document._meta.path)
    )

    return {
      ...document,
      ...(await commonTransform(document, context)),
      avatar,
    }
  },
  onSuccess: (docs) => {
    assertSlugUnique(docs, 'authors')
    printCollectionInfo('authors', docs)
  },
})

const posts = defineCollection({
  name: 'posts',
  directory: path.join(USER_DATA_DIR, 'posts'),
  include: ['**/*.mdx'],
  schema: z.object({
    title: z.string(),
    authors: z
      .array(
        z.union([
          z.string(),
          z.object({
            name: z.string(),
            href: z.string().optional(),
            avatar: z.string().optional(),
            bio: z.string().optional(),
          }),
        ])
      )
      .default(['default']),
    datePublish: z.coerce.date(),
    summary: z.string(),
    category: z.string().default('Uncategorized'),
    tags: z.string().array().default([]),
    banner: z.string().optional(),
    draft: z.boolean().default(false),
    license: z.string().optional(),
    head: z
      .object({
        description: z.string().optional(),
        locale: z.string().default('en-US'),
      })
      .optional(),
  }),
  transform: async (document, context) => {
    const readingTime: number = readingTimeEstimate(document.content).minutes

    const banner: string | undefined = assetSourceRedirect(
      document.banner,
      path.join(context.collection.directory, document._meta.path)
    )
    const authors = document.authors.map((author) => {
      if (typeof author === 'string') {
        return { name: author, href: undefined, avatar: undefined, bio: undefined }
      }
      const avatar = assetSourceRedirect(
        author.avatar,
        path.join(context.collection.directory, document._meta.path)
      )
      return { ...author, avatar }
    })

    return {
      ...document,
      ...(await commonTransform(document, context)),
      readingTime,
      authors,
      banner,
    }
  },
  onSuccess: (docs) => {
    assertSlugUnique(docs, 'posts')
    printCollectionInfo('posts', docs)
  },
})

const pages = defineCollection({
  name: 'pages',
  directory: path.join(USER_DATA_DIR, 'pages'),
  include: ['**/*.mdx'],
  schema: z.object({
    title: z.string(),
    greeting: z.string().optional(),
    head: z
      .object({
        description: z.string().optional(),
        locale: z.string().default('en-US'),
      })
      .optional(),
  }),
  transform: async (document, context) => {
    return {
      ...document,
      ...(await commonTransform(document, context)),
    }
  },
  onSuccess: (docs) => {
    assertSlugUnique(docs, 'pages')
    printCollectionInfo('pages', docs)
  },
})

export default defineConfig({
  collections: [posts, authors, pages],
})
