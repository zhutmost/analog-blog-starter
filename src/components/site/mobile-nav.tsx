"use client"

import { IconMenu2 } from "@tabler/icons-react"

import { AutoLink, IconButton } from "@/components/ui/my"
import { buttonVariants } from "@/components/ui/shadcn/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/shadcn/sheet"
import { cn } from "@/lib/utils"

type MobileNavItem = {
  label: string
  href: string
}

type MobileNavProps = {
  title: string
  items: readonly MobileNavItem[]
}

export function MobileNav({ title, items }: MobileNavProps) {
  if (!items.length) {
    return null
  }

  return (
    <Sheet>
      <SheetTrigger
        render={
          // Keep this trigger tooltip-free. Wrapping a TooltipTrigger inside SheetTrigger nests
          // two Base UI trigger primitives around the same button, which may cause hydration
          // mismatches.
          <IconButton label="Open navigation menu" tooltip={null} className="md:hidden">
            <IconMenu2 aria-hidden="true" className="size-5" />
          </IconButton>
        }
      />

      <SheetContent side="right" className="w-72">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>Site navigation</SheetDescription>
        </SheetHeader>

        <nav aria-label="Mobile navigation" className="mt-6 grid gap-2 px-2">
          {items.map((item) => (
            <SheetClose
              key={item.href}
              render={
                <AutoLink
                  href={item.href}
                  className={cn(buttonVariants({ variant: "ghost" }), "w-full justify-start")}
                />
              }
            >
              {item.label}
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
