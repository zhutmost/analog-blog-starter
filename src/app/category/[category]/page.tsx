import { notFound, redirect } from 'next/navigation'
import slugify from 'slug'

import { postsByCategory } from '@/lib/coco'

export async function generateStaticParams(): Promise<{ category: string }[]> {
  return Object.keys(postsByCategory).map((tag) => {
    return {
      category: encodeURI(slugify(tag)),
    }
  })
}

export default async function Page(props: PageProps<'/category/[category]'>) {
  const { category: paramCategory } = await props.params
  const category = Object.keys(postsByCategory).find((t) => slugify(t) === decodeURI(paramCategory))

  if (!category) return notFound()

  redirect(`/category/${paramCategory}/1`)
}
