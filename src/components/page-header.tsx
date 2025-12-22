import type * as React from 'react'
import { Heading, type StackProps, Text, VStack } from '@chakra-ui/react'

import Twemojify from '@/components/twemojify'

function PageHeaderRoot(props: StackProps) {
  return (
    <VStack
      w="full"
      alignSelf="start"
      alignItems="start"
      mt={{ base: 8, md: 12 }}
      mb={{ base: 6, md: 10 }}
      {...props}
    />
  )
}

function PageHeaderTitle({ children }: { children: React.ReactNode }) {
  return (
    <Heading as="h1" color="fg" size="5xl" fontWeight="bold" letterSpacing="tight">
      <Twemojify>{children}</Twemojify>
    </Heading>
  )
}

function PageHeaderDescription({ children }: { children: React.ReactNode }) {
  return (
    <Text fontSize="lg" color="fg.muted" fontWeight="light">
      <Twemojify>{children}</Twemojify>
    </Text>
  )
}

const PageHeader = {
  Root: PageHeaderRoot,
  Title: PageHeaderTitle,
  Description: PageHeaderDescription,
}

export default PageHeader
