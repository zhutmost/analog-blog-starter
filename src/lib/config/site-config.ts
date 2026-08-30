import "server-only"
import { ZodError } from "zod"

import { type SiteConfig, siteConfigSchema } from "@/lib/config/site-schema"

async function loadSiteConfig(): Promise<SiteConfig> {
  const siteDir = process.env.SITE_DIR ?? "sites/demo"

  try {
    const mod = await import(`../../../${siteDir}/site.config`)
    return siteConfigSchema.parse(mod.default)
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error(`Invalid site config for "${siteDir}": ${error.message}`, {
        cause: error,
      })
    }

    throw new Error(`Failed to load site config for "${siteDir}"`, {
      cause: error,
    })
  }
}

export const siteConfig: SiteConfig = await loadSiteConfig()
