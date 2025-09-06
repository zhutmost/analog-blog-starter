import generateRssFeed from '@/lib/rss'

export const dynamic = 'force-static'

export async function GET() {
  const feed = generateRssFeed()
  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/rss+xml',
    },
  })
}
