"use client"

import * as React from "react"

const millisecondsPerDay = 24 * 60 * 60 * 1000
const recentUpdateDayLimit = 30

type PostUpdatedDateProps = {
  value: string
  formattedValue: string
}

export function PostUpdatedDate({ value, formattedValue }: PostUpdatedDateProps) {
  const getRelativeLabel = React.useCallback(() => {
    const dayDifference = getDayDifference(value, new Date())

    if (dayDifference > 0 || dayDifference < -recentUpdateDayLimit) {
      return undefined
    }

    const locale = document.documentElement.lang || undefined
    return new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(dayDifference, "day")
  }, [value])

  const relativeLabel = React.useSyncExternalStore(
    subscribeToDateChanges,
    getRelativeLabel,
    getServerRelativeLabel
  )

  const isRelative = relativeLabel !== undefined

  return (
    <time
      dateTime={value}
      aria-label={formattedValue}
      title={isRelative ? `Updated on ${formattedValue}` : undefined}
      className={
        isRelative
          ? "decoration-dotted underline-offset-4 hover:underline hover:decoration-muted-foreground"
          : undefined
      }
    >
      {relativeLabel ?? formattedValue}
    </time>
  )
}

function subscribeToDateChanges() {
  return () => undefined
}

function getServerRelativeLabel() {
  return undefined
}

function getDayDifference(value: string, now: Date): number {
  const [year, month, day] = value.split("-").map(Number)
  const targetDate = Date.UTC(year, month - 1, day)
  const currentDate = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())

  return Math.round((targetDate - currentDate) / millisecondsPerDay)
}
