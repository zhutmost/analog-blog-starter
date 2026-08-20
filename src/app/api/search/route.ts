import { getSiteSearchData } from "@/lib/search/search-data"

export const dynamic = "force-static"

export function GET() {
  return Response.json(getSiteSearchData())
}
