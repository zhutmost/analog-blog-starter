"use client"

import * as React from "react"

import { IconMoon, IconSun } from "@tabler/icons-react"
import { useTheme } from "@wrksz/themes/client"

import { IconButton } from "@/components/ui/my"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <IconButton
      label="Toggle dark mode"
      tooltip={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {mounted ? (
        isDark ? (
          <IconMoon aria-hidden="true" className="size-5" />
        ) : (
          <IconSun aria-hidden="true" className="size-5" />
        )
      ) : (
        <span />
      )}
    </IconButton>
  )
}
