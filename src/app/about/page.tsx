import type { Metadata } from 'next'

import MdxProse from '@/components/mdx/mdx-prose'
import { authorDefault } from '@/lib/coco'
import generatePageMetadata from '@/lib/page-metadata'
import AuthorTemplate from '@/templates/author-template'

export const metadata: Metadata = generatePageMetadata({
  title: 'About',
  description: authorDefault.head?.description,
  locale: authorDefault.head?.locale,
})

export default function Page() {
  return (
    <AuthorTemplate author={authorDefault}>
      <MdxProse code={authorDefault.mdx} />
    </AuthorTemplate>
  )
}
