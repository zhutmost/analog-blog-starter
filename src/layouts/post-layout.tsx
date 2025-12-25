import type * as React from 'react'
import {
  AspectRatio,
  Bleed,
  Box,
  GridItem,
  Heading,
  Separator,
  SimpleGrid,
  StackSeparator,
  Text,
  VStack,
  Wrap,
} from '@chakra-ui/react'

import AuthorLittleCard from '@/components/author-little-card'
import PostComment from '@/components/post/comment/post-comment'
import PostLicense from '@/components/post/post-license'
import PostTag from '@/components/post/post-tag'
import PostToc from '@/components/post/post-toc'
import SmartImage from '@/components/smart-image'
import { Link } from '@/components/smart-link'
import type { Post } from '@/lib/coco'
import siteConfig from '@/lib/site-config'

export interface PostLayoutProps {
  children: React.ReactNode
  content: Post
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

function PostSidebar({ content, postNext, postPrev }: Omit<PostLayoutProps, 'children'>) {
  const { authors, tags, toc } = content

  // Because the 1st item is the post title, we filter out the 1st item. So it will display 2nd and 3rd level headings.
  const filteredToc = toc.filter((item) => item.depth <= 3)

  return (
    <VStack
      separator={<StackSeparator display={{ base: 'none', lg: 'block' }} />}
      gapY={{ base: 4, lg: 6 }}
      w="full"
      h="full"
      alignItems="start"
      pb={4}
    >
      <Wrap py={2} gapY={6} gapX={10} w="full">
        <PostSidebarItem label="Posted by">
          {authors.map(({ name, href, bio, avatar }) => (
            <AuthorLittleCard key={name} name={name} avatar={avatar} bio={bio} href={href} />
          ))}
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
        <Box height="full" display={{ base: 'none', lg: 'block' }} p={0}>
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

function PostHeader({ content }: { content: Post }) {
  const { title, banner, datePublish } = content

  function formatDate(date: Date): string {
    return date.toLocaleDateString(content.head?.locale ?? siteConfig.locale, {
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
            <SmartImage src={banner} alt={`Cover image of post: ${title}`} bgColor="bg.muted" />
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

export default function PostLayout({ content, postNext, postPrev, children }: PostLayoutProps) {
  return (
    <VStack as="article" w="full">
      <PostHeader content={content} />
      <Separator display={{ base: 'none', lg: 'block' }} orientation="horizontal" w="full" />

      <SimpleGrid columns={{ base: 1, lg: 4 }} gap={4} w="full" mt={{ base: 0, lg: 8 }}>
        <GridItem colSpan={1}>
          <PostSidebar content={content} postNext={postNext} postPrev={postPrev} />
        </GridItem>
        <GridItem colSpan={{ base: 1, lg: 3 }} spaceY={12}>
          <Box>
            <Separator display={{ base: 'block', lg: 'none' }} orientation="horizontal" />
            <Box mt={{ base: 8, lg: 0 }}>{children}</Box>
          </Box>
          <PostLicense post={content} />
          <Box id="comments">
            <PostComment />
          </Box>
        </GridItem>
      </SimpleGrid>
    </VStack>
  )
}
