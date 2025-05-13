import child_process from 'child_process'
import { writeFileSync } from 'fs'
import * as path from 'path'
import { defineCollection, defineConfig, type Context, type Meta } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import slugify from '@sindresorhus/slugify'
import scala from 'highlight.js/lib/languages/scala'
import verilog from 'highlight.js/lib/languages/verilog'
import { common as commonLanguages } from 'lowlight'
import readingTimeEstimate from 'reading-time'
import {
  rehypeGithubAlerts,
  type IOptions as rehypeGithubAlertsOptionsType,
} from 'rehype-github-alerts'
import rehypeHighlight from 'rehype-highlight'
import rehypeHighlightLines from 'rehype-highlight-code-lines'
import rehypeKatex from 'rehype-katex'
import rehypePresetMinify from 'rehype-preset-minify'
import rehypeProbeImageSize from 'rehype-probe-image-size'
import rehypeSlug from 'rehype-slug'
import rehypeUnwrapImages from 'rehype-unwrap-images'
import remarkFlexibleToc, { HeadingDepth, HeadingParent } from 'remark-flexible-toc'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import rehypeAssetCopy, { assetSourceRedirect } from '@/lib/content-collections/asset-copy'
import { countPostCategories, countPostTags } from '@/lib/content-collections/post-counter'

const dataDir: string = process.env.USER_DATA_DIR ?? 'data-demo'

interface BaseDoc {
  _meta: Meta
  content: string
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type TocItem = {
  value: string
  href: string
  depth: HeadingDepth
  numbering: number[]
  parent: HeadingParent
}

const rehypeGithubAlertsOptions: rehypeGithubAlertsOptionsType = {
  alerts: [
    {
      keyword: 'NOTE',
      icon: '<svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-info-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 9h.01" /><path d="M11 12h1v4h1" /></svg>',
      title: 'Note',
    },
    {
      keyword: 'IMPORTANT',
      icon: '<svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-alert-octagon"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12.802 2.165l5.575 2.389c.48 .206 .863 .589 1.07 1.07l2.388 5.574c.22 .512 .22 1.092 0 1.604l-2.389 5.575c-.206 .48 -.589 .863 -1.07 1.07l-5.574 2.388c-.512 .22 -1.092 .22 -1.604 0l-5.575 -2.389a2.036 2.036 0 0 1 -1.07 -1.07l-2.388 -5.574a2.036 2.036 0 0 1 0 -1.604l2.389 -5.575c.206 -.48 .589 -.863 1.07 -1.07l5.574 -2.388a2.036 2.036 0 0 1 1.604 0z" /><path d="M12 8v4" /><path d="M12 16h.01" /></svg>',
      title: 'Important',
    },
    {
      keyword: 'WARNING',
      icon: '<svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-alert-triangle"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 9v4" /><path d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z" /><path d="M12 16h.01" /></svg>',
      title: 'Warning',
    },
    {
      keyword: 'TIP',
      icon: '<svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-bulb"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" /><path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" /><path d="M9.7 17l4.6 0" /></svg>',
      title: 'Tip',
    },
    {
      keyword: 'CAUTION',
      icon: '<svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-biohazard"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M11.939 14c0 .173 .048 .351 .056 .533l0 .217a4.75 4.75 0 0 1 -4.533 4.745l-.217 0m-4.75 -4.75a4.75 4.75 0 0 1 7.737 -3.693m6.513 8.443a4.75 4.75 0 0 1 -4.69 -5.503l-.06 0m1.764 -2.944a4.75 4.75 0 0 1 7.731 3.477l0 .217m-11.195 -3.813a4.75 4.75 0 0 1 -1.828 -7.624l.164 -.172m6.718 0a4.75 4.75 0 0 1 -1.665 7.798" /></svg>',
      title: 'Caution',
    },
  ],
}

async function commonTransform(
  document: BaseDoc,
  context: Context
): Promise<{
  mdx: string
  slug: string
  dateUpdate: Date
  toc: TocItem[]
}> {
  const { mdx, toc } = await context.cache(document, async () => {
    const toc: TocItem[] = []

    const assetPath = path.join(context.collection.directory, document._meta.path)

    const mdx: string = await compileMDX(
      {
        ...context,
        cache: async (input, fn) => fn(input), // avoid nested caching
      },
      document,
      {
        remarkPlugins: [remarkGfm, remarkMath, [remarkFlexibleToc, { tocRef: toc }]],
        rehypePlugins: [
          [rehypeGithubAlerts, rehypeGithubAlertsOptions],
          rehypeKatex,
          [rehypeHighlight, { detect: true, languages: { ...commonLanguages, verilog, scala } }],
          [rehypeHighlightLines, { showLineNumbers: true }],
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

  // Slugged path without special chars
  const slug: string = document._meta.path
    .split('/')
    .map((part) => slugify(part)) // remove special chars
    .join('/')

  let dataUpdateStdout: string
  try {
    dataUpdateStdout = child_process
      .execSync(`git log -1 --format=%cd --date=short-local -- ${document._meta.filePath}`)
      .toString()
  } catch (error) {
    dataUpdateStdout = '' // Maybe this repo is not git-initialized
  }
  const dateUpdate: Date = dataUpdateStdout ? new Date(dataUpdateStdout) : new Date()

  return { mdx, slug, toc, dateUpdate }
}

const Posts = defineCollection({
  name: 'posts',
  directory: path.join(dataDir, 'posts'),
  include: ['**/*.mdx'],
  schema: (z) => ({
    title: z.string(),
    authors: z.string().array().default(['default']),
    datePublish: z.coerce.date(),
    summary: z.string(),
    category: z.string().default('Uncategorized'),
    tags: z.string().array().default([]),
    banner: z.string().optional(),
    draft: z.boolean().default(false),
    locale: z.string().default('en-US'),
    license: z.string().optional(),
  }),
  transform: async (document, context) => {
    const readingTime: number = readingTimeEstimate(document.content).minutes

    const banner: string | undefined = assetSourceRedirect(
      document.banner,
      path.join(context.collection.directory, document._meta.path)
    )

    return {
      ...document,
      ...(await commonTransform(document, context)),
      readingTime,
      banner,
    }
  },
  onSuccess: (docs) => {
    const tagCounter = countPostTags(docs)
    writeFileSync(path.join(dataDir, 'tag-data.json'), JSON.stringify(tagCounter))
    const categoryCounter = countPostCategories(docs)
    writeFileSync(path.join(dataDir, 'category-data.json'), JSON.stringify(categoryCounter))
    console.log('... Tag & Category count generated')
  },
})

const Authors = defineCollection({
  name: 'authors',
  directory: path.join(dataDir, 'authors'),
  include: ['**/*.mdx'],
  schema: (z) => ({
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
})

export default defineConfig({
  collections: [Posts, Authors],
})
