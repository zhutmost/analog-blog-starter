import {
  AspectRatio,
  Box,
  Button,
  EmptyState,
  Flex,
  GridItem,
  Heading,
  Icon,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  VStack,
  Wrap,
} from '@chakra-ui/react'
import { IconArrowRight, IconWritingSign } from '@tabler/icons-react'
import NextLink from 'next/link'
import slugify from 'slug'

import PostPagination from '@/components/post/post-pagination'
import PostTag from '@/components/post/post-tag'
import SmartImage from '@/components/smart-image'
import SmartLink, { Link } from '@/components/smart-link'
import Twemojify from '@/components/twemojify'
import type { Post } from '@/lib/coco'
import siteConfig from '@/lib/site-config'

export default function PostCard({ post }: { post: Post }) {
  const { title, summary, datePublish, slug, tags, banner, category, readingTime } = post
  const datePublishString = datePublish.toLocaleDateString(siteConfig.locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <VStack w="full">
      {banner && (
        <AspectRatio ratio={5 / 2} w="full">
          <LinkBox w="full">
            <SmartImage
              src={banner}
              alt={`Cover image of post: ${title}`}
              rounded="md"
              bgColor="bg.muted"
            />
            <LinkOverlay asChild>
              <SmartLink href={`/post/${slug}`} aria-label={`Read more: ${title}`} />
            </LinkOverlay>
          </LinkBox>
        </AspectRatio>
      )}

      <SimpleGrid columns={{ base: 1, lg: 4 }} w="full" py={2}>
        <GridItem colSpan={1}>
          <Stack
            direction={{ base: 'row', lg: 'column' }}
            justifyContent={{ base: 'space-between', lg: 'start' }}
            w="full"
          >
            <Box>
              <VisuallyHidden>Category</VisuallyHidden>
              <Text fontWeight="semibold" color="fg" _hover={{ color: 'fg/80' }}>
                <Link href={`/category/${slugify(category)}`}>
                  <Twemojify>{category}</Twemojify>
                </Link>
              </Text>
            </Box>

            <Box>
              <VisuallyHidden>Published date</VisuallyHidden>
              <Text fontSize="sm" color="fg.muted">
                <time dateTime={datePublish.toISOString()}>{datePublishString}</time>
              </Text>
            </Box>

            <Box display={{ base: 'none', lg: 'block' }}>
              <VisuallyHidden>Estimated reading time</VisuallyHidden>
              <Text fontSize="sm" color="fg.muted">
                {Math.round(readingTime)} min read
              </Text>
            </Box>
          </Stack>
        </GridItem>

        <GridItem colSpan={{ base: 1, lg: 3 }}>
          <VStack gap={3} align="start" w="full">
            <Box>
              <Heading
                as="h3"
                size="2xl"
                color="fg"
                _hover={{ color: 'fg/80' }}
                fontWeight="bold"
                letterSpacing="tight"
                truncate
              >
                <Link href={`/post/${slug}`}>
                  <Twemojify>{title}</Twemojify>
                </Link>
              </Heading>

              {tags.length > 0 && (
                <Wrap>
                  {tags.map((tag) => (
                    <PostTag key={tag} text={tag} />
                  ))}
                </Wrap>
              )}
            </Box>

            <Text color="fg.muted" lineClamp={3}>
              <Twemojify>{summary}</Twemojify>
            </Text>

            <Box>
              <Link
                href={`/post/${slug}`}
                color="brand"
                fontWeight="medium"
                _hover={{ color: 'brand/80' }}
                aria-label={`Read more: ${title}`}
              >
                <Flex align="center">
                  Read more
                  <Icon ml={1} boxSize={5}>
                    <IconArrowRight />
                  </Icon>
                </Flex>
              </Link>
            </Box>
          </VStack>
        </GridItem>
      </SimpleGrid>
    </VStack>
  )
}

function PostEmptyList() {
  return (
    <EmptyState.Root alignSelf="center">
      <EmptyState.Content>
        <EmptyState.Indicator>
          <IconWritingSign />
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title color="fg">No posts here yet.</EmptyState.Title>
          <EmptyState.Description>
            Adventures begin where words end... check back soon.
          </EmptyState.Description>
        </VStack>
        <Button asChild>
          <NextLink href="/">Back to Home</NextLink>
        </Button>
      </EmptyState.Content>
    </EmptyState.Root>
  )
}

export interface PostCardListProps {
  currentPage: number
  allPosts: Post[]
  pagination?: number
}

export function PostCardList({
  currentPage,
  allPosts,
  pagination = siteConfig.pagination,
}: PostCardListProps) {
  const totalPages = Math.ceil(allPosts.length / pagination)

  // if the page number is out of bounds, return the first page
  const activePage = Math.max(1, Math.min(currentPage, totalPages))

  const posts = allPosts.slice((activePage - 1) * pagination, activePage * pagination)

  if (posts.length === 0) return <PostEmptyList />

  return (
    <VStack gapY={8}>
      <VStack as="ul" gapY={8}>
        {posts.map((post) => (
          <Box as="li" key={post.slug} w="full">
            <PostCard post={post} />
          </Box>
        ))}
      </VStack>
      {totalPages > 1 && (
        <PostPagination page={activePage} count={allPosts.length} defaultPageSize={pagination} />
      )}
    </VStack>
  )
}
