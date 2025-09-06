import * as path from 'node:path'
import type * as React from 'react'
import {
  Avatar,
  Box,
  Flex,
  GridItem,
  Heading,
  Icon,
  SimpleGrid,
  StackSeparator,
  Text,
  VisuallyHidden,
  VStack,
  Wrap,
} from '@chakra-ui/react'
import { IconMapPinFilled } from '@tabler/icons-react'

import PageHeader from '@/components/page-header'
import SocialIcon from '@/components/social-icon'
import type { Author } from '@/lib/coco'
import siteConfig from '@/lib/site-config'

export interface AuthorLayoutProps {
  children: React.ReactNode
  author: Author
}

function AuthorSidebar({ author }: { author: Author }) {
  const { name, avatar, bio, affiliation, icons } = author
  const avatarSrc: string = path.join(siteConfig.siteRoot ?? '', avatar ?? '/avatar-default.jpg')

  return (
    <VStack paddingTop={10} gapY={5}>
      <Avatar.Root width="48" height="48">
        <Avatar.Fallback name={name} />
        <Avatar.Image objectFit="cover" src={avatarSrc} alt={`Avatar of ${name}`} />
      </Avatar.Root>
      <Heading as="h3" size="2xl" fontWeight="bold" letterSpacing="tight" color="fg">
        {name}
      </Heading>
      <VStack>
        {bio && (
          <Box>
            <VisuallyHidden>Short bio</VisuallyHidden>
            <Text color="fg.muted" letterSpacing="tight" lineHeight="shorter">
              {bio}
            </Text>
          </Box>
        )}

        {affiliation && (
          <Box>
            <VisuallyHidden>Affiliation</VisuallyHidden>
            <Flex color="fg.muted" letterSpacing="tight" lineHeight="shorter" alignItems="center">
              <Icon size="md" marginRight={1}>
                <IconMapPinFilled />
              </Icon>
              {affiliation}
            </Flex>
          </Box>
        )}
      </VStack>
      <Wrap>
        {icons &&
          Object.entries(icons).map(([key, item]) => (
            <SocialIcon key={key} name={key} icon={item.icon} href={item.href} />
          ))}
      </Wrap>
    </VStack>
  )
}

function AuthorLayout({ children, author }: AuthorLayoutProps) {
  const title: string = author.slug === 'default' ? 'About' : `About - ${author.name}`

  return (
    <VStack separator={<StackSeparator />} width="full">
      <PageHeader.Root>
        <PageHeader.Title>{title}</PageHeader.Title>
        <PageHeader.Description>{siteConfig.pages.greetings.about}</PageHeader.Description>
      </PageHeader.Root>
      <SimpleGrid columns={{ base: 1, lg: 3 }} gap={4}>
        <GridItem colSpan={{ base: 1, lg: 1 }}>
          <AuthorSidebar author={author} />
        </GridItem>
        <GridItem colSpan={{ base: 1, lg: 2 }}>{children}</GridItem>
      </SimpleGrid>
    </VStack>
  )
}

export default AuthorLayout
