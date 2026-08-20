import { type PostMeta, postMetas } from "@/lib/content/collections"
import { type Taxon } from "@/lib/content/taxonomy-resolver"

export type { Taxon } from "@/lib/content/taxonomy-resolver"

/** A taxonomy item with the number of posts associated with it. */
export type TaxonCount = Taxon & {
  count: number
}

/** A full taxonomy entry containing both metadata and associated posts. */
export type TaxonomyEntry = TaxonCount & {
  posts: PostMeta[]
}

type TaxonomyRegistry = {
  stats: TaxonCount[]
  bySlug: ReadonlyMap<string, TaxonomyEntry>
}

/**
 * Creates a taxonomy registry from posts using the provided taxon selector.
 *
 * The selector should always return an array. Single-value taxonomies, such as category, should be
 * wrapped as a one-item array by the caller.
 *
 * @param posts - The posts to build the registry from.
 * @param selector - Function that extracts taxons from a post.
 * @returns A registry containing sorted statistics and slug-based lookup entries.
 */
function createTaxonomyRegistry(
  posts: PostMeta[],
  selector: (post: PostMeta) => Taxon[]
): TaxonomyRegistry {
  const bySlug = new Map<string, TaxonomyEntry>()

  for (const post of posts) {
    // Defensive deduplication. Normally posts have already been canonicalized
    // and deduplicated in collections.ts.
    const seenSlugs = new Set<string>()

    for (const taxon of selector(post)) {
      if (seenSlugs.has(taxon.slug)) {
        continue
      }

      seenSlugs.add(taxon.slug)

      const existing = bySlug.get(taxon.slug)

      if (existing) {
        if (existing.name !== taxon.name) {
          throw new Error(
            `Taxonomy slug collision: "${existing.name}" and "${taxon.name}" ` +
              `both resolve to "${taxon.slug}".`
          )
        }

        existing.count += 1
        existing.posts.push(post)
      } else {
        bySlug.set(taxon.slug, {
          name: taxon.name,
          slug: taxon.slug,
          count: 1,
          posts: [post],
        })
      }
    }
  }

  const stats = Array.from(bySlug.values(), ({ name, slug, count }) => ({
    name,
    slug,
    count,
  })).toSorted(compareTaxonCounts)

  return { stats, bySlug }
}

function compareTaxonCounts(a: TaxonCount, b: TaxonCount) {
  if (a.count !== b.count) {
    return b.count - a.count
  }
  return a.name.localeCompare(b.name)
}

const tagRegistry = createTaxonomyRegistry(postMetas, (post) => post.tags)

const categoryRegistry = createTaxonomyRegistry(postMetas, (post) =>
  post.category ? [post.category] : []
)

/** All tags used by visible posts, sorted by post count in descending order. */
export const tags: TaxonCount[] = tagRegistry.stats

/** All categories used by visible posts, sorted by post count in descending order. */
export const categories: TaxonCount[] = categoryRegistry.stats

/**
 * Finds a tag entry by its slug.
 *
 * @param slug - The tag slug.
 * @returns The matching tag entry, or `undefined` if the slug does not exist.
 */
export function getTagBySlug(slug: string): TaxonomyEntry | undefined {
  return tagRegistry.bySlug.get(slug)
}

/**
 * Finds a category entry by its slug.
 *
 * @param slug - The category slug.
 * @returns The matching category entry, or `undefined` if the slug does not exist.
 */
export function getCategoryBySlug(slug: string): TaxonomyEntry | undefined {
  return categoryRegistry.bySlug.get(slug)
}
