import { MobileNav } from "@/components/site/mobile-nav"
import { SiteLogo } from "@/components/site/site-logo"
import { SiteSearch } from "@/components/site/site-search"
import { ThemeToggle } from "@/components/site/theme-toggle"
import { HStack } from "@/components/ui/layout"
import { AutoLink } from "@/components/ui/my"
import { buttonVariants } from "@/components/ui/shadcn/button"
import { siteConfig } from "@/lib/config"
import { cn } from "@/lib/utils"

function MainNav() {
  const mainNav = siteConfig.header.nav

  if (!mainNav.length) {
    return null
  }

  return (
    <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
      {mainNav.map((item) => (
        <AutoLink
          key={item.href}
          href={item.href}
          className={buttonVariants({
            variant: "ghost",
            size: "sm",
          })}
        >
          {item.label}
        </AutoLink>
      ))}
    </nav>
  )
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60">
      <HStack
        gap="xs"
        className={cn(
          "items-center justify-between",
          "mx-auto w-full max-w-6xl",
          "px-4 sm:px-6 lg:px-8",
          "h-14"
        )}
      >
        <div className="flex-1">
          <SiteLogo />
        </div>

        <MainNav />
        <SiteSearch />
        <ThemeToggle />

        <MobileNav title={siteConfig.siteTitle} items={siteConfig.header.nav} />
      </HStack>
    </header>
  )
}
