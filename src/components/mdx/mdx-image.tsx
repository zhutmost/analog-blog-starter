import NextImage from "next/image"
import * as React from "react"

import { cn } from "@/lib/utils"

type MdxImageProps = Omit<React.ComponentPropsWithoutRef<"img">, "src"> & {
  src?: string
}

function parseImageDimension(value: number | string | undefined): number | undefined {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : undefined
  }

  if (typeof value === "string") {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : undefined
  }

  return undefined
}

export function isSvgSrc(src: string): boolean {
  const value = src.trim()

  if (/^data:image\/svg\+xml(?:[;,]|$)/i.test(value)) {
    return true
  }

  try {
    const url = new URL(value, "https://local.invalid")

    return url.pathname.toLowerCase().endsWith(".svg")
  } catch {
    return false
  }
}

function isTwemojiClassName(className: unknown): boolean {
  return typeof className === "string" && className.split(/\s+/).includes("twemoji")
}

function hasTwemojiMarker(props: Record<string, unknown>): boolean {
  return "data-twemoji" in props || props.dataTwemoji !== undefined
}

export function MdxImage({
  src,
  alt = "",
  title,
  width,
  height,
  className,
  sizes = "(max-width: 768px) 100vw, 768px",
  ...props
}: MdxImageProps) {
  if (!src) {
    return null
  }

  const isTwemoji = hasTwemojiMarker(props) || isTwemojiClassName(className)

  if (isTwemoji) {
    return (
      // oxlint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        title={title}
        width={width}
        height={height}
        className={className}
        {...props}
      />
    )
  }

  const parsedWidth = parseImageDimension(width)
  const parsedHeight = parseImageDimension(height)

  const caption = typeof title === "string" && title.trim() ? title.trim() : undefined

  if (!parsedWidth || !parsedHeight) {
    throw new Error(`MDX image "${src}" is missing a valid width or height.`)
  }

  return (
    <figure data-slot="mdx-image-figure" className="flex min-w-0 flex-col items-center">
      <NextImage
        src={src}
        alt={alt}
        width={parsedWidth}
        height={parsedHeight}
        sizes={sizes}
        data-slot="mdx-image"
        data-mdx-image-src={src}
        className={cn(
          "h-auto max-w-3xl rounded-lg border bg-muted/20 object-contain shadow-xs",
          className
        )}
        unoptimized={isSvgSrc(src)}
        {...props}
      />

      {caption && (
        <figcaption
          data-slot="mdx-image-caption"
          className="mt-3 max-w-2xl text-center text-sm leading-6 text-muted-foreground"
        >
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
