import type * as React from 'react'
import { CodeBlock, createShikiAdapter } from '@chakra-ui/react'

import { allAuthors, allPages, allPosts } from '@/lib/coco'

function getAllCodeLanguages(): Set<string> {
  const allLanguages: string[] = [...allPosts, ...allAuthors, ...allPages].flatMap(
    (item) => item.codeLanguages
  )
  return new Set(allLanguages)
}

const shikiAdapter = createShikiAdapter({
  async load() {
    const { createHighlighter, createJavaScriptRegexEngine } = await import('shiki')
    return createHighlighter({
      langs: Array.from(getAllCodeLanguages()),
      themes: ['one-light', 'one-dark-pro'],
      engine: createJavaScriptRegexEngine({ forgiving: true }),
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
