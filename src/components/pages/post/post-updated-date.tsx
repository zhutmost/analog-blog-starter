"use client"

import { useHydrated } from "@wrksz/themes/client/use-hydrated"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/shadcn/tooltip"

const millisecondsPerDay = 24 * 60 * 60 * 1000

type PostUpdatedDateProps = {
  value: string
  formattedValue: string
  locale: string
}

function getCalendarDay(value: string): number {
  const [year, month, day] = value.split("-").map(Number)

  return Date.UTC(year, month - 1, day)
}

function formatRelativeDate(value: string, locale: string): string {
  const now = new Date()

  // Compare calendar dates rather than timestamps because post dates are date-only values.
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())

  const differenceInDays = Math.round((getCalendarDay(value) - today) / millisecondsPerDay)

  return new Intl.RelativeTimeFormat(locale, {
    // Keep "1 day ago" instead of "yesterday", but use "today" for zero.
    numeric: differenceInDays === 0 ? "auto" : "always",
  }).format(differenceInDays, "day")
}

export function PostUpdatedDate({ value, formattedValue, locale }: PostUpdatedDateProps) {
  const hydrated = useHydrated()

  // The server renders the accurate absolute date. After hydration, the browser
  // replaces it with a current relative date, avoiding stale static-build output.
  const displayValue = hydrated ? formatRelativeDate(value, locale) : formattedValue

  const accurateLabel = `Updated on ${formattedValue}`

  return (
    <>
      <Tooltip>
        <TooltipTrigger
          render={
            <time
              dateTime={value}
              aria-label={accurateLabel}
              className="rounded-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 print:hidden"
            >
              Updated {displayValue}
            </time>
          }
        />

        <TooltipContent>{accurateLabel}</TooltipContent>
      </Tooltip>

      <time dateTime={value} className="hidden print:inline">
        Updated {formattedValue}
      </time>
    </>
  )
}
