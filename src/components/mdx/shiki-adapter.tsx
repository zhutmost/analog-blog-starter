import type * as React from 'react'
import { CodeBlock, createShikiAdapter } from '@chakra-ui/react'
import themeGithubDark from '@shikijs/themes/github-dark'
import themeGithubLight from '@shikijs/themes/github-light'
import { createHighlighterCore } from 'shiki/core'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'

const shikiAdapter = createShikiAdapter({
  async load() {
    return createHighlighterCore({
      langs: [
        import('@shikijs/langs/c'),
        import('@shikijs/langs/cpp'),
        import('@shikijs/langs/dockerfile'),
        import('@shikijs/langs/html'),
        import('@shikijs/langs/java'),
        import('@shikijs/langs/javascript'),
        import('@shikijs/langs/json'),
        import('@shikijs/langs/make'),
        import('@shikijs/langs/markdown'),
        import('@shikijs/langs/python'),
        import('@shikijs/langs/scala'),
        import('@shikijs/langs/shellscript'),
        import('@shikijs/langs/system-verilog'),
        import('@shikijs/langs/tcl'),
        import('@shikijs/langs/typescript'),
        import('@shikijs/langs/verilog'),
        import('@shikijs/langs/xml'),
        import('@shikijs/langs/yaml'),
      ],
      themes: [themeGithubDark, themeGithubLight],
      engine: createOnigurumaEngine(import('shiki/wasm')),
    })
  },
  theme: {
    light: 'github-light',
    dark: 'github-dark',
  },
})

export default function ShikiProvider({ children }: React.PropsWithChildren) {
  return <CodeBlock.AdapterProvider value={shikiAdapter}>{children}</CodeBlock.AdapterProvider>
}
