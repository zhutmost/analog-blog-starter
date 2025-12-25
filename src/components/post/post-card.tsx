import {
  AspectRatio,
  Avatar,
  Badge,
  Box,
  Button,
  EmptyState,
  Flex,
  Heading,
  HStack,
  Icon,
  LinkBox,
  LinkOverlay,
  Menu,
  Portal,
  Spacer,
  Stack,
  Text,
  VisuallyHidden,
  VStack,
  Wrap,
} from '@chakra-ui/react'
import { IconArrowRight, IconWritingSign } from '@tabler/icons-react'
import NextLink from 'next/link'
import slugify from 'slug'

import AuthorLittleCard from '@/components/author-little-card'
import PostPagination from '@/components/post/post-pagination'
import PostTag from '@/components/post/post-tag'
import SmartImage from '@/components/smart-image'
import SmartLink, { Link } from '@/components/smart-link'
import Twemojify from '@/components/twemojify'
import type { Post } from '@/lib/coco'
import siteConfig from '@/lib/site-config'

export default function PostCard({ post }: { post: Post }) {
  const { title, summary, authors, datePublish, slug, tags, banner, category, readingTime } = post
  const datePublishString = datePublish.toLocaleDateString(siteConfig.locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
  const firstAuthors = authors.slice(0, 2)
  const otherAuthors = authors.slice(2)

  return (
    <Stack as="article" direction={{ base: 'column', lg: 'row' }} w="full" gapX={6}>
      {banner && (
        <AspectRatio ratio={{ base: 5 / 2, lg: 1 }} w={{ base: 'full', lg: '20rem' }}>
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
      <VStack align="start" w="full" py={1}>
        <HStack justify="space-between" w="full" gapX={4}>
          <Badge size="md" rounded="full" px={3}>
            <Link href={`/category/${slugify(category)}`}>
              <VisuallyHidden>Category</VisuallyHidden>
              <Twemojify>{category}</Twemojify>
            </Link>
          </Badge>
          <Spacer />
          <Text fontSize="sm" color="fg.muted">
            <VisuallyHidden>Published date</VisuallyHidden>
            <time dateTime={datePublish.toISOString()}>{datePublishString}</time>
            &nbsp;&nbsp;·&nbsp;&nbsp;
            <VisuallyHidden>Estimated reading time</VisuallyHidden>
            {Math.round(readingTime)} min read
          </Text>
        </HStack>
        <Link asChild href={`/post/${slug}`}>
          <Heading
            as="h3"
            size="2xl"
            color="fg"
            _hover={{ color: 'fg/80' }}
            fontWeight="bold"
            letterSpacing="tight"
            lineClamp={1}
          >
            <Twemojify>{title}</Twemojify>
          </Heading>
        </Link>
        {tags.length > 0 && (
          <Wrap>
            {tags.map((tag) => (
              <PostTag key={tag} text={tag} />
            ))}
          </Wrap>
        )}
        <Text color="fg.muted" lineClamp={3}>
          <Twemojify>{summary}</Twemojify>
        </Text>
        <Spacer />
        <Flex w="full" align="end" gap={4}>
          {firstAuthors.map(({ name, avatar, href }) => (
            <Box key={name} hideBelow="lg">
              <AuthorLittleCard name={name} avatar={avatar} href={href} />
            </Box>
          ))}
          {otherAuthors.length > 0 && (
            <Menu.Root positioning={{ placement: 'bottom' }}>
              <Menu.Trigger rounded="full" focusRing="outside">
                <Avatar.Root variant="outline" hideBelow="lg">
                  <Avatar.Fallback>+{otherAuthors.length}</Avatar.Fallback>
                </Avatar.Root>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    {otherAuthors.map(({ name, avatar, href }) => (
                      <Menu.Item asChild value={name} key={name}>
                        <SmartLink href={href}>
                          <Avatar.Root size="xs">
                            <Avatar.Image src={avatar} alt={`Avatar of ${name}`} />
                            <Avatar.Fallback name={name} />
                          </Avatar.Root>
                          {name}
                        </SmartLink>
                      </Menu.Item>
                    ))}
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          )}
          <Spacer />
          <Link
            href={`/post/${slug}`}
            color="brand"
            fontWeight="medium"
            _hover={{ color: 'brand/80' }}
            aria-label={`Read more: ${title}`}
          >
            <Flex align="center">
              Read more
              <Icon mx={1} boxSize={5}>
                <IconArrowRight />
              </Icon>
            </Flex>
          </Link>
        </Flex>
      </VStack>
    </Stack>
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
    <VStack gapY={8} w="full">
      <VStack as="ul" gapY={12} w="full">
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
