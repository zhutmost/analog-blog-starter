import type * as React from 'react'
import {
  AspectRatio,
  Bleed,
  Box,
  Image as ChakraImage,
  GridItem,
  Heading,
  Separator,
  SimpleGrid,
  StackSeparator,
  Text,
  VStack,
  Wrap,
} from '@chakra-ui/react'

import NextImageWithBasePath from '@/components/common/next-image-with-base-path'
import { Link } from '@/components/common/smart-link'
import PostComment from '@/components/features/comment/post-comment'
import AuthorCard from '@/components/features/post/author-card'
import PostLicense from '@/components/features/post/post-license'
import PostTag from '@/components/features/post/post-tag'
import PostToc from '@/components/features/post/post-toc'
import MdxProse from '@/components/mdx/mdx-prose'
import type { Post } from '@/lib/coco'
import siteConfig from '@/lib/site-config'

export interface PostTemplateProps {
  post: Post
  postNext?: Post
  postPrev?: Post
}

function PostSidebarItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <VStack alignItems="start">
      <Text
        fontSize="xs"
        fontWeight="medium"
        lineHeight="short"
        letterSpacing="wide"
        color="fg.muted"
        textTransform="uppercase"
      >
        {label}
      </Text>
      {children}
    </VStack>
  )
}

function PostSidebar({ post, postNext, postPrev }: Omit<PostTemplateProps, 'children'>) {
  const { authors, tags, toc } = post

  // Because the 1st item is the post title, we filter out the 1st item. So it will display 2nd and 3rd level headings.
  const filteredToc = toc.filter((item) => item.depth <= 3)

  return (
    <VStack
      separator={<StackSeparator hideBelow="lg" />}
      gapY={{ base: 4, lg: 6 }}
      w="full"
      h="full"
      alignItems="start"
      pb={4}
    >
      <Wrap py={2} gapY={6} gapX={10} w="full">
        <PostSidebarItem label="Posted by">
          <Wrap alignItems="start" gapX={6}>
            {authors.map(({ name, href, bio, avatar }) => (
              <AuthorCard key={name} name={name} avatar={avatar} bio={bio} href={href} />
            ))}
          </Wrap>
        </PostSidebarItem>
      </Wrap>

      {tags.length && (
        <PostSidebarItem label={'Tags'}>
          <Wrap>
            {tags.map((tag) => (
              <PostTag key={tag} text={tag} />
            ))}
          </Wrap>
        </PostSidebarItem>
      )}

      {(postNext ?? postPrev) && (
        <Wrap justifyContent="space-between" w="full" gap={{ base: 4, lg: 8 }}>
          {postPrev && (
            <PostSidebarItem label="Previous Article">
              <Link
                href={`/post/${postPrev.slug}`}
                fontSize="sm"
                fontWeight="medium"
                color="brand"
                _hover={{ color: 'brand/80' }}
              >
                {postPrev.title}
              </Link>
            </PostSidebarItem>
          )}
          {postNext && (
            <PostSidebarItem label="Next Article">
              <Link
                href={`/post/${postNext.slug}`}
                fontSize="sm"
                fontWeight="medium"
                color="brand"
                _hover={{ color: 'brand/80' }}
              >
                {postNext.title}
              </Link>
            </PostSidebarItem>
          )}
        </Wrap>
      )}

      {filteredToc.length > 0 && (
        <Box height="full" hideBelow="lg" p={0}>
          <Box position="sticky" top={20} insetX={0}>
            <PostSidebarItem label="Table of Contents">
              <PostToc toc={toc} />
            </PostSidebarItem>
          </Box>
        </Box>
      )}
    </VStack>
  )
}

function PostHeader({ post }: { post: Post }) {
  const { title, banner, datePublish } = post

  function formatDate(date: Date): string {
    return date.toLocaleDateString(post.head?.locale ?? siteConfig.locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <VStack as="header" py="6" w="full">
      {banner && (
        <Bleed
          w={{ base: '100vw', lg: 'full' }}
          blockStart={{ base: 8, lg: 0 }} // gap 2 + padding 6 = 8
          mb={{ base: 5, lg: 10 }}
        >
          <AspectRatio ratio={5 / 2} w="full">
            <ChakraImage asChild bgColor="bg.muted">
              <NextImageWithBasePath
                src={banner}
                alt={`Cover image of post: ${title}`}
                fill
                preload
              />
            </ChakraImage>
          </AspectRatio>
        </Bleed>
      )}
      <Heading
        as="h1"
        size="5xl"
        fontWeight="extrabold"
        letterSpacing="tight"
        color="fg"
        alignSelf={{ base: 'start', lg: 'center' }}
      >
        {title}
      </Heading>
      <Text color="fg.muted" alignSelf={{ base: 'start', lg: 'center' }}>
        Published on <time dateTime={datePublish.toISOString()}>{formatDate(datePublish)}</time>
      </Text>
    </VStack>
  )
}

export default function PostTemplate({ post, postNext, postPrev }: PostTemplateProps) {
  return (
    <VStack as="article" w="full">
      <PostHeader post={post} />
      <Separator hideBelow="lg" orientation="horizontal" w="full" />

      <SimpleGrid columns={{ base: 1, lg: 4 }} gap={4} w="full" mt={{ base: 0, lg: 8 }}>
        <GridItem colSpan={1}>
          <PostSidebar post={post} postNext={postNext} postPrev={postPrev} />
        </GridItem>

        <GridItem colSpan={{ base: 1, lg: 3 }} spaceY={10}>
          <Separator hideFrom="lg" orientation="horizontal" />

          <MdxProse code={post.mdx} />

          <PostLicense post={post} />

          <Box id="comments">
            <PostComment />
          </Box>
        </GridItem>
      </SimpleGrid>
    </VStack>
  )
}
