"use client"

import NextLink from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"

type HomeLinkProps = React.ComponentProps<typeof NextLink>

function isUnmodifiedLeftClick(event: React.MouseEvent<HTMLAnchorElement>) {
  return event.button === 0 && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey
}

export function HomeLink({ onClick, target, ...props }: HomeLinkProps) {
  const pathname = usePathname()

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    onClick?.(event)

    if (
      event.defaultPrevented ||
      pathname !== "/" ||
      (target && target !== "_self") ||
      !isUnmodifiedLeftClick(event)
    ) {
      return
    }

    event.preventDefault()

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return <NextLink {...props} target={target} onClick={handleClick} />
}
