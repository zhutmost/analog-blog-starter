import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod"

import { classifyHref } from "@/lib/href"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Zod schema helpers. */
export const mz = {
  nonEmptyString: (message = "Nonempty string required") => z.string().trim().min(1, { message }),

  optionalString: (configure: (schema: z.ZodString) => z.ZodString = (schema) => schema) =>
    z.preprocess((value) => {
      if (typeof value !== "string") {
        return value
      }

      const trimmed = value.trim()
      return trimmed === "" ? undefined : trimmed
    }, configure(z.string()).optional()),

  href: (message = "Invalid href") =>
    z
      .string()
      .trim()
      .refine((value) => classifyHref(value) !== "invalid", {
        message,
      }),

  locale: (message = "Invalid BCP 47 locale") =>
    z.string().refine(
      (locale) => {
        try {
          const _ = new Intl.Locale(locale)
          return true
        } catch {
          return false
        }
      },
      { message }
    ),
}
