import { generateRssFeed } from "@/lib/site/rss"

export const dynamic = "force-static"

export function GET(): Response {
  const feed = generateRssFeed()
  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  })
}
