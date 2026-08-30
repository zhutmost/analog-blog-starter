import NextImage from "next/image"

import { HomeLink } from "@/components/site/home-link"
import { siteConfig } from "@/lib/config"

export function SiteLogo() {
  return (
    <HomeLink
      href="/"
      className="group flex min-w-0 items-center gap-4"
      aria-label={`${siteConfig.siteTitle} home`}
    >
      {siteConfig.header.logo && (
        <span className="relative size-7 shrink-0 overflow-hidden rounded-md ring-1 ring-border/70">
          <NextImage
            src={siteConfig.header.logo}
            alt=""
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </span>
      )}

      <span className="truncate font-heading text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
        {siteConfig.header.title ?? siteConfig.siteTitle}
      </span>
    </HomeLink>
  )
}
