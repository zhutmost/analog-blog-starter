import * as React from "react"

import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const wrapVariants = cva("flex flex-wrap", {
  variants: {
    gap: {
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-8",
      xl: "gap-12",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
    },
  },
  defaultVariants: {
    gap: "md",
    align: "center",
    justify: "start",
  },
})

type WrapOwnProps<T extends React.ElementType = "div"> = VariantProps<typeof wrapVariants> & {
  as?: T
  className?: string
}

/**
 * Props for `Wrap`, including props from the element passed to `as`.
 *
 * @template T - The element or component rendered by the `as` prop.
 */
type WrapProps<T extends React.ElementType = "div"> = WrapOwnProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof WrapOwnProps<T>>

/**
 * A wrapping horizontal flex layout primitive.
 *
 * `Wrap` is useful for tags, links, metadata, and other inline groups that should wrap onto
 * multiple lines while preserving consistent spacing.
 */
function Wrap<T extends React.ElementType = "div">({
  as,
  gap,
  align,
  justify,
  className,
  ...props
}: WrapProps<T>) {
  const Comp: React.ElementType = as || "div"
  return <Comp className={cn(wrapVariants({ gap, align, justify }), className)} {...props} />
}

export { Wrap }

export type { WrapProps }
