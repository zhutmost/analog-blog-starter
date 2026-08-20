export type AuthorQuery =
  | {
      by: "slug"
      value: string
    }
  | {
      by: "name"
      value: string
    }
  | {
      by: "slug-or-name"
      value: string
    }

export type AuthorResolution<T> =
  | {
      status: "resolved"
      author: T
    }
  | {
      status: "not-found"
    }
  | {
      status: "ambiguous"
      authors: readonly T[]
    }

type AuthorIdentity = {
  slug: string
  name: string
}

export function createAuthorResolver<T extends AuthorIdentity>(authors: readonly T[]) {
  const bySlug = new Map<string, T>()
  const byNormalizedName = new Map<string, T[]>()

  for (const author of authors) {
    if (bySlug.has(author.slug)) {
      throw new Error(`Duplicate author slug "${author.slug}".`)
    }

    bySlug.set(author.slug, author)

    const nameKey = normalizeAuthorName(author.name)
    const matches = byNormalizedName.get(nameKey)

    if (matches) {
      matches.push(author)
    } else {
      byNormalizedName.set(nameKey, [author])
    }
  }

  function resolve(query: AuthorQuery): AuthorResolution<T> {
    if (query.by !== "name") {
      const author = bySlug.get(query.value)

      if (author) {
        return {
          status: "resolved",
          author,
        }
      }

      if (query.by === "slug") {
        return {
          status: "not-found",
        }
      }
    }

    const matches = byNormalizedName.get(normalizeAuthorName(query.value)) ?? []

    const [author] = matches

    if (matches.length === 1 && author) {
      return {
        status: "resolved",
        author,
      }
    }

    if (matches.length > 1) {
      return {
        status: "ambiguous",
        authors: matches,
      }
    }

    return {
      status: "not-found",
    }
  }

  return {
    resolve,
  }
}

function normalizeAuthorName(name: string): string {
  return name
    .normalize("NFKD")
    .toLowerCase()
    .replace(/\p{M}/gu, "")
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean)
    .toSorted()
    .join("\u0000")
}
