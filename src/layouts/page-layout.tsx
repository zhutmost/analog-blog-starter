import * as React from 'react'

import BackToTop from '@/components/back-to-top'
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/page-header'
import Twemojify from '@/components/twemoji'
import type { Page } from '@/content-collections'
import siteConfig from '@/lib/site-config'

export interface PageLayoutProps {
  children: React.ReactNode
  content: Page
}

export default function PageLayout({ children, content }: PageLayoutProps) {
  return (
    <>
      <BackToTop />
      <div className="divide-y divide-border">
        <PageHeader>
          <PageHeaderHeading>{content.title}</PageHeaderHeading>
          <PageHeaderDescription>
            <Twemojify>{content.description ?? siteConfig.pageGreetings.about}</Twemojify>
          </PageHeaderDescription>
        </PageHeader>
        <div className="prose prose-slate max-w-none pt-10 pb-8 dark:prose-invert prose-code:font-mono prose-pre:p-0">
          {children}
        </div>
      </div>
    </>
  )
}
