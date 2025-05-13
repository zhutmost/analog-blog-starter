import * as React from 'react'
import { IconArrowRight } from '@tabler/icons-react'
import NextLink from 'next/link'

import SocialIcon from '@/components/social-icon'
import { buttonVariants } from '@/components/ui/button'

type StringOrReactNode = string | React.ReactNode

export interface TimelineItemProps {
  date: Date
  title: StringOrReactNode
  description?: StringOrReactNode
  icons?: Record<string, { icon: string; href: string }>
}

export interface TimelineProps {
  timelineNews: TimelineItemProps[]
  findMore?: boolean
}

function TimelineItem({ date, title, description, icons }: TimelineItemProps) {
  return (
    <div className="group relative py-2 pl-8 sm:pl-32">
      <div className="mb-1 flex flex-col items-start before:absolute before:left-2 before:h-full before:-translate-x-1/2 before:translate-y-3 before:self-start before:bg-accent before:px-px after:absolute after:left-2 after:box-content after:h-2 after:w-2 after:-translate-x-1/2 after:translate-y-1.5 after:rounded-full after:border-4 after:border-muted after:bg-primary group-last:before:hidden sm:flex-row sm:before:left-0 sm:before:ml-[6.5rem] sm:after:left-0 sm:after:ml-[6.5rem]">
        <time className="left-0 mb-3 inline-flex h-6 w-20 translate-y-0.5 items-center justify-center rounded-full bg-secondary text-xs font-semibold uppercase text-secondary-foreground sm:absolute sm:mb-0">
          {date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
        </time>
        <div className="text-base font-bold text-foreground">{title}</div>
      </div>
      {description && <div className="text-sm text-muted-foreground">{description}</div>}
      {icons && (
        <div className="flex gap-2 py-1">
          {Object.entries(icons).map(([key, item]) => (
            <SocialIcon key={key} name={key} icon={item.icon} href={item.href} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function Timeline({ timelineNews, findMore = false }: TimelineProps) {
  if (timelineNews.length === 0) {
    return (
      <div className="-my-6">
        <TimelineItem
          date={new Date()}
          title={'Nothing happened yet'}
          description={'Always believe that something wonderful is about to happen.'}
        />
      </div>
    )
  }

  return (
    <div className="-my-6">
      {timelineNews.map((news, index) => (
        <TimelineItem {...news} key={index} />
      ))}
      {findMore && (
        <div className="group relative pb-6 pl-8 pt-2 sm:pl-32">
          <div className="mb-1 flex flex-col items-start before:absolute before:left-2 before:h-full before:-translate-x-1/2 before:translate-y-3 before:self-start before:bg-accent before:px-px after:absolute after:left-2 after:box-content after:h-2 after:w-2 after:-translate-x-1/2 after:translate-y-1.5 after:rounded-full after:border-4 after:border-muted after:bg-primary group-last:before:hidden sm:flex-row sm:before:left-0 sm:before:ml-[6.5rem] sm:after:left-0 sm:after:ml-[6.5rem]">
            <NextLink href="/news" className={buttonVariants({ variant: 'outline' })}>
              Find more <IconArrowRight className="ml-2 size-5" />
            </NextLink>
          </div>
        </div>
      )}
    </div>
  )
}
