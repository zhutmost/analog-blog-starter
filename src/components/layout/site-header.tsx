'use client'

import * as React from 'react'
import {
  Box,
  Button,
  Center,
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

import SmartLink from '@/components/common/smart-link'
import SearchMenu from '@/components/features/search/search-menu'
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
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [open, onClose])

  // Click outside to close the menu
  React.useEffect(() => {
    if (!open) return
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open, onClose])

  const headerHeight = '14'

  return (
    <Box as="header" position="sticky" top={0} w="full" zIndex="sticky" ref={headerRef}>
      {/* Header bar */}
      <Center
        h={headerHeight}
        bgColor="bg"
        boxShadow={isScrolled ? 'md' : 'none'}
        borderBottom="sm"
        borderColor="border"
        transition="all 0.3s ease"
      >
        <Flex maxW="5xl" w="full" px={{ base: 6, xl: 0 }} align="center" justify="space-between">
          <NextLink href="/">
            <HStack>
              {siteConfig.header.logo && (
                <Image
                  src={siteConfig.header.logo}
                  alt={`Site logo of ${siteConfig.siteTitle}`}
                  width={30}
                  height={30}
                />
              )}
              {siteConfig.header.title && (
                <Heading as="span" fontWeight="bold">
                  {siteConfig.header.title}
                </Heading>
              )}
            </HStack>
          </NextLink>

          <HStack>
            {/* Desktop Navigation Links */}
            {siteConfig.header.menu.map(({ name, href }) => (
              <Button key={name} asChild hideBelow="md" variant="ghost" size="sm">
                <SmartLink href={href}>{name}</SmartLink>
              </Button>
            ))}

            <SearchMenu />

            <ColorModeButton />

            {/* Hamburger button for mobile navigation menu */}
            <IconButton
              hideFrom="md"
              aria-label="Navigation menu"
              onClick={onToggle}
              variant="ghost"
            >
              {open ? <IconX /> : <IconMenu2 />}
            </IconButton>
          </HStack>
        </Flex>
      </Center>

      {/* Mobile collapsible menu */}
      <Collapsible.Root open={open}>
        <Collapsible.Content
          top={headerHeight}
          boxShadow="md"
          roundedBottom="lg"
          position="fixed"
          w="full"
          zIndex="dropdown"
        >
          <VStack bgColor={'bg'} p={2}>
            {siteConfig.header.menu.map(({ name, href }) => (
              <Button key={name} asChild variant="ghost" w="full" onClick={onClose}>
                <SmartLink href={href}>{name}</SmartLink>
              </Button>
            ))}
          </VStack>
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  )
}

export default SiteHeader
