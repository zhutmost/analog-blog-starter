import { Box, Separator, Stack, Text, Wrap, WrapItem } from '@chakra-ui/react'
import type { Metadata } from 'next'

import PostTag from '@/components/features/post/post-tag'
import PageHeader from '@/components/layout/page-header'
import { postsByTag } from '@/lib/coco'
import generatePageMetadata from '@/lib/page-metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'All Tags',
  description: 'Things I blog about',
})

export default async function Page() {
  const tags = Object.keys(postsByTag)
  const tagsSorted = tags.sort((a, b) => postsByTag[b].length - postsByTag[a].length)
  return (
    <Stack
      justifyContent={{ base: 'none', lg: 'center' }}
      direction={{ base: 'column', lg: 'row' }}
      alignItems={{ base: 'start', lg: 'center' }}
      w="full"
      gap={6}
    >
      <Box>
        <PageHeader.Root>
          <PageHeader.Title>Tags</PageHeader.Title>
        </PageHeader.Root>
      </Box>
      <Separator orientation="vertical" display={{ base: 'none', lg: 'block' }} h="xs" />
      <Separator orientation="horizontal" display={{ base: 'block', lg: 'none' }} w="full" />
      <Wrap maxW="xl" alignSelf="center" gap={3}>
        {tags.length === 0 && (
          <WrapItem>
            <Text>No tags found.</Text>
          </WrapItem>
        )}
        {tagsSorted.map((t) => (
          <PostTag key={t} text={t} count={postsByTag[t].length} />
        ))}
      </Wrap>
    </Stack>
  )
}
