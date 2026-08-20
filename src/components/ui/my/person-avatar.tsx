import NextImage from "next/image"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/shadcn/avatar"
import { cn } from "@/lib/utils"

const personAvatarSizes = {
  sm: {
    root: "size-10 rounded-lg after:rounded-lg",
    content: "rounded-lg",
    fallback: "text-xs",
    imageSizes: "2.5rem",
  },
  md: {
    root: "size-16 rounded-xl after:rounded-xl",
    content: "rounded-xl",
    fallback: "text-base",
    imageSizes: "4rem",
  },
  xl: {
    root: "size-28 rounded-2xl after:rounded-2xl",
    content: "rounded-2xl",
    fallback: "text-2xl",
    imageSizes: "7rem",
  },
} as const

type PersonAvatarSize = keyof typeof personAvatarSizes

export type PersonAvatarProps = {
  name: string
  src?: string
  size?: PersonAvatarSize
  className?: string
}

export function PersonAvatar({ name, src, size = "md", className }: PersonAvatarProps) {
  const variant = personAvatarSizes[size]

  return (
    <Avatar
      className={cn(
        "overflow-hidden bg-muted font-semibold text-muted-foreground",
        variant.root,
        className
      )}
    >
      {src && (
        <AvatarImage
          src={src}
          alt=""
          className={cn("object-cover", variant.content)}
          render={<NextImage src={src} alt="" fill sizes={variant.imageSizes} />}
        />
      )}

      <AvatarFallback
        delay={200}
        aria-hidden="true"
        className={cn("font-semibold text-muted-foreground", variant.content, variant.fallback)}
      >
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  )
}

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/u)
    .filter(Boolean)
    .slice(0, 2)
    .flatMap((part) => Array.from(part).slice(0, 1))
    .join("")
    .toUpperCase()
}
