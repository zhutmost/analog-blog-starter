import {
  newsConfig as newsConfigRaw,
  type NewsConfig as NewsConfigRaw,
  peopleConfig as peopleConfigRaw,
  type PeopleConfig as PeopleConfigRaw,
} from "content-collections"

import { type AuthorMeta, authorResolver } from "@/lib/content/collections"

export const newsConfig = newsConfigRaw
  ? {
      ...newsConfigRaw,
      items: newsConfigRaw.items.toSorted((a, b) => b.date.localeCompare(a.date)),
    }
  : undefined

type CurrentPersonRaw = PeopleConfigRaw["current"][string][number]
type AlumniPersonRaw = PeopleConfigRaw["alumni"][string][number]

export type CurrentPerson = Omit<CurrentPersonRaw, "author"> & {
  author?: AuthorMeta
}

export type AlumniPerson = Omit<AlumniPersonRaw, "author"> & {
  author?: AuthorMeta
}

export type PeopleGroup<T> = {
  role: string
  people: T[]
}

export type CurrentPeopleGroup = PeopleGroup<CurrentPerson>
export type AlumniPeopleGroup = PeopleGroup<AlumniPerson>

export type PeopleConfig = Omit<PeopleConfigRaw, "current" | "alumni"> & {
  current: CurrentPeopleGroup[]
  alumni: AlumniPeopleGroup[]
}

export const peopleConfig: PeopleConfig | undefined = peopleConfigRaw
  ? {
      ...peopleConfigRaw,
      current: Object.entries(peopleConfigRaw.current).map(([role, people]) => ({
        role,
        people: people
          .map((person) => transformPerson(person))
          .toSorted((a, b) => a.startYear - b.startYear),
      })),
      alumni: Object.entries(peopleConfigRaw.alumni).map(([role, people]) => ({
        role,
        people: people
          .map((person) => transformPerson(person))
          .toSorted((a, b) => b.endYear - a.endYear),
      })),
    }
  : undefined

export type NewsConfig = NewsConfigRaw
export type NewsItem = NewsConfig["items"][number]
export type NewsType = NonNullable<NewsItem["type"]>

function transformPerson<T extends CurrentPersonRaw | AlumniPersonRaw>(
  person: T
): Omit<T, "author"> & { author?: AuthorMeta } {
  const { author: authorSlug, ...rest } = person
  const resolvedAuthor = resolvePersonAuthor(person.name, authorSlug)

  return {
    ...rest,
    author: resolvedAuthor,
    avatar:
      person.avatar ??
      resolvedAuthor?.avatar ??
      (person.github ? `https://github.com/${person.github}.png?size=160` : undefined),
  }
}

function resolvePersonAuthor(
  personName: string,
  authorSlug: string | undefined
): AuthorMeta | undefined {
  const result = authorResolver.resolve(
    authorSlug
      ? {
          by: "slug",
          value: authorSlug,
        }
      : {
          by: "name",
          value: personName,
        }
  )

  if (result.status === "resolved") {
    return result.author
  }

  if (result.status === "ambiguous") {
    // oxlint-disable-next-line no-console
    console.warn(
      `Multiple authors match person "${personName}": ${result.authors
        .map((author) => `"${author.slug}"`)
        .join(", ")}. Specify "author" explicitly.`
    )

    return undefined
  }

  if (authorSlug) {
    // oxlint-disable-next-line no-console
    console.warn(`Unknown author "${authorSlug}" referenced by person "${personName}".`)
  }

  return undefined
}
