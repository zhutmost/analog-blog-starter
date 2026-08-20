import { type Post } from "content-collections"

function compareDateDesc(a?: string | Date, b?: string | Date): number {
  const at = a ? new Date(a).getTime() : 0
  const bt = b ? new Date(b).getTime() : 0
  return bt - at
}

function compareDateAsc(a?: string | Date, b?: string | Date): number {
  return -compareDateDesc(a, b)
}

type SortKey = "datePublish" | "dateUpdate" | "title"
type SortOrder = "asc" | "desc"

export function comparePosts(key: SortKey, direction: SortOrder) {
  return (a: Pick<Post, SortKey | "slug">, b: Pick<Post, SortKey | "slug">): number => {
    let result = 0

    switch (key) {
      case "datePublish":
        result =
          direction === "asc"
            ? compareDateAsc(a.datePublish, b.datePublish)
            : compareDateDesc(a.datePublish, b.datePublish)
        break

      case "dateUpdate":
        result =
          direction === "asc"
            ? compareDateAsc(a.dateUpdate, b.dateUpdate)
            : compareDateDesc(a.dateUpdate, b.dateUpdate)
        break

      case "title": {
        const comparison = a.title.localeCompare(b.title)

        result = direction === "asc" ? comparison : -comparison
        break
      }
    }

    return result || a.slug.localeCompare(b.slug)
  }
}
