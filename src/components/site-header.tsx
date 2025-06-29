'use client'

import NextLink from 'next/link'

import MobileNav from '@/components/mobile-nav'
import SearchButton from '@/components/search/search-button'
import SmartImage from '@/components/smart-image'
import ThemeSwitch from '@/components/theme-switch'
import { buttonVariants } from '@/components/ui/button'
import siteConfig from '@/lib/site-config'
import { cn } from '@/lib/utils'

export default function SiteHeader() {
  const isBlurred = true
  const menuLength: number = Object.keys(siteConfig.header.menu).length

  return (
    <header
      className={cn(
        'z-50 flex h-auto w-full items-center justify-center sticky inset-x-0 top-0',
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        isBlurred
          ? 'bg-background/70 backdrop-blur-lg backdrop-saturate-150'
          : 'bg-background border-b-2 border-border/20'
      )}
    >
      <nav className="relative flex h-14 w-full max-w-5xl flex-row flex-nowrap items-center justify-between gap-4 px-3">
        <NextLink href="/" className="flex items-center gap-4">
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
        </NextLink>
        <ul className="flex h-full grow basis-0 flex-row flex-nowrap items-center justify-end gap-1">
          {Object.entries(siteConfig.header.menu).map(([label, href]) => (
            <li
              key={label}
              className={cn(
                'box-border hidden list-none whitespace-nowrap font-medium',
                menuLength > 4 ? 'md:block' : 'sm:block'
              )}
            >
              <NextLink className={buttonVariants({ variant: 'ghost' })} href={href}>
                {label}
              </NextLink>
            </li>
          ))}
          <li>
            <SearchButton />
          </li>
          <li>
            <ThemeSwitch />
          </li>
          <li className={menuLength > 4 ? 'md:hidden' : 'sm:hidden'}>
            <MobileNav />
          </li>
        </ul>
      </nav>
    </header>
  )
}
