import { withContentCollections } from '@content-collections/next'
import { NextConfig } from 'next'

const output = process.env.STATIC_EXPORT ? 'export' : undefined
const unoptimized = process.env.STATIC_EXPORT ? true : undefined
const basePath = process.env.BASE_PATH ?? undefined

const nextConfig: NextConfig = {
  output,
  basePath,
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
    unoptimized,
  },
}

const plugins = [withContentCollections]

export default plugins.reduce((acc, next) => next(acc), nextConfig)
