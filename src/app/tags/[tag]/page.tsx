import { notFound, redirect } from 'next/navigation'
import slugify from 'slug'

import { postsByTag } from '@/lib/coco'

export async function generateStaticParams(): Promise<{ tag: string }[]> {
  return Object.keys(postsByTag).map((tag) => {
    return {
      tag: encodeURI(slugify(tag)),
    }
  })
}

export default async function Page(props: PageProps<'/tags/[tag]'>) {
  const { tag: paramTag } = await props.params
  const tag = Object.keys(postsByTag).find((t) => slugify(t) === decodeURI(paramTag))

  if (!tag) return notFound()

  redirect(`/tags/${paramTag}/1`)
}
