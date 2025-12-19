import type * as React from 'react'
import { Button, Icon, Tag, Timeline } from '@chakra-ui/react'
import {
  IconArrowRight,
  IconChevronRight,
  IconNumber1Small,
  IconNumber2Small,
  IconNumber3Small,
  IconNumber4Small,
  IconNumber5Small,
  type Icon as TablerIcon,
} from '@tabler/icons-react'

import SmartLink from '@/components/smart-link'
import Twemojify from '@/components/twemojify'

export type TimelineNewsList = {
  date: Date
  title: string
  description?: string
}[]

export interface TimelineNewsProps {
  news: TimelineNewsList
  hrefViewAll?: string
}

const iconMap: Record<number, TablerIcon> = {
  0: IconNumber1Small,
  1: IconNumber2Small,
  2: IconNumber3Small,
  3: IconNumber4Small,
  4: IconNumber5Small,
}

export default function TimelineNews({ news, hrefViewAll }: TimelineNewsProps) {
  return (
    <Timeline.Root variant="outline" my="2">
      {news.map(({ date, title, description }, index) => {
        const dateString = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        const hasIndicatorIcon = index in iconMap
        const IndicatorIcon = hasIndicatorIcon ? iconMap[index] : undefined

        return (
          <Timeline.Item key={`news-${index.toString()}`}>
            <Timeline.Content display={{ base: 'none', md: 'block' }} w="auto">
              <Tag.Root w="80px" rounded="full">
                <Tag.Label mx="auto" fontWeight="semibold">
                  {dateString}
                </Tag.Label>
              </Tag.Root>
            </Timeline.Content>

            <Timeline.Connector>
              <Timeline.Separator />
              <Timeline.Indicator
                color={hasIndicatorIcon ? 'brand.contrast' : 'fg'}
                bgColor={hasIndicatorIcon ? 'brand' : 'bg'}
              >
                {IndicatorIcon && <IndicatorIcon />}
              </Timeline.Indicator>
            </Timeline.Connector>

            <Timeline.Content>
              <Timeline.Description display={{ base: 'block', md: 'none' }}>
                <Tag.Root w="80px" rounded="full">
                  <Tag.Label mx="auto" fontWeight="semibold">
                    {dateString}
                  </Tag.Label>
                </Tag.Root>
              </Timeline.Description>
              <Timeline.Title color="fg">
                <Twemojify>{title}</Twemojify>
              </Timeline.Title>
              {description && (
                <Timeline.Description>
                  <Twemojify>{description}</Twemojify>
                </Timeline.Description>
              )}
            </Timeline.Content>
          </Timeline.Item>
        )
      })}
      {hrefViewAll && <TimelineNewsItemViewAll href={hrefViewAll} />}
    </Timeline.Root>
  )
}

function TimelineNewsItemViewAll({ href }: { href: string }) {
  return (
    <Timeline.Item>
      <Timeline.Content display={{ base: 'none', md: 'block' }} w="auto">
        <Tag.Root w="80px" rounded="full">
          <Tag.Label mx="auto" fontWeight="semibold">
            {'(ﾉ>ω<)ﾉ'}
          </Tag.Label>
        </Tag.Root>
      </Timeline.Content>

      <Timeline.Connector>
        <Timeline.Separator />
        <Timeline.Indicator color="brand.contrast" bgColor="brand">
          <IconChevronRight />
        </Timeline.Indicator>
      </Timeline.Connector>

      <Timeline.Content verticalAlign="middle">
        <Timeline.Title color="fg">Dive into the News archive!</Timeline.Title>
        <Button asChild size="sm" w="120px" variant="outline">
          <SmartLink href={href}>
            Find More&nbsp;
            <Icon>
              <IconArrowRight />
            </Icon>
          </SmartLink>
        </Button>
      </Timeline.Content>
    </Timeline.Item>
  )
}
