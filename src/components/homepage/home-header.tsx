import { Heading, Span } from '@chakra-ui/react'

import { Link } from '@/components/smart-link'
import Twemojify from '@/components/twemojify'
import siteConfig from '@/lib/site-config'

export default function HomeHeader() {
  return (
    <Heading
      as="h1"
      bgClip="text"
      size={{ base: '5xl', lg: '6xl' }}
      mt={{ base: 8, md: 12 }}
      mb={8}
      fontWeight="extrabold"
      letterSpacing="tight"
      color="fg/80"
    >
      Hello! I am&nbsp;
      <Span
        bgGradient="to-r"
        gradientFrom="brand"
        gradientTo="brand/60"
        bgClip="text"
        color="transparent"
        display="inline"
        marginRight={6}
      >
        <Link href={'/about'} color="brand">
          {siteConfig.author}
        </Link>
      </Span>
      <Twemojify size={'2x'}>👋</Twemojify>
    </Heading>
  )
}
