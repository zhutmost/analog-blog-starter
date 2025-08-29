'use client'

import type * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'

import chakraSystem from '@/app/theme'
import ShikiProvider from '@/components/mdx/shiki-adapter'
import { ColorModeProvider } from '@/components/ui/color-mode'

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={chakraSystem}>
      <ColorModeProvider>
        <ShikiProvider>{children}</ShikiProvider>
      </ColorModeProvider>
    </ChakraProvider>
  )
}
