'use client'

import { Flex } from '@chakra-ui/react'
import { useTheme } from 'next-themes'
import { GitHubCalendar } from 'react-github-calendar'

export default function GithubCalendar({ username }: { username: string }) {
  const { resolvedTheme } = useTheme()

  const colorScheme = resolvedTheme !== 'dark' ? 'light' : 'dark'

  return (
    <Flex py={4} w="full" alignItems="center" justifyContent="center">
      <GitHubCalendar colorScheme={colorScheme} username={username} showWeekdayLabels={true} />
    </Flex>
  )
}
