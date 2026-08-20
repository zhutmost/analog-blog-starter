import { type NextConfig } from "next"

import { access } from "node:fs/promises"
import path from "node:path"

import { withContentCollections } from "@content-collections/next"

const siteDir = process.env.SITE_DIR ?? "sites/demo"

const baseNextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
    ],
  },
  reactCompiler: true,
  experimental: {
    // TypeScript 7 does not provide the compiler API required by Next.js. Enable experimental.useTypeScriptCli in the
    // Next.js config to use the TypeScript CLI as a workaround.
    useTypeScriptCli: true,
    // Use the Rust port instead of the Babel transform
    turbopackRustReactCompiler: true,
  },
}

async function loadSiteNextConfig(configPath: string): Promise<NextConfig> {
  try {
    await access(configPath)
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return {}
    }
    throw error
  }

  const mod = await import(configPath)
  return mod.default ?? {}
}

export default async function config(): Promise<NextConfig> {
  const siteNextConfig = await loadSiteNextConfig(path.resolve(siteDir, "next.config.ts"))

  const nextConfig: NextConfig = {
    ...baseNextConfig,
    ...siteNextConfig,

    images: {
      ...baseNextConfig.images,
      ...siteNextConfig.images,
      remotePatterns: [
        ...(baseNextConfig.images?.remotePatterns ?? []),
        ...(siteNextConfig.images?.remotePatterns ?? []),
      ],
    },

    experimental: {
      ...baseNextConfig.experimental,
      ...siteNextConfig.experimental,
    },
  }

  return withContentCollections(nextConfig)
}
