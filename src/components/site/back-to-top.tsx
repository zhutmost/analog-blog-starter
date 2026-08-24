"use client"

import * as React from "react"

import { IconArrowUp } from "@tabler/icons-react"

import { IconButton } from "@/components/ui/my"
import { cn } from "@/lib/utils"

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

export function BackToTop() {
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    const footer = document.querySelector<HTMLElement>('[data-slot="site-footer"]')
    let animationFrame: number | undefined

    function updateButton() {
      if (animationFrame !== undefined) {
        return
      }

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = undefined
        setIsVisible(window.scrollY > window.innerHeight)

        const wrapper = wrapperRef.current
        if (!wrapper) {
          return
        }

        const footerOffset = footer
          ? Math.max(0, window.innerHeight - footer.getBoundingClientRect().top)
          : 0

        wrapper.style.transform = `translateY(-${footerOffset}px)`
      })
    }

    updateButton()

    const resizeObserver = new ResizeObserver(updateButton)
    if (footer) {
      resizeObserver.observe(footer)
    }

    window.addEventListener("scroll", updateButton, { passive: true })
    window.addEventListener("resize", updateButton)

    return () => {
      if (animationFrame !== undefined) {
        window.cancelAnimationFrame(animationFrame)
      }

      resizeObserver.disconnect()
      window.removeEventListener("scroll", updateButton)
      window.removeEventListener("resize", updateButton)
    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "pointer-events-none fixed right-6 bottom-6 z-40 hidden",
        "lg:right-8 lg:bottom-8",
        "md:[@media(hover:hover)_and_(pointer:fine)]:block"
      )}
    >
      <IconButton
        label="Back to top"
        tooltipSide="left"
        variant="outline"
        size="icon"
        tabIndex={isVisible ? 0 : -1}
        aria-hidden={!isVisible}
        onClick={scrollToTop}
        className={cn(
          "rounded-full",
          "border-border/80 bg-background/90 shadow-sm backdrop-blur-sm",
          "transition-[opacity,transform] duration-200 ease-out",
          isVisible
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0"
        )}
      >
        <IconArrowUp aria-hidden="true" className="size-5" />
      </IconButton>
    </div>
  )
}
