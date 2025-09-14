import { Box, Flex, Text } from '@chakra-ui/react'

import { Link } from '@/components/smart-link'
import SocialIcon from '@/components/social-icon'
import siteConfig from '@/lib/site-config'

function SiteFooter() {
  const thisYear = new Date().getFullYear()

  return (
    <Flex as="footer" w="full" mt="auto" justifyContent="center">
      <Flex
        maxW="5xl"
        w="full"
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'center', md: 'flex-start' }}
        justify="space-between"
        px={{ base: 6, xl: 0 }}
        py={5}
        gap={3}
      >
        {/* Social icons (at top when mobile) */}
        <Flex order={{ base: 1, md: 2 }} gap={1} justifyContent="center">
          {siteConfig.footer.icons &&
            Object.entries(siteConfig.footer.icons).map(([key, item]) => (
              <SocialIcon key={key} name={key} icon={item.icon} href={item.href} />
            ))}
        </Flex>

        {/* License info (at bottom when mobile) */}
        <Box
          textAlign={{ base: 'center', md: 'left' }}
          order={{ base: 2, md: 1 }}
          color="fg.muted"
          fontSize="sm"
        >
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
      </Flex>
    </Flex>
  )
}

export default SiteFooter
