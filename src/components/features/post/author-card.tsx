import {
  Avatar,
  Image as ChakraImage,
  HStack,
  LinkBox,
  LinkOverlay,
  Text,
  VisuallyHidden,
  VStack,
} from '@chakra-ui/react'

import NextImageWithBasePath from '@/components/common/next-image-with-base-path'
import { Link } from '@/components/common/smart-link'

export default function AuthorCard({
  name,
  avatar,
  href,
  bio,
}: {
  name: string
  avatar: string
  href?: string
  bio?: string
}) {
  return (
    <LinkBox py={2}>
      <HStack gap={4}>
        <Avatar.Root>
          <Avatar.Fallback name={name} />
          <ChakraImage asChild objectFit="cover" borderRadius="full">
            <NextImageWithBasePath src={avatar} alt={`Avatar of ${name}`} fill />
          </ChakraImage>
        </Avatar.Root>
        <VStack gap="0" align="start">
          <LinkOverlay asChild>
            <Link href={href} fontWeight="medium">
              <VisuallyHidden>Name</VisuallyHidden>
              {name}
            </Link>
          </LinkOverlay>
          {bio && (
            <Text color="fg.muted" textStyle="sm">
              <VisuallyHidden>Short bio</VisuallyHidden>
              {bio}
            </Text>
          )}
        </VStack>
      </HStack>
    </LinkBox>
  )
}
