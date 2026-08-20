import { type MetadataRoute } from "next"

import { siteConfig } from "@/lib/site/config"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.siteTitle,
    short_name: siteConfig.siteTitle,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      ...(siteConfig.favicon.manifest192x192
        ? [
            {
              src: siteConfig.favicon.manifest192x192,
              sizes: "192x192",
              type: "image/png",
            },
          ]
        : []),
      ...(siteConfig.favicon.manifest512x512
        ? [
            {
              src: siteConfig.favicon.manifest512x512,
              sizes: "512x512",
              type: "image/png",
            },
          ]
        : []),
    ],
  }
}
