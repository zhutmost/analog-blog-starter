'use client'

import * as React from 'react'
import { ClientOnly, CodeBlock, Float, IconButton } from '@chakra-ui/react'

import { useColorMode } from '@/components/ui/color-mode'

function CodeCopyButton() {
  return (
    <Float placement="top-end" offset="5" zIndex="1">
      <CodeBlock.CopyTrigger asChild>
        <IconButton variant="ghost" size="2xs">
          <CodeBlock.CopyIndicator />
        </IconButton>
      </CodeBlock.CopyTrigger>
    </Float>
  )
}

export interface CodeHighlightBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  language?: string
  fileName?: string
  showLineNumbers?: boolean
  highlightLines?: number[]
  focusedLineNumbers?: number[]
  addedLineNumbers?: number[]
  removedLineNumbers?: number[]
  maxLines?: number
  wordWrap?: boolean
}

export default function CodeHighlightBlock({
  children,
  language = 'text',
  fileName,
  showLineNumbers = true,
  highlightLines = [],
  focusedLineNumbers = [],
  addedLineNumbers = [],
  removedLineNumbers = [],
  maxLines = 10,
  wordWrap = false,
}: CodeHighlightBlockProps) {
  const { colorMode } = useColorMode()

  // We assume that children is a single <code> element with a string as its children.
  const codeChildProps = (
    React.Children.only(children) as React.ReactElement<
      React.HTMLAttributes<HTMLPreElement>,
      'code'
    >
  ).props
  const codeContent = codeChildProps.children as string

  return (
    <ClientOnly>
      {() => (
        <CodeBlock.Root
          code={codeContent}
          language={language}
          meta={{
            colorScheme: colorMode,
            showLineNumbers,
            highlightLines,
            focusedLineNumbers,
            addedLineNumbers,
            removedLineNumbers,
            wordWrap,
          }}
          maxLines={maxLines}
          marginY="1em"
        >
          {fileName && (
            <CodeBlock.Header>
              <CodeCopyButton />
              <CodeBlock.Title>{fileName}</CodeBlock.Title>
            </CodeBlock.Header>
          )}
          <CodeBlock.Content>
            {!fileName && <CodeCopyButton />}
            <CodeBlock.Code>
              <CodeBlock.CodeText />
            </CodeBlock.Code>

            <CodeBlock.Overlay>
              <CodeBlock.CollapseTrigger>
                <CodeBlock.CollapseText textStyle="sm" />
              </CodeBlock.CollapseTrigger>
            </CodeBlock.Overlay>
          </CodeBlock.Content>
        </CodeBlock.Root>
      )}
    </ClientOnly>
  )
}
