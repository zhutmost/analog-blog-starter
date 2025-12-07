import type * as React from 'react'
import { Flex, Heading, HStack, Icon, Text, VStack } from '@chakra-ui/react'
import { IconArrowRight } from '@tabler/icons-react'

import { Link } from '@/components/smart-link'
import Twemojify from '@/components/twemojify'

export interface HomepageSectionProps<T> {
  href: string
  title: string
  description?: string
  content: React.FC<T>
  contentProps?: T
}

export function HomepageSection<T>({
  href,
  title,
  description,
  content: Content,
  contentProps,
}: HomepageSectionProps<T>) {
  return (
    <VStack w="full">
      <VStack w="full" alignItems="start" pt={{ base: 8, md: 12 }} pb={{ base: 6, md: 10 }}>
        <HStack w="full" alignItems="end" justifyContent="space-between">
          <Link asChild href={href}>
            <Heading
              as="h2"
              size={{ base: '3xl', lg: '4xl' }}
              color="fg"
              letterSpacing="tighter"
              lineHeight={{ base: 'short', lg: '[1.1]' }}
              fontWeight="bold"
              _hover={{ opacity: 0.8 }}
            >
              {title}
            </Heading>
          </Link>
          <Link href={href}>
            <Flex align="center" fontWeight="medium" color="brand" _hover={{ color: 'brand/60' }}>
              View all&nbsp;
              <Icon ml={1} boxSize={5}>
                <IconArrowRight />
              </Icon>
            </Flex>
          </Link>
        </HStack>
        <Text fontSize="lg" color="fg.muted" fontWeight="light">
          <Twemojify>{description}</Twemojify>
        </Text>
      </VStack>
      {/** biome-ignore lint/suspicious/noExplicitAny: Unsafe contentProps extraction */}
      <Content {...(contentProps as any)} />
    </VStack>
  )
}
