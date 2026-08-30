import { UmamiAnalytics } from "@/components/analytics/umami-analytics"
import { siteConfig } from "@/lib/config"

export function Analytics() {
  const { umami } = siteConfig.analytics

  return (
    <>
      {umami ? (
        <UmamiAnalytics
          {...umami}
          domains={umami.domains ?? [new URL(siteConfig.siteUrl).hostname]}
        />
      ) : null}
    </>
  )
}
