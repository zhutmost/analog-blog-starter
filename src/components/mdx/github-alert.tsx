import * as React from "react"

import {
  IconAlertCircle,
  IconAlertTriangle,
  IconBulb,
  IconCircleX,
  IconInfoCircle,
} from "@tabler/icons-react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const githubAlertKeywords = ["note", "tip", "important", "warning", "caution"] as const

export type GithubAlertKeyword = (typeof githubAlertKeywords)[number]

const githubAlertConfig = {
  note: {
    icon: IconInfoCircle,
    defaultTitle: "Note",
  },
  tip: {
    icon: IconBulb,
    defaultTitle: "Tip",
  },
  important: {
    icon: IconAlertCircle,
    defaultTitle: "Important",
  },
  warning: {
    icon: IconAlertTriangle,
    defaultTitle: "Warning",
  },
  caution: {
    icon: IconCircleX,
    defaultTitle: "Caution",
  },
} satisfies Record<
  GithubAlertKeyword,
  {
    icon: typeof IconInfoCircle
    defaultTitle: string
  }
>

const githubAlertVariants = cva(
  ["relative overflow-hidden rounded-lg border", "px-4 py-3.5 pl-5 shadow-xs"],
  {
    variants: {
      variant: {
        note: [
          "border-blue-500/20 bg-blue-500/[0.045]",
          "dark:border-blue-400/20 dark:bg-blue-400/[0.06]",
        ],
        tip: [
          "border-emerald-500/20 bg-emerald-500/[0.045]",
          "dark:border-emerald-400/20 dark:bg-emerald-400/[0.06]",
        ],
        important: [
          "border-violet-500/20 bg-violet-500/[0.045]",
          "dark:border-violet-400/20 dark:bg-violet-400/[0.06]",
        ],
        warning: [
          "border-amber-500/25 bg-amber-500/[0.055]",
          "dark:border-amber-400/25 dark:bg-amber-400/[0.07]",
        ],
        caution: [
          "border-red-500/20 bg-red-500/[0.045]",
          "dark:border-red-400/20 dark:bg-red-400/[0.06]",
        ],
      },
    },
    defaultVariants: {
      variant: "note",
    },
  }
)

const githubAlertAccentVariants = cva("absolute inset-y-0 left-0 w-1", {
  variants: {
    variant: {
      note: "bg-blue-500 dark:bg-blue-400",
      tip: "bg-emerald-500 dark:bg-emerald-400",
      important: "bg-violet-500 dark:bg-violet-400",
      warning: "bg-amber-500 dark:bg-amber-400",
      caution: "bg-red-500 dark:bg-red-400",
    },
  },
  defaultVariants: {
    variant: "note",
  },
})

const githubAlertHeaderVariants = cva("flex items-center gap-2.5 text-sm font-semibold", {
  variants: {
    variant: {
      note: "text-blue-700 dark:text-blue-300",
      tip: "text-emerald-700 dark:text-emerald-300",
      important: "text-violet-700 dark:text-violet-300",
      warning: "text-amber-700 dark:text-amber-300",
      caution: "text-red-700 dark:text-red-300",
    },
  },
  defaultVariants: {
    variant: "note",
  },
})

export type GithubAlertProps = Omit<React.ComponentPropsWithoutRef<"div">, "title"> & {
  keyword?: string
  title?: React.ReactNode
}

function isGithubAlertKeyword(keyword: string): keyword is GithubAlertKeyword {
  return githubAlertKeywords.some((candidate) => candidate === keyword)
}

function resolveGithubAlertKeyword(keyword: string | undefined): GithubAlertKeyword {
  const normalizedKeyword = keyword?.toLowerCase()

  if (normalizedKeyword && isGithubAlertKeyword(normalizedKeyword)) {
    return normalizedKeyword
  }

  return "note"
}

export function GithubAlert({
  keyword,
  title,
  className,
  children,
  role = "note",
  "aria-label": ariaLabel,
  ...props
}: GithubAlertProps) {
  const variant = resolveGithubAlertKeyword(keyword)
  const config = githubAlertConfig[variant]
  const AlertIcon = config.icon
  const resolvedTitle = title ?? config.defaultTitle

  const accessibleLabel = typeof resolvedTitle === "string" ? resolvedTitle : undefined

  return (
    <div
      role={role}
      aria-label={ariaLabel ?? accessibleLabel}
      data-slot="github-alert"
      data-variant={variant}
      className={cn(githubAlertVariants({ variant }), className)}
      {...props}
    >
      <span
        aria-hidden
        data-slot="github-alert-accent"
        className={githubAlertAccentVariants({
          variant,
        })}
      />

      <div
        data-slot="github-alert-header"
        className={githubAlertHeaderVariants({
          variant,
        })}
      >
        <AlertIcon aria-hidden className="size-5 shrink-0" />

        <div data-slot="github-alert-title">{resolvedTitle}</div>
      </div>

      <div
        data-slot="github-alert-content"
        className={cn(
          "mt-2.5 min-w-0",
          "text-sm leading-6 text-foreground/90",

          // Spacing between paragraphs, lists, code blocks, etc.
          "[&>*+*]:mt-3",

          // Prevent accidental outer paragraph margins.
          "[&>p:first-child]:mt-0",
          "[&>p:last-child]:mb-0",

          // Preserve emphasis inside tinted backgrounds.
          "[&_strong]:text-foreground"
        )}
      >
        {children}
      </div>
    </div>
  )
}
