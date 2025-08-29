'use client'

import * as React from 'react'
import { Box, IconButton } from '@chakra-ui/react'
import { IconArrowUp } from '@tabler/icons-react'

export default function BackToTop() {
  const [show, setShow] = React.useState(false)

  React.useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY > 50) setShow(true)
      else setShow(false)
    }

    window.addEventListener('scroll', handleWindowScroll)
    return () => {
      window.removeEventListener('scroll', handleWindowScroll)
    }
  }, [])

  const handleScrollTop = () => {
    window.scrollTo({ top: 0 })
  }

  return (
    // <div className={`fixed bottom-24 right-8 z-50 ${show ? 'block' : 'hidden'}`}>
    //   <button
    //     id="backToTop"
    //     aria-label="Scroll To Top"
    //     onClick={handleScrollTop}
    //     className="rounded-full bg-accent p-2 text-accent-foreground opacity-90 shadow-lg transition-all hover:text-accent-foreground/60"
    //   >
    <Box display={show ? 'block' : 'none'} zIndex="sticky" bottom="24" right="8" position="fixed">
      <IconButton
        id="backToTop"
        onClick={handleScrollTop}
        aria-label="Scroll To Top"
        variant="subtle"
        rounded="full"
        transition="all"
      >
        <IconArrowUp />
      </IconButton>
    </Box>
  )
}
