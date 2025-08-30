import { withContentCollections } from '@content-collections/next'
import type { NextConfig } from 'next'

const output = process.env.STATIC_EXPORT ? 'export' : undefined
const unoptimized = process.env.STATIC_EXPORT ? true : undefined
const basePath = process.env.BASE_PATH ?? undefined

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
    // A workaround for Turbopack build error: The high bits of the position xxxx are not all 0s or 1s.
    // Refer to: https://github.com/vercel/next.js/issues/82584
    turbopackScopeHoisting: false,
  },
}

const plugins = [withContentCollections]

export default plugins.reduce((acc, next) => next(acc), nextConfig)
