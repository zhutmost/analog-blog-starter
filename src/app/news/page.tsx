import * as React from 'react'
import { Metadata } from 'next'

import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/page-header'
import Timeline from '@/components/timeline'
import Twemojify from '@/components/twemoji'
import timelineNews from '@/data/timeline-news'
import { generatePageMetadata } from '@/lib/page-metadata'
import siteConfig from '@/lib/site-config'

export const metadata: Metadata = generatePageMetadata({
  title: 'News',
})

export default function Page() {
  return (
    <div className="divide-y divide-border">
      <PageHeader>
        <PageHeaderHeading>News</PageHeaderHeading>
        <PageHeaderDescription>
          <Twemojify>{siteConfig.pages.greetings.news}</Twemojify>
        </PageHeaderDescription>
      </PageHeader>
      <div className="py-10">
        <Timeline timelineNews={timelineNews} />
      </div>
    </div>
  )
}
