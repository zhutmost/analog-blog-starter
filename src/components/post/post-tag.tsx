import { Text } from '@chakra-ui/react'
import slugify from 'slug'

import { Link } from '@/components/smart-link'

export interface PostTagProps {
  text: string
  count?: number
}

export default function PostTag({ text, count }: PostTagProps) {
  return (
    <Link
      href={`/tags/${slugify(text)}`}
      pr={2}
      fontSize="sm"
      fontWeight="medium"
      textTransform="uppercase"
      color="brand"
      _hover={{ color: 'brand/80' }}
    >
      # {text.split(' ').join('-')}
      {count && <Text color="fg.muted">({count})</Text>}
    </Link>
  )
}
