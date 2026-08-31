/**
 * Converts a date-only value into a Date for Intl formatting.
 *
 * UTC is used only to preserve the original calendar date. The input does not represent a UTC
 * timestamp.
 */
function toCalendarDate(value: string): Date {
  return new Date(`${value}T00:00:00.000Z`)
}

export function formatDate(value: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(toCalendarDate(value))
}

export function formatMonthYear(value: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(toCalendarDate(value))
}

export function isSameDate(a: string, b: string): boolean {
  return a === b
}
