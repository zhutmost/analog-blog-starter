import type * as React from 'react'
import { CodeBlock, createShikiAdapter } from '@chakra-ui/react'
import { bundledLanguages, createHighlighter, createOnigurumaEngine } from 'shiki'

const shikiAdapter = createShikiAdapter({
  async load() {
    return createHighlighter({
      langs: Object.keys(bundledLanguages),
      themes: ['one-light', 'one-dark-pro'],
      engine: createOnigurumaEngine(import('shiki/wasm')),
    })
  },
  theme: {
    light: 'one-light',
    dark: 'one-dark-pro',
  },
})

export default function ShikiProvider({ children }: React.PropsWithChildren) {
  return <CodeBlock.AdapterProvider value={shikiAdapter}>{children}</CodeBlock.AdapterProvider>
}
