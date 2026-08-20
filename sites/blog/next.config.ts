import { type NextConfig } from "next"

const nextConfig: NextConfig = {
  redirects() {
    return [
      {
        source: "/about",
        destination: "/author/haozhe-zhu",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
