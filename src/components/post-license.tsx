import siteConfig from '@/lib/site-config'
import type { Author, Post } from '@/content-collections'
import {
  IconCreativeCommons,
  IconCreativeCommonsBy,
  IconCreativeCommonsNc,
  IconCreativeCommonsNd,
  IconCreativeCommonsSa,
  IconCreativeCommonsZero,
} from '@tabler/icons-react'
import authorsFind from '@/lib/authors-find'

export interface PostLicenseProps {
  post: Post
  authors: Author[]
}

export default function PostLicense({ post, authors }: PostLicenseProps) {
  if (!siteConfig.license) return null

  const { title, slugPath, datePublish, dateUpdate } = post
  const postUrl = new URL(slugPath, siteConfig.siteUrl).toString()

  const authorName = authors[0].name + (authors.length > 1 ? ' et al.' : '')

  const datePublishString = datePublish.toLocaleDateString(siteConfig.locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
  const dateUpdateString = dateUpdate.toLocaleDateString(siteConfig.locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  const licenseIcons = {
    'cc-by-nc-sa': [IconCreativeCommonsBy, IconCreativeCommonsNc, IconCreativeCommonsSa],
    'cc-by-nc-nd': [IconCreativeCommonsBy, IconCreativeCommonsNc, IconCreativeCommonsNd],
    'cc-by-nc': [IconCreativeCommonsBy, IconCreativeCommonsNc],
    'cc-by-nd': [IconCreativeCommonsBy, IconCreativeCommonsNd],
    'cc-by-sa': [IconCreativeCommonsSa],
    'cc-by': [IconCreativeCommonsBy, IconCreativeCommonsBy],
    cc0: [IconCreativeCommonsBy, IconCreativeCommonsZero],
  }

  const licenseLink = new URL(
    siteConfig.license === 'cc0' ? 'zero/1.0' : siteConfig.license.slice(3) + '/4.0',
    'https://creativecommons.org/licenses/'
  ).toString()

  return (
    <div className="relative overflow-hidden rounded border border-border bg-muted p-5 text-muted-foreground">
      <IconCreativeCommons className="absolute -right-[50px] -top-[70px] z-20 h-72 w-72 opacity-20" />

      {/* License Title */}
      <div className="z-30 pb-5">
        <p className="font-semibold">{title}</p>
        <p className="text-sm">
          <a href={postUrl} rel="noopener noreferrer" target="_blank">
            {postUrl}
          </a>
        </p>
      </div>

      {/* License Info */}
      <div className="grid max-w-xl grid-cols-2 gap-y-2 text-sm sm:grid-cols-4">
        <div className="z-30">
          <h6 className="text-xs">Authors</h6>
          <p className="font-semibold">{authorName}</p>
        </div>
        <div className="z-30">
          <h6 className="text-xs">Posted on</h6>
          <p className="font-semibold">{datePublishString}</p>
        </div>
        <div className="z-30">
          <h6 className="text-xs">Updated on</h6>
          <p className="font-semibold">{dateUpdateString}</p>
        </div>
        <div className="z-30">
          <h6 className="text-xs">Licensed under</h6>
          <p>
            <a href={licenseLink} rel="noopener noreferrer" target="_blank">
              <span className="sr-only">{siteConfig.license}</span>
              {licenseIcons[siteConfig.license].map((Icon, index) => (
                <Icon key={index} className="inline-block h-6 w-6" />
              ))}
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}