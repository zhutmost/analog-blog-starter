'use client'

import type * as React from 'react'
import { parse as parseEmoji } from '@twemoji/parser'
import Twemoji, { type TwemojiProps } from 'react-twemoji'

export interface TwemojifyProps {
  children: React.ReactNode
  size?: 'default' | 'lg' | '2x' | '3x' | '4x' | '5x'
}

export default function Twemojify({ children, size }: TwemojifyProps) {
  if (!children) return null

  const twemojifyClassName = `twemoji-${size ?? 'default'}`

  if (typeof children === 'string') {
    return <StringTwemojify text={children} className={twemojifyClassName} />
  } else if (Array.isArray(children)) {
    return (
      <>
        {children.map((child, index) => {
          return (
            <Twemojify key={`twemoji-array-${index.toString()}`} size={size}>
              {child}
            </Twemojify>
          )
        })}
      </>
    )
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
  const emojiEntities = parseEmoji(text)
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
      // biome-ignore lint/performance/noImgElement: Insert img elements for emojis
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
