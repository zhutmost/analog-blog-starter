import * as React from 'react'
import { PageHeader, PageHeaderDescription } from '@/components/page-header'
import NextLink from 'next/link'
import { IconArrowRight } from '@tabler/icons-react'
import Twemojify from '@/components/twemoji'

export interface HomepageSectionProps {
  children: React.ReactNode
  href: string
  title: string
  description?: string
}

export default function HomepageSection({
  children,
  href,
  title,
  description,
}: HomepageSectionProps) {
  return (
    <div>
      <PageHeader>
        <div className="flex w-full flex-wrap items-end justify-between">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter hover:opacity-80 md:text-4xl lg:leading-[1.1]">
            <NextLink href={href}>{title}</NextLink>
          </h2>
          <NextLink
            href={href}
            className="inline-flex items-center text-base font-medium leading-6 text-primary hover:text-primary/80"
          >
            View all <IconArrowRight className="ml-1 h-5 w-5" />
          </NextLink>
        </div>
        <PageHeaderDescription>
          <Twemojify>{description}</Twemojify>
        </PageHeaderDescription>
      </PageHeader>
      {children}
    </div>
  )
}
