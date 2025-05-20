import * as React from 'react'
import * as path from 'path'
import type { Metadata } from 'next'
import NextLink from 'next/link'
import { notFound } from 'next/navigation'

import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/page-header'
import SocialIcon from '@/components/social-icon'
import Twemojify from '@/components/twemoji'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Author } from '@/content-collections'
import { allAuthorsNonDefault, sortAuthors } from '@/lib/author-sort'
import { generatePageMetadata } from '@/lib/page-metadata'
import siteConfig from '@/lib/site-config'

function PersonCard({ author }: { author: Author }) {
  const { name, avatar, bio, slug, icons } = author
  const avatarSrc: string = path.join(siteConfig.siteRoot ?? '', avatar ?? '/avatar-default.jpg')

  return (
    <div className="p-4 md:w-1/2 lg:w-1/4">
      <div className="flex h-full flex-col items-center text-center">
        <NextLink href={`/about/${slug}`}>
          <Avatar className="mb-4 size-48">
            <AvatarImage className="object-cover" src={avatarSrc} />
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>
        </NextLink>
        <div className="w-full">
          <h2 className="text-lg font-medium text-foreground hover:text-foreground/80">
            <NextLink href={`/about/${slug}`}>{name}</NextLink>
          </h2>
          <h3 className="text-muted-foreground">{bio}</h3>
          <span className="inline-flex">
            {icons &&
              Object.entries(icons).map(([key, item]) => (
                <SocialIcon key={key} name={key} icon={item.icon} href={item.href} />
              ))}
          </span>
        </div>
      </div>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function generateMetadata(): Promise<Metadata | undefined> {
  if (!siteConfig.pages.team || allAuthorsNonDefault.length === 0) {
    return
  }
  return generatePageMetadata({
    title: 'Our Team',
  })
}

export default function Page() {
  if (!siteConfig.pages.team || allAuthorsNonDefault.length === 0) {
    return notFound()
  }

  const allAuthorsGrouped: Record<string, Author[]> = allAuthorsNonDefault.reduce<
    Record<string, Author[]>
  >((acc, a) => {
    const key: string = a._meta.directory
    acc[key] = key in acc ? acc[key] : []
    acc[key].push(a)
    return acc
  }, {})

  return (
    <div className="divide-y divide-border">
      <PageHeader>
        <PageHeaderHeading>Our Team</PageHeaderHeading>
        <PageHeaderDescription>
          <Twemojify>{siteConfig.pages.greetings.team}</Twemojify>
        </PageHeaderDescription>
      </PageHeader>
      <div>
        {Object.entries(allAuthorsGrouped).map(([group, authors]) => (
          <div key={group}>
            <PageHeader>
              <h2 className="text-3xl font-bold leading-tight tracking-tighter hover:opacity-80 md:text-4xl lg:leading-[1.1]">
                {group}
              </h2>
            </PageHeader>
            <div className="flex flex-wrap">
              {sortAuthors(authors).map((author) => (
                <PersonCard key={author.name} author={author} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
