import { Box, Text, VStack } from '@chakra-ui/react'

import GithubCalendar from '@/components/homepage/github-calendar'
import HomeHeader from '@/components/homepage/home-header'
import { HomepageSection } from '@/components/homepage/sections'
import { Link } from '@/components/smart-link'
import Twemojify from '@/components/twemojify'
import siteConfig from '@/lib/site-config'

export default function HomePage() {
  return (
    <VStack width="full" alignItems="start">
      <HomeHeader />

      {siteConfig.homepage.greetings?.map((item, index) => (
        <Text key={`greetings-${index.toString()}`} fontSize="lg">
          <Twemojify size="lg">{item}</Twemojify>
        </Text>
      ))}

      {siteConfig.homepage.githubCalendar && (
        <Box py={4} spaceY={2} width="full">
          <Text fontSize="lg">
            I also go by&nbsp;
            <Link
              href={`https://github.com/${siteConfig.homepage.githubCalendar}`}
              variant="plain"
              color="brand"
            >
              @{siteConfig.homepage.githubCalendar}
            </Link>
            &nbsp;when coding. Catch me on GitHub!
          </Text>
          <GithubCalendar username={siteConfig.homepage.githubCalendar} />
        </Box>
      )}

      <Text fontSize="lg">
        <Twemojify>Happy reading!&nbsp;🍻</Twemojify>
      </Text>

      {siteConfig.homepage.sections?.map((sectionProps, index) => (
        <HomepageSection key={`homepage-section-${index.toString()}`} {...sectionProps} />
      ))}
    </VStack>
  )
}
