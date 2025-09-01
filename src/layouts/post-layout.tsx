import type * as React from 'react'
import {
  AspectRatio,
  Avatar,
  Box,
  GridItem,
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
  Separator,
  SimpleGrid,
  StackSeparator,
  Text,
  VisuallyHidden,
  VStack,
  Wrap,
} from '@chakra-ui/react'
import NextLink from 'next/link'

import PostComment from '@/components/post/comment/post-comment'
import PostLicense from '@/components/post/post-license'
import PostTag from '@/components/post/post-tag'
import PostToc from '@/components/post/post-toc'
import SmartImage from '@/components/smart-image'
import { Link } from '@/components/smart-link'
import type { Author, Post } from '@/lib/coco'
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
      paddingTop={10}
      width="full"
      height="full"
      alignItems="start"
    >
      <Wrap
        paddingY={2}
        gapY={6}
        gapX={10}
        width="full"
        justifyContent={{ base: 'center', lg: 'start' }}
      >
        <VisuallyHidden>Authors</VisuallyHidden>
        {authors.map((author: Author) => (
          <LinkBox key={author.slug}>
            <HStack gapX={4}>
              <Avatar.Root>
                <Avatar.Fallback name={author.name} />
                <Avatar.Image objectFit="cover" src={author.avatar} />
              </Avatar.Root>
              <VStack alignItems="start" gapY={0}>
                <LinkOverlay asChild>
                  <NextLink href={`/about/${author.slug}`}>
                    <VisuallyHidden>Name</VisuallyHidden>
                    <Text color="fg" fontSize="md" fontWeight="bold" letterSpacing="tight">
                      {author.name}
                    </Text>
                  </NextLink>
                </LinkOverlay>
                {author.bio && (
                  <div>
                    <VisuallyHidden>Short bio</VisuallyHidden>
                    <Text fontSize="sm" color="fg.muted" letterSpacing="tight" lineHeight="shorter">
                      {author.bio}
                    </Text>
                  </div>
                )}
              </VStack>
            </HStack>
          </LinkBox>
        ))}
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
        <Wrap justifyContent="space-between" width="full" gap={{ base: 4, lg: 8 }}>
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
        <Box height="full" display={{ base: 'none', lg: 'block' }} padding={0}>
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
  const { title, banner, datePublish, dateUpdate } = content

  function formatDate(date: Date): string {
    return date.toLocaleDateString(content.head?.locale ?? siteConfig.locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <VStack as="header" paddingY="6" width="full">
      {banner && (
        <AspectRatio ratio={5 / 2} width="full" marginBottom={10}>
          <SmartImage src={banner} alt={title} />
        </AspectRatio>
      )}
      <HStack>
        <Text color="fg.muted">
          Published on <time dateTime={datePublish.toISOString()}>{formatDate(datePublish)}</time>
        </Text>
        {formatDate(datePublish) !== formatDate(dateUpdate) && (
          <>
            <Text color="fg.muted"> · </Text>
            <Text color="fg.muted">
              Updated on <time dateTime={dateUpdate.toISOString()}>{formatDate(dateUpdate)}</time>
            </Text>
          </>
        )}
      </HStack>
      <Heading as="h1" size="5xl" fontWeight="extrabold" letterSpacing="tight" color="fg">
        {title}
      </Heading>
    </VStack>
  )
}

export default function PostLayout({ content, postNext, postPrev, children }: PostLayoutProps) {
  return (
    <VStack as="article" width="full">
      <PostHeader content={content} />
      <Separator display={{ base: 'none', lg: 'block' }} orientation="horizontal" width="full" />

      <SimpleGrid columns={{ base: 1, lg: 4 }} gap={4} width="full">
        <GridItem colSpan={1}>
          <PostSidebar content={content} postNext={postNext} postPrev={postPrev} />
        </GridItem>
        <GridItem colSpan={{ base: 1, lg: 3 }} spaceY={12}>
          <Box>
            <Separator display={{ base: 'block', lg: 'none' }} orientation="horizontal" />
            {children}
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
