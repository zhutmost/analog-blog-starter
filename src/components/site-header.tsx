'use client'

import * as React from 'react'
import {
  Box,
  Button,
  Collapsible,
  Flex,
  Heading,
  HStack,
  IconButton,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { IconMenu2, IconX } from '@tabler/icons-react'
import Image from 'next/image'
import NextLink from 'next/link'

import SearchMenu from '@/components/search/search-menu'
import SmartLink from '@/components/smart-link'
import { ColorModeButton } from '@/components/ui/color-mode'
import siteConfig from '@/lib/site-config'

function SiteHeader() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const { open, onToggle, onClose } = useDisclosure()
  const headerRef = React.useRef<HTMLDivElement>(null)

  // Shadow effect on scroll
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
      // Close the menu if the user scrolls while it's open
      if (open) onClose()
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [open, onClose])

  // Click outside to close the menu
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  return (
    <Box as="header" position="sticky" top={0} width="full" zIndex="sticky" ref={headerRef}>
      <Box
        height="56px"
        backgroundColor="bg"
        boxShadow={isScrolled ? 'md' : 'none'}
        borderBottom="sm"
        borderColor="border"
        transition="all 0.3s ease"
      >
        <Flex
          maxW="5xl"
          w="full"
          h="full"
          mx="auto"
          px={{ base: 6, lg: 0 }}
          align="center"
          justify="space-between"
        >
          <NextLink href="/">
            <HStack spaceX={3}>
              {siteConfig.header.logo && (
                <Image
                  src={siteConfig.header.logo}
                  alt={`Site logo of ${siteConfig.siteTitle}`}
                  width={30}
                  height={30}
                />
              )}
              {siteConfig.header.title && (
                <Heading as="div" size="xl" fontWeight="bold">
                  {siteConfig.header.title}
                </Heading>
              )}
            </HStack>
          </NextLink>

          <HStack>
            {/* Desktop Navigation Links */}
            {siteConfig.header.menu.map((link) => (
              <Button
                key={link.name}
                asChild
                display={{ base: 'none', md: 'flex' }}
                variant="ghost"
                size="sm"
              >
                <SmartLink href={link.href}>{link.name}</SmartLink>
              </Button>
            ))}

            <SearchMenu />

            <ColorModeButton />

            {/* Hamburger button for mobile navigation menu */}
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              aria-label="Navigation menu"
              onClick={onToggle}
              variant="ghost"
            >
              {open ? <IconX /> : <IconMenu2 />}
            </IconButton>
          </HStack>
        </Flex>
      </Box>

      {/* Mobile collapsible menu */}
      <Collapsible.Root open={open}>
        <Collapsible.Content boxShadow="md" borderBottomRadius="lg">
          <Box backgroundColor={'bg'} py={3} px={4}>
            <VStack spaceY={3}>
              {siteConfig.header.menu.map((link) => (
                <Button key={link.name} asChild variant="ghost" width="full" onClick={onClose}>
                  <SmartLink href={link.href}>{link.name}</SmartLink>
                </Button>
              ))}
            </VStack>
          </Box>
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  )
}

export default SiteHeader
