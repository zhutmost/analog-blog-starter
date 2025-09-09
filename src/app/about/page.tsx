import type { Metadata } from 'next'

import MdxProse from '@/components/mdx/mdx-prose'
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
      <MdxProse code={authorDefault.mdx} />
    </AuthorLayout>
  )
}
