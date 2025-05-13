'use client'

import * as React from 'react'
import { IconChevronsUp, IconMenu2 } from '@tabler/icons-react'
import NextLink, { LinkProps } from 'next/link'
import { useRouter } from 'next/navigation'

import SmartImage from '@/components/smart-image'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import siteConfig from '@/lib/site-config'
import { cn } from '@/lib/utils'

export default function MobileNav() {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className={buttonVariants({ variant: 'ghost', size: 'icon' })}
        id="mobileNavOpen"
        aria-label="Open Navigation Menu"
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <IconMenu2 />
            </TooltipTrigger>
            <TooltipContent>
              <p>Menu</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </SheetTrigger>
      <SheetContent side={'top'}>
        <SheetHeader>
          <SheetTitle>
            <MobileLink href="/" onOpenChange={setOpen}>
              <div className="flex items-center justify-center gap-4">
                {siteConfig.header.logo && (
                  <SmartImage
                    src={siteConfig.header.logo}
                    alt={siteConfig.siteTitle}
                    width={30}
                    height={30}
                  />
                )}
                {siteConfig.header.title && (
                  <div className="text-xl font-bold">{siteConfig.header.title}</div>
                )}
              </div>
            </MobileLink>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-2">
          {Object.entries(siteConfig.header.menu).map(([name, href]) => (
            <MobileLink
              key={name}
              href={href}
              onOpenChange={setOpen}
              className={buttonVariants({ variant: 'ghost', size: 'lg' })}
            >
              {name}
            </MobileLink>
          ))}
        </div>
        <SheetFooter>
          <SheetClose>
            <Button
              id="mobileNavClose"
              aria-label="Close Navigation Menu"
              variant="ghost"
              size="icon"
            >
              <IconChevronsUp />
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({ href, onOpenChange, className, children, ...props }: MobileLinkProps) {
  const router = useRouter()
  const hrefString = typeof href === 'string' ? href : href.pathname!
  return (
    <NextLink
      href={href}
      onClick={() => {
        router.push(hrefString)
        onOpenChange?.(false)
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </NextLink>
  )
}
