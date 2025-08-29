import { Button, ButtonGroup, EmptyState, VStack } from '@chakra-ui/react'
import { IconMoodWrrr } from '@tabler/icons-react'
import NextLink from 'next/link'

function NotFound() {
  return (
    <EmptyState.Root alignSelf="center">
      <EmptyState.Content>
        <EmptyState.Indicator>
          <IconMoodWrrr />
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title color="fg">Sorry we couldn&apos;t find this page.</EmptyState.Title>
          <EmptyState.Description>
            But don&apos;t worry, you can find plenty of other things on our homepage.
          </EmptyState.Description>
        </VStack>
        <ButtonGroup>
          <Button asChild>
            <NextLink href="/">Back to Home</NextLink>
          </Button>
          <Button asChild variant="outline">
            <NextLink href="/about">About this blog</NextLink>
          </Button>
        </ButtonGroup>
      </EmptyState.Content>
    </EmptyState.Root>
  )
}

export default NotFound
