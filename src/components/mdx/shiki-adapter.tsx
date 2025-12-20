import type * as React from 'react'
import { CodeBlock, createShikiAdapter } from '@chakra-ui/react'

import { allAuthors, allPages, allPosts } from '@/lib/coco'

function getAllCodeLanguages(): Set<string> {
  const allItems: { codeLanguages: string[] }[] = [...allPosts, ...allAuthors, ...allPages]
  const allLanguages = allItems.flatMap((item) => item.codeLanguages)
  return new Set(allLanguages)
}

const shikiAdapter = createShikiAdapter({
  async load() {
    const { createHighlighter, createOnigurumaEngine } = await import('shiki')
    return createHighlighter({
      langs: Array.from(getAllCodeLanguages()),
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
