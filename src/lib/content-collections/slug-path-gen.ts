import { Meta } from '@content-collections/core'
import slugify from '@sindresorhus/slugify'

export default function slugPathGenerate(document: { _meta: Meta }): string {
  return document._meta.path
    .split('/')
    .map((part) => slugify(part)) // remove special chars
    .join('/')
}
