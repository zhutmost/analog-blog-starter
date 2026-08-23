"use client"

import { flushSync } from "react-dom"

import { IconMoon, IconSun } from "@tabler/icons-react"
import { useTheme } from "@wrksz/themes/client"
import { useHydrated } from "@wrksz/themes/client/use-hydrated"

import { IconButton } from "@/components/ui/my"

function clearThemeTransitionState() {
  delete document.documentElement.dataset.themeTransition
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const hydrated = useHydrated()
  const isDark = resolvedTheme === "dark"

  const label = hydrated
    ? isDark
      ? "Switch to light mode"
      : "Switch to dark mode"
    : "Toggle color theme"

  function handleClick() {
    const nextTheme = isDark ? "light" : "dark"
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReducedMotion || typeof document.startViewTransition !== "function") {
      setTheme(nextTheme)
      return
    }

    document.documentElement.dataset.themeTransition = ""

    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(nextTheme))
    })

    void transition.finished.then(clearThemeTransitionState, clearThemeTransitionState)
  }

  return (
    <IconButton label={label} tooltip={label} disabled={!hydrated} onClick={handleClick}>
      {hydrated ? (
        isDark ? (
          <IconSun aria-hidden="true" className="size-5" />
        ) : (
          <IconMoon aria-hidden="true" className="size-5" />
        )
      ) : (
        <span aria-hidden="true" className="size-5" />
      )}
    </IconButton>
  )
}
