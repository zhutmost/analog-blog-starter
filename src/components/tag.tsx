import slugify from '@sindresorhus/slugify'
import NextLink from 'next/link'

const Tag = ({ text }: { text: string }) => {
  return (
    <NextLink
      href={`/tags/${slugify(text)}`}
      className="mr-3 text-sm font-medium uppercase text-primary hover:text-primary/80"
    >
      # {text.split(' ').join('-')}
    </NextLink>
  )
}

export default Tag
