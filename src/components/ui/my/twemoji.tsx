import { type ReactNode } from "react"

import { parse as parseEmoji } from "@twemoji/parser"

import { cn } from "@/lib/utils"

export type TwemojiSize = "default" | "lg" | "2x" | "3x" | "4x" | "5x"

export interface TwemojifyTextProps {
  text: string
  size?: TwemojiSize

  /**
   * Treat the emoji images as decorative.
   *
   * By default, emojis are considered part of the text content, so their original Unicode
   * representation is used as the image alt text. Set this to true only when the emoji is purely
   * visual decoration.
   */
  decorative?: boolean

  /** Additional class name applied to each generated emoji image. */
  className?: string
}

export function TwemojifyText({
  text,
  size = "default",
  decorative = false,
  className,
}: TwemojifyTextProps) {
  if (!text) {
    return null
  }

  const entities = parseEmoji(text)

  if (entities.length === 0) {
    return text
  }

  const nodes: ReactNode[] = []
  let lastIndex = 0

  for (const entity of entities) {
    const [start, end] = entity.indices

    if (start > lastIndex) {
      nodes.push(text.slice(lastIndex, start))
    }

    nodes.push(
      // oxlint-disable-next-line @next/next/no-img-element
      <img
        key={`emoji-${start}`}
        src={entity.url}
        alt={decorative ? "" : entity.text}
        aria-hidden={decorative ? true : undefined}
        className={cn("twemoji", `twemoji-${size}`, className)}
        draggable={false}
      />
    )

    lastIndex = end
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return <>{nodes}</>
}
