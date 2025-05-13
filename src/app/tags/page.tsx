import slugify from '@sindresorhus/slugify'
import NextLink from 'next/link'

import Tag from '@/components/tag'
import tagData from '@/data/tag-data.json'
import { TagCounter } from '@/lib/content-collections/post-counter'
import { generatePageMetadata } from '@/lib/page-metadata'

export const metadata = generatePageMetadata({
  title: 'All Tags',
  description: 'Things I blog about',
})

// eslint-disable-next-line @typescript-eslint/require-await
export default async function Page() {
  const tagCounter = tagData as TagCounter
  const tags = Object.keys(tagCounter)
  const tagsSorted = tags.sort((a, b) => tagCounter[b] - tagCounter[a])
  return (
    <>
      <div className="flex flex-col items-start justify-start divide-y divide-border md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
        <div className="space-x-2 pb-8 pt-6 md:space-y-5">
          <h1 className="md:leading-14 text-3xl font-extrabold leading-9 tracking-tight text-foreground sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl">
            Tags
          </h1>
        </div>
        <div className="flex max-w-lg flex-wrap">
          {tags.length === 0 && 'No tags found.'}
          {tagsSorted.map((t) => {
            return (
              <div key={t} className="mb-2 mr-5 mt-2">
                <Tag text={t} />
                <NextLink
                  href={`/tags/${slugify(t)}`}
                  className="-ml-2 text-sm font-semibold uppercase text-foreground/80"
                  aria-label={`View posts tagged ${t}`}
                >
                  {` (${tagCounter[t].toString()})`}
                </NextLink>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
