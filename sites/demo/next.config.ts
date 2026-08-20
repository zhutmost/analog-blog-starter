import { type NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
    ],
  },
  redirects() {
    return [
      {
        source: "/about",
        destination: "/author/luna-lovegood",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
