import type * as React from 'react'
import { Button, Text, Wrap } from '@chakra-ui/react'
import { icons } from '@tabler/icons-react'
import slugify from 'slug'

import SmartLink from '@/components/smart-link'
import { tagCounter } from '@/lib/coco'

export interface HomepageSectionPopularTagsProps {
  tags?: {
    tag: string
    icon?: string
    title?: string
  }[]
}

const HomepageSectionPopularTags: React.FC<HomepageSectionPopularTagsProps> = ({
  tags = [],
}: HomepageSectionPopularTagsProps) => {
  const popularTags: { tag: string; icon?: string; title?: string }[] = tags?.length
    ? tags
    : Object.keys(tagCounter)
        .sort((a, b) => tagCounter[b].count - tagCounter[a].count)
        .slice(0, 5)
        .map((tag) => ({ tag }))

  return (
    <Wrap w="full">
      {popularTags.map(({ tag, icon, title }, index) => {
        const tagSlug = slugify(tag)
        const IconSvg = icon && icon in icons ? icons[icon as keyof typeof icons] : icons.IconTag
        return (
          <Button
            asChild
            key={`tags-${tagSlug}`}
            mx="auto"
            w="160px"
            color="white"
            bgColor={`chart${(index + 1).toString()}`}
            rounded="lg"
            textTransform="capitalize"
          >
            <SmartLink href={`/tags/${tagSlug}`}>
              <IconSvg />
              <Text truncate>{title ?? tag}</Text>
            </SmartLink>
          </Button>
        )
      })}
    </Wrap>
  )
}

export default HomepageSectionPopularTags
