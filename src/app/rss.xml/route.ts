import generateRssFeed from '@/lib/rss'

export async function GET() {
  const feed = generateRssFeed()
  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'text/xml',
    },
  })
}
