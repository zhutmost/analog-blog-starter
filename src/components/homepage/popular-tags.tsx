import * as React from 'react'
import slugify from '@sindresorhus/slugify'
import { icons } from '@tabler/icons-react'
import NextLink from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import tagData from '@/data/tag-data.json'
import { TagCounter } from '@/lib/content-collections/post-counter'
import siteConfig from '@/lib/site-config'
import { cn } from '@/lib/utils'

export default function PopularTags() {
  let popularTags: { tag: string; icon?: string; title?: string }[]
  if (siteConfig.homepage.popularTags.length > 0) {
    popularTags = siteConfig.homepage.popularTags
  } else {
    const tagCounter = tagData as TagCounter
    const tagsSorted = Object.keys(tagCounter).sort((a, b) => tagCounter[b] - tagCounter[a])
    popularTags = tagsSorted.slice(0, 5).map((tag) => ({
      tag,
    }))
  }

  const chartColors = [
    'bg-chart-1 hover:bg-chart-1/80',
    'bg-chart-2 hover:bg-chart-2/80',
    'bg-chart-3 hover:bg-chart-3/80',
    'bg-chart-4 hover:bg-chart-4/80',
    'bg-chart-5 hover:bg-chart-5/80',
  ]

  return (
    <div className="grid grid-cols-2 gap-4 py-6 sm:grid-cols-3 lg:grid-cols-5">
      {popularTags.map((popularTag, index) => {
        const { tag, icon, title } = popularTag
        const tagSlug = slugify(tag)

        const IconSvg = icon && icon in icons ? icons[icon as keyof typeof icons] : icons.IconTag

        const bgColor = chartColors[index % chartColors.length]

        return (
          <NextLink
            key={tag}
            href={`/tags/${tagSlug}`}
            className={cn(
              buttonVariants({ size: 'lg', variant: 'default' }),
              `${bgColor} mx-auto w-[160px] space-x-2 px-3 text-white`
            )}
          >
            <IconSvg className="size-6" />
            <div className="my-auto truncate text-base">{title ?? tag}</div>
          </NextLink>
        )
      })}
    </div>
  )
}
