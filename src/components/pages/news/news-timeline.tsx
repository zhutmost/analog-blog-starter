import * as React from "react"

import {
  IconAward,
  IconCalendarEvent,
  IconCpu,
  IconFileText,
  IconPresentation,
  IconUsers,
} from "@tabler/icons-react"

import { TwemojifyText } from "@/components/ui/my"
import { type NewsItem } from "@/lib/content/singletons"
import { formatMonthYear } from "@/lib/site/format-date"
import { cn } from "@/lib/utils"

type TimelineTypeMeta = {
  label: string
  Icon: React.ElementType
}

const timelineTypeMeta = {
  publication: {
    label: "Publication",
    Icon: IconFileText,
  },
  talk: {
    label: "Talk",
    Icon: IconPresentation,
  },
  project: {
    label: "Project",
    Icon: IconCpu,
  },
  award: {
    label: "Award",
    Icon: IconAward,
  },
  people: {
    label: "People",
    Icon: IconUsers,
  },
  event: {
    label: "Event",
    Icon: IconCalendarEvent,
  },
} satisfies Record<
  "publication" | "talk" | "project" | "award" | "people" | "event",
  TimelineTypeMeta
>

export type TimelineProps = Omit<React.ComponentPropsWithoutRef<"ol">, "children"> & {
  items: readonly NewsItem[]
  highlightFirst?: boolean
}

export function NewsTimeline({ items, highlightFirst = true, className, ...props }: TimelineProps) {
  return (
    <ol {...props} data-slot="timeline" className={cn("min-w-0", className)}>
      {items.map((item, index) => {
        const isFirst = index === 0
        const isLast = index === items.length - 1
        const isHighlighted = highlightFirst && isFirst

        const typeMeta = item.type ? timelineTypeMeta[item.type] : undefined

        const MarkerIcon = typeMeta?.Icon

        return (
          <li
            key={`${item.date}-${item.title}`}
            data-slot="timeline-item"
            className={cn(
              "grid min-w-0",
              "grid-cols-[1.5rem_minmax(0,1fr)] gap-x-4",
              "sm:grid-cols-[7rem_1.5rem_minmax(0,1fr)]",
              "sm:gap-x-5"
            )}
          >
            <time
              dateTime={item.date}
              className={cn(
                "hidden pt-0.5 whitespace-nowrap",
                "font-mono text-sm font-medium tracking-tight tabular-nums",
                isHighlighted ? "text-primary" : "text-foreground/65",
                "sm:block"
              )}
            >
              {formatMonthYear(item.date)}
            </time>

            <div aria-hidden="true" className="relative flex justify-center">
              {!isFirst && <span className="absolute top-0 h-3 w-px bg-border" />}

              {!isLast && <span className="absolute top-3 bottom-0 w-px bg-border" />}

              <span
                className={cn(
                  "relative z-10 flex size-6 items-center justify-center",
                  "rounded-full ring-1",
                  isHighlighted
                    ? "bg-primary/10 text-primary ring-primary/20"
                    : "bg-background text-muted-foreground ring-border"
                )}
              >
                {MarkerIcon && <MarkerIcon aria-hidden="true" size={14} stroke={1.75} />}
              </span>
            </div>

            <div data-slot="timeline-item-content" className={cn("min-w-0", !isLast && "pb-8")}>
              <time
                dateTime={item.date}
                className={cn(
                  "mb-1 block whitespace-nowrap",
                  "font-mono text-xs font-medium tracking-tight tabular-nums",
                  isHighlighted ? "text-primary" : "text-foreground/60",
                  "sm:hidden"
                )}
              >
                {formatMonthYear(item.date)}
              </time>

              <div
                className={cn(
                  "max-w-3xl",
                  "text-sm leading-6 text-foreground",
                  "sm:text-base sm:leading-7"
                )}
              >
                {typeMeta && <span className="sr-only">{typeMeta.label}: </span>}

                <TwemojifyText text={item.title} />
              </div>

              {item.description && (
                <div
                  data-slot="timeline-item-description"
                  className={cn(
                    "mt-1 max-w-3xl",
                    "text-xs leading-5 text-muted-foreground",
                    "sm:text-sm sm:leading-6"
                  )}
                >
                  <TwemojifyText text={item.description} />
                </div>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
