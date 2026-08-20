import { MobileNav } from "@/components/site/mobile-nav"
import { SiteLogo } from "@/components/site/site-logo"
import { SiteSearch } from "@/components/site/site-search"
import { ThemeToggle } from "@/components/site/theme-toggle"
import { Container } from "@/components/ui/layout"
import { AutoLink } from "@/components/ui/my"
import { buttonVariants } from "@/components/ui/shadcn/button"
import { siteConfig } from "@/lib/site/config"

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
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60">
      <Container className="flex h-14 items-center justify-between">
        <SiteLogo />

        <div className="flex items-center gap-1">
          <MainNav />
          <SiteSearch />
          <ThemeToggle />

          <MobileNav title={siteConfig.siteTitle} items={siteConfig.header.nav} />
        </div>
      </Container>
    </header>
  )
}
