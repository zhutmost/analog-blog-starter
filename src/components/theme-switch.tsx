'use client'

import * as React from 'react'
import { IconMoon, IconSun, IconSunMoon } from '@tabler/icons-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const IconLight = () => <IconSun />
const IconDark = () => <IconMoon />
const IconBlank = () => <IconSunMoon />

export default function ThemeSwitch() {
  const [mounted, setMounted] = React.useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggle = () => {
    if (resolvedTheme !== 'dark') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            id="themeSwitch"
            aria-label="Theme Switch"
            onClick={toggle}
            variant="ghost"
            size="icon"
          >
            {mounted ? resolvedTheme === 'dark' ? <IconDark /> : <IconLight /> : <IconBlank />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Toggle theme</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
