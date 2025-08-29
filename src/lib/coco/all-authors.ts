import { type Author, allAuthors } from '@/coco-generated'

export type { Author } from '@/coco-generated'

export function sortAuthors(
  authors: Author[],
  order: 'asc' | 'desc' = 'asc',
  method: 'name' | 'slug' | 'dateUpdate' = 'name'
): Author[] {
  const compareFn = (a: Author, b: Author): number => {
    const methods = {
      name: () => a.name.localeCompare(b.name),
      slug: () => a.slug.localeCompare(b.slug),
      dateUpdate: () => b.dateUpdate.getTime() - a.dateUpdate.getTime(),
    }
    return methods[method]()
  }
  const authorsSorted: Author[] = authors.toSorted(compareFn)
  return order === 'asc' ? authorsSorted : authorsSorted.reverse()
}

const allAuthorsSorted: Author[] = sortAuthors(allAuthors)
export { allAuthorsSorted as allAuthors }

export const authorDefault: Author =
  allAuthors.find((a) => a.slug === 'default') ??
  (() => {
    throw new Error('A `default` author is required but not found in the list of authors.')
  })()

export const allAuthorsNonDefault: Author[] = allAuthorsSorted.filter((a) => a.slug !== 'default')
