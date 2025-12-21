'use client'

import { Flex } from '@chakra-ui/react'
import GitHubCalendar from 'react-github-calendar'

import { useColorMode } from '@/components/ui/color-mode'

export default function GithubCalendar({ username }: { username: string }) {
  const { colorMode } = useColorMode()

  return (
    <Flex py={4} w="full" alignItems="center" justifyContent="center">
      <GitHubCalendar colorScheme={colorMode} username={username} showWeekdayLabels={true} />
    </Flex>
  )
}
