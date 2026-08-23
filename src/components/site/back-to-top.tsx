"use client"

import * as React from "react"

import { IconArrowUp } from "@tabler/icons-react"

import { IconButton } from "@/components/ui/my"
import { cn } from "@/lib/utils"

function scrollToTop() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  window.scrollTo({
    top: 0,
    behavior: reduceMotion ? "auto" : "smooth",
  })
}

export function BackToTop() {
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    let frame = 0

    function updateVisibility() {
      cancelAnimationFrame(frame)

      frame = requestAnimationFrame(() => {
        setIsVisible(window.scrollY > window.innerHeight)
      })
    }

    updateVisibility()

    window.addEventListener("scroll", updateVisibility, { passive: true })
    window.addEventListener("resize", updateVisibility)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", updateVisibility)
      window.removeEventListener("resize", updateVisibility)
    }
  }, [])

  return (
    <IconButton
      label="Back to top"
      tooltipSide="left"
      variant="outline"
      size="icon"
      tabIndex={isVisible ? 0 : -1}
      aria-hidden={!isVisible}
      onClick={scrollToTop}
      className={cn(
        "fixed right-6 bottom-6 z-40 hidden rounded-full",
        "border-border/80 bg-background/85 shadow-md backdrop-blur-md",
        "lg:right-8 lg:bottom-8 md:[@media(hover:hover)_and_(pointer:fine)]:inline-flex",
        "transition-[opacity,transform] duration-200 motion-reduce:transition-none",
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      )}
    >
      <IconArrowUp aria-hidden="true" className="size-5" />
    </IconButton>
  )
}
