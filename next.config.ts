import { withContentCollections } from '@content-collections/next'
import type { NextConfig } from 'next'

// import siteConfig from '@/lib/site-config'
// const basePath = siteConfig.siteUrl.pathname !== '/' ? siteConfig.siteUrl.pathname : undefined
const basePath = process.env.BASE_PATH ?? undefined

const output = process.env.STATIC_EXPORT ? 'export' : undefined
const unoptimized = process.env.STATIC_EXPORT ? true : undefined

const nextConfig: NextConfig = {
  output,
  basePath,
  images: {
    unoptimized,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
}

const plugins = [withContentCollections]

export default plugins.reduce(
  (config: NextConfig | Promise<NextConfig>, plugin) => plugin(config),
  nextConfig
)
