import slugify from "slug"

/** A normalized taxonomy item, such as a tag or category. */
export type Taxon = {
  name: string
  slug: string
}

export type TaxonomyAliases = Record<string, readonly string[]>

export type TaxonomyResolver = {
  resolve: (taxon: Taxon) => Taxon
  resolveMany: (taxons: readonly Taxon[]) => Taxon[]
}

export function createTaxonomyResolver(aliases: TaxonomyAliases = {}): TaxonomyResolver {
  const nameToCanonical = new Map<string, Taxon>()

  for (const [canonicalName, aliasNames] of Object.entries(aliases)) {
    const canonical: Taxon = {
      name: canonicalName,
      slug: slugify(canonicalName),
    }

    for (const name of [canonicalName, ...aliasNames]) {
      const existing = nameToCanonical.get(name)

      if (existing && existing.slug !== canonical.slug) {
        throw new Error(
          `Taxonomy name "${name}" is assigned to both ` +
            `"${existing.name}" and "${canonical.name}".`
        )
      }

      nameToCanonical.set(name, canonical)
    }
  }

  function resolve(taxon: Taxon): Taxon {
    return nameToCanonical.get(taxon.name) ?? taxon
  }

  function resolveMany(taxons: readonly Taxon[]): Taxon[] {
    const bySlug = new Map<string, Taxon>()

    for (const taxon of taxons) {
      const canonical = resolve(taxon)

      // Also removes duplicates when an article contains both a canonical
      // taxonomy name and one of its aliases.
      bySlug.set(canonical.slug, canonical)
    }

    return Array.from(bySlug.values())
  }

  return {
    resolve,
    resolveMany,
  }
}
