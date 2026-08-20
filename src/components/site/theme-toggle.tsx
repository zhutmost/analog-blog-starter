"use client"

import { IconMoon, IconSun } from "@tabler/icons-react"
import { useTheme } from "@wrksz/themes/client"
import { useHydrated } from "@wrksz/themes/client/use-hydrated"

import { IconButton } from "@/components/ui/my"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const hydrated = useHydrated()
  const isDark = resolvedTheme === "dark"

  const label = hydrated
    ? isDark
      ? "Switch to light mode"
      : "Switch to dark mode"
    : "Toggle color theme"

  return (
    <IconButton
      label={label}
      tooltip={label}
      disabled={!hydrated}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
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
