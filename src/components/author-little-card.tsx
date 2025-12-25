import {
  Avatar,
  HStack,
  LinkBox,
  LinkOverlay,
  Text,
  VisuallyHidden,
  VStack,
} from '@chakra-ui/react'

import { Link } from '@/components/smart-link'

export default function AuthorLittleCard({
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
    <LinkBox>
      <HStack gap={4}>
        <Avatar.Root>
          <Avatar.Fallback name={name} />
          <Avatar.Image src={avatar} alt={`Avatar of ${name}`} />
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
