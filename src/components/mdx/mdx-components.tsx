import * as React from 'react'
import { MDXComponents } from 'mdx/types'

import HeadingLinkIcon from '@/components/mdx/heading-link-icon'
import MdxImage from '@/components/mdx/mdx-image'
import MdxLink from '@/components/mdx/mdx-link'
import MdxTable from '@/components/mdx/mdx-table'
import PreCodeCopy from '@/components/mdx/pre-code-copy'
import Image from '@/components/smart-image'
import { AspectRatio } from '@/components/ui/aspect-ratio'

const components: MDXComponents = {
  a: MdxLink,
  h1: (props) => <HeadingLinkIcon level={1} {...props} />,
  h2: (props) => <HeadingLinkIcon level={2} {...props} />,
  h3: (props) => <HeadingLinkIcon level={3} {...props} />,
  // h4: (props) => <HeadingLinkIcon level={4} {...props} />,
  // h5: (props) => <HeadingLinkIcon level={5} {...props} />,
  // h6: (props) => <HeadingLinkIcon level={6} {...props} />,
  img: MdxImage,
  table: MdxTable,
  pre: PreCodeCopy,
  AspectRatio,
  Image,
}

export default components
