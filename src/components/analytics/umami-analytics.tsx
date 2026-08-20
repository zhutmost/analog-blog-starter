import Script from "next/script"

import { type SiteConfig } from "@/lib/site/schema"

type UmamiAnalyticsProps = NonNullable<SiteConfig["analytics"]["umami"]>

export function UmamiAnalytics({
  websiteId,
  src,
  hostUrl,
  domains,
  doNotTrack,
  excludeSearch,
  excludeHash,
  performance,
}: UmamiAnalyticsProps) {
  return (
    <Script
      id="umami-analytics"
      src={src}
      strategy="afterInteractive"
      data-website-id={websiteId}
      data-host-url={hostUrl}
      data-domains={domains?.join(",")}
      data-do-not-track={doNotTrack ? "true" : undefined}
      data-exclude-search={excludeSearch ? "true" : undefined}
      data-exclude-hash={excludeHash ? "true" : undefined}
      data-performance={performance ? "true" : undefined}
    />
  )
}
