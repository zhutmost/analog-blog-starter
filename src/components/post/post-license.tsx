import {
  Box,
  Flex,
  GridItem,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  VisuallyHidden,
  VStack,
} from '@chakra-ui/react'
import {
  IconCreativeCommons,
  IconCreativeCommonsBy,
  IconCreativeCommonsNc,
  IconCreativeCommonsNd,
  IconCreativeCommonsSa,
  IconCreativeCommonsZero,
  type Icon as TablerIcon,
} from '@tabler/icons-react'

import SmartLink, { Link } from '@/components/smart-link'
import type { Post } from '@/lib/coco'
import siteConfig from '@/lib/site-config'

export type CreativeCommonsLicenseChoices =
  | 'cc-by-nc-sa'
  | 'cc-by-nc-nd'
  | 'cc-by-nc'
  | 'cc-by-nd'
  | 'cc-by-sa'
  | 'cc-by'
  | 'cc0'

const licenseIcons: Record<CreativeCommonsLicenseChoices, TablerIcon[]> = {
  'cc-by-nc-sa': [IconCreativeCommonsBy, IconCreativeCommonsNc, IconCreativeCommonsSa],
  'cc-by-nc-nd': [IconCreativeCommonsBy, IconCreativeCommonsNc, IconCreativeCommonsNd],
  'cc-by-nc': [IconCreativeCommonsBy, IconCreativeCommonsNc],
  'cc-by-nd': [IconCreativeCommonsBy, IconCreativeCommonsNd],
  'cc-by-sa': [IconCreativeCommonsSa],
  'cc-by': [IconCreativeCommonsBy],
  cc0: [IconCreativeCommonsZero],
}

function PostLicense({ post }: { post: Post }) {
  if (!(siteConfig.license || post.license)) return null

  const { title, authors, slug, datePublish, dateUpdate, license } = post
  const postUrl = new URL(`post/${slug}`, siteConfig.siteUrl).toString()

  const authorName = authors[0].name + (authors.length > 1 ? ' et al.' : '')

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
  const datePublishString = datePublish.toLocaleDateString(siteConfig.locale, dateOptions)
  const dateUpdateString = dateUpdate.toLocaleDateString(siteConfig.locale, dateOptions)

  const licenseMerged =
    license && license in licenseIcons
      ? (license as CreativeCommonsLicenseChoices)
      : siteConfig.license

  if (!licenseMerged) return null

  const licenseLink = new URL(
    licenseMerged === 'cc0' ? 'publicdomain/zero/1.0' : `licenses/${licenseMerged.slice(3)}/4.0`,
    'https://creativecommons.org/'
  ).toString()

  return (
    <Box
      position="relative"
      color="fg.muted"
      bgColor="bg.muted"
      borderColor="border"
      borderWidth="thin"
      rounded="md"
      p={5}
      overflow="hidden"
    >
      <Icon
        position="absolute"
        color="fg.muted"
        w={72}
        h={72}
        opacity={0.2}
        top="-70px"
        right="-50px"
      >
        <IconCreativeCommons />
      </Icon>

      <VStack alignItems="start" pb={5} position="relative" zIndex={1} gapY={0}>
        <Text fontWeight="semibold" fontSize="lg" truncate>
          {title}
        </Text>

        <Link href={postUrl} color="fg.muted" fontSize="sm" truncate>
          {postUrl}
        </Link>
      </VStack>
      <SimpleGrid columns={{ base: 2, md: 4 }} maxW="xl">
        <GridItem>
          <PostInfoItem title="Authors" content={authorName} />
        </GridItem>
        <GridItem>
          <PostInfoItem title="Posted on" content={datePublishString} />
        </GridItem>

        {dateUpdateString !== datePublishString && (
          <GridItem>
            <PostInfoItem title="Updated on" content={dateUpdateString} />
          </GridItem>
        )}

        <GridItem>
          <Flex direction="column">
            <Text fontSize="xs">Licensed under</Text>
            <SmartLink href={licenseLink}>
              <VisuallyHidden>{licenseMerged}</VisuallyHidden>
              <HStack gapX={0} fontWeight="semibold" mt={1}>
                {licenseIcons[licenseMerged].map((Icon, index) => (
                  <Icon key={`license-icon-${index.toString()}`} />
                ))}
              </HStack>
            </SmartLink>
          </Flex>
        </GridItem>
      </SimpleGrid>
    </Box>
  )
}

function PostInfoItem({ title, content }: { title: string; content: string }) {
  return (
    <VStack gapY={0} alignItems="start">
      <Text fontSize="xs">{title}</Text>
      <Text fontSize="sm" fontWeight="semibold">
        {content}
      </Text>
    </VStack>
  )
}

export default PostLicense
