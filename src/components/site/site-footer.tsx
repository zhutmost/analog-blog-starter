import { icons } from "@tabler/icons-react"

import { SiteLogo } from "@/components/site/site-logo"
import { VStack } from "@/components/ui/layout"
import { IconLinkButton, TextLink } from "@/components/ui/my"
import { siteConfig } from "@/lib/site/config"
import { cn } from "@/lib/utils"

const thisYear = new Date().getFullYear()

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70">
      <VStack gap="lg" className={cn("mx-auto w-full max-w-6xl", "px-4 sm:px-6 lg:px-8", "py-10")}>
        <VStack className="md:flex-row md:items-start md:justify-between">
          <SiteLogo />

          <div className="flex items-center gap-2 md:shrink-0 md:justify-self-end">
            {siteConfig.footer.socialIcons.map(({ label, href, icon }) => {
              const IconSvg =
                // oxlint-disable-next-line typescript/no-unsafe-type-assertion
                icon && icon in icons ? icons[icon as keyof typeof icons] : icons.IconFileUnknown
              return (
                <IconLinkButton key={label} label={label} href={href}>
                  <IconSvg aria-hidden="true" className="size-5" />
                </IconLinkButton>
              )
            })}
          </div>
        </VStack>

        <VStack className="text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            Copyright © {thisYear}{" "}
            <TextLink href="/about" className="hover:text-foreground">
              {siteConfig.author}
            </TextLink>
            {siteConfig.footer.beian.icp && (
              <>
                {" · "}
                <TextLink href="https://beian.miit.gov.cn" className="hover:text-foreground">
                  {siteConfig.footer.beian.icp.code}
                </TextLink>
              </>
            )}
            {siteConfig.footer.beian.publicSecurity && (
              <>
                {" · "}
                <TextLink
                  href={siteConfig.footer.beian.publicSecurity.href}
                  className="hover:text-foreground"
                >
                  {siteConfig.footer.beian.publicSecurity.code}
                </TextLink>
              </>
            )}
          </p>

          <p>
            Powered by{" "}
            <TextLink
              href="https://github.com/zhutmost/analog-blog-starter"
              className="hover:text-foreground"
            >
              Analog
            </TextLink>
          </p>
        </VStack>
      </VStack>
    </footer>
  )
}
