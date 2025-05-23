'use client'

import * as React from 'react'
import { parse } from '@twemoji/parser'
import { cva, type VariantProps } from 'class-variance-authority'
import Twemoji, { TwemojiProps } from 'react-twemoji'

import { cn } from '@/lib/utils'

const twemojifyVariants = cva('inline-block my-0', {
  variants: {
    size: {
      default: 'mx-[0.1em] h-[1em] w-[1em] align-[-0.1em]',
      lg: 'ml-[0.133em] mr-[0.0665em] h-[1.33em] w-[1.33em] align-[-0.133em]',
      '2x': 'ml-[0.2em] mr-[0.1em] h-[2em] w-[2em] align-[-0.2em]',
      '3x': 'ml-[0.3em] mr-[0.15em] h-[3em] w-[3em] align-[-0.3em]',
      '4x': 'ml-[0.4em] mr-[0.2em] h-[4em] w-[4em] align-[-0.4em]',
      '5x': 'ml-[0.5em] mr-[0.25em] h-[5em] w-[5em] align-[-0.5em]',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

export interface TwemojifyProps extends VariantProps<typeof twemojifyVariants> {
  children: React.ReactNode
  className?: string
}

export default function Twemojify({ children, size, className }: TwemojifyProps) {
  const twemojifyClassName = cn(twemojifyVariants({ size, className }))
  if (typeof children === 'string') {
    return <StringTwemojify text={children} className={twemojifyClassName} />
  } else {
    const mergedOptions = {
      folder: 'svg',
      ext: '.svg',
      className: twemojifyClassName,
    }
    return (
      <Twemoji noWrapper options={mergedOptions}>
        {children as TwemojiProps['children']}
      </Twemoji>
    )
  }
}

function StringTwemojify({ text, className }: { text: string; className: string }) {
  const emojiEntities = parse(text)
  let lastIndex = 0
  const resultNodes: React.ReactNode[] = []

  for (const [index, entity] of emojiEntities.entries()) {
    // process text before emoji
    if (entity.indices[0] > lastIndex) {
      resultNodes.push(
        <span key={`text-${lastIndex.toString()}`}>{text.slice(lastIndex, entity.indices[0])}</span>
      )
    }

    // process emoji
    resultNodes.push(
      // eslint-disable-next-line @next/next/no-img-element
      <img
        key={`emoji-${index.toString()}`}
        src={entity.url}
        alt=""
        className={className}
        draggable={false}
        aria-label={entity.text}
      />
    )

    lastIndex = entity.indices[1]
  }

  // process text after the last emoji
  if (lastIndex < text.length) {
    resultNodes.push(<span key={`text-${lastIndex.toString()}`}>{text.slice(lastIndex)}</span>)
  }

  return <>{resultNodes}</>
}
