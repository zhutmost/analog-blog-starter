import child_process from 'node:child_process'
import type { Meta } from '@content-collections/core'

export function getDataUpdate(filePath: string): Date {
  let dataUpdateStdout: string
  try {
    dataUpdateStdout = child_process
      .execSync(`git log -1 --format=%cd --date=short-local -- ${filePath}`)
      .toString()
  } catch (_error) {
    dataUpdateStdout = '' // Maybe this repo is not git-initialized
  }
  // If the file was never committed, we return the current date
  return dataUpdateStdout ? new Date(dataUpdateStdout) : new Date()
}

export function assertSlugUnique(
  docs: { _meta: Meta; slug: string }[],
  collectionName: string
): void {
  const slugMap = new Map<string, { _meta: Meta }>()
  for (const doc of docs) {
    if (slugMap.has(doc.slug)) {
      throw new Error(
        `Found duplicated slug in collection [${collectionName}]: "${doc.slug}"\n` +
          `- ${slugMap.get(doc.slug)?._meta.filePath}\n` +
          `- ${doc._meta.filePath}`
      )
    }
    slugMap.set(doc.slug, doc)
  }
}
