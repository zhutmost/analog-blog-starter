import { Box, Center, HStack, Stack, Text } from '@chakra-ui/react'

import { Link } from '@/components/common/smart-link'
import SocialIcon from '@/components/common/social-icon'
import siteConfig from '@/lib/site-config'

const thisYear = new Date().getFullYear()

function SiteFooter() {
  return (
    <Center as="footer" w="full">
      <Stack
        maxW="5xl"
        w="full"
        direction={{ base: 'column-reverse', md: 'row' }}
        align={{ base: 'center', md: 'flex-start' }}
        justify="space-between"
        px={{ base: 6, xl: 0 }}
        py={4}
      >
        {/* License info (at bottom when mobile) */}
        <Box textAlign={{ base: 'center', md: 'left' }} color="fg.muted" fontSize="sm">
          <Text>
            Copyright &copy; {thisYear}{' '}
            <Link href="/about" variant="plain" color="fg.muted">
              {siteConfig.author}
            </Link>
          </Text>

          <Text>
            {`Powered by `}
            <Link
              href="https://github.com/zhutmost/analog-blog-starter"
              variant="plain"
              color="fg.muted"
            >
              Analog Blog Starter
            </Link>
          </Text>

          {siteConfig.footer.beian && (
            <Text>
              <Link href="https://beian.miit.gov.cn" variant="plain" color="fg.muted">
                {siteConfig.footer.beian}
              </Link>
            </Text>
          )}
        </Box>

        {/* Social icons (at top when mobile) */}
        <HStack>
          {siteConfig.footer.icons &&
            Object.entries(siteConfig.footer.icons).map(([key, { icon, href }]) => (
              <SocialIcon key={key} name={key} icon={icon} href={href} />
            ))}
        </HStack>
      </Stack>
    </Center>
  )
}

export default SiteFooter
