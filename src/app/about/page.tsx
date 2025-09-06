import { MDXContent } from '@content-collections/mdx/react'
import type { Metadata } from 'next'

import mdxComponents from '@/components/mdx/mdx-components'
import AuthorLayout from '@/layouts/author-layout'
import { authorDefault } from '@/lib/coco'
import generatePageMetadata from '@/lib/page-metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'About',
  description: authorDefault.head?.description,
  locale: authorDefault.head?.locale,
})

export default function Page() {
  return (
    <AuthorLayout author={authorDefault}>
      <MDXContent code={authorDefault.mdx} components={mdxComponents} />
    </AuthorLayout>
  )
}
