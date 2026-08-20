export { authors, authorMetas, userpages, postMetas, posts } from "@/lib/content/collections"
export type { Author, AuthorMeta, Userpage, Post, PostMeta } from "@/lib/content/collections"

export { categories, tags, getCategoryBySlug, getTagBySlug } from "@/lib/content/taxonomy-stats"
export type { Taxon, TaxonCount, TaxonomyEntry } from "@/lib/content/taxonomy-stats"

export { paginate, createPaginatedStaticParams } from "@/lib/content/paginate"
export type { PaginatedResult } from "@/lib/content/paginate"

export {
  getPostBySlug,
  getPostMetaBySlug,
  getAuthorBySlug,
  getAuthorMetaBySlug,
  getPostMetasByAuthorSlug,
  getUserpageBySlug,
} from "@/lib/content/query"

export { newsConfig, peopleConfig } from "@/lib/content/singletons"
export type {
  NewsConfig,
  NewsItem,
  NewsType,
  PeopleConfig,
  CurrentPerson,
  AlumniPerson,
  CurrentPeopleGroup,
  AlumniPeopleGroup,
} from "@/lib/content/singletons"
