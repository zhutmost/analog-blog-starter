import * as React from "react"

import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const stackVariants = cva("flex", {
  variants: {
    direction: {
      row: "flex-row",
      column: "flex-col",
    },
    gap: {
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-8",
      xl: "gap-12",
    },
  },
  defaultVariants: {
    direction: "column",
    gap: "md",
  },
})

type StackOwnProps<T extends React.ElementType = "div"> = VariantProps<typeof stackVariants> & {
  as?: T
  className?: string
}

/**
 * Props for `Stack`, including props from the element passed to `as`.
 *
 * @template T - The element or component rendered by the `as` prop.
 */
type StackProps<T extends React.ElementType = "div"> = StackOwnProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof StackOwnProps<T>>

/**
 * A flex layout primitive for stacking elements with consistent spacing.
 *
 * By default, `Stack` renders a vertical column with a medium gap. Use `direction="row"` for
 * horizontal layouts, or prefer `HStack` when the horizontal direction is part of the component
 * semantics.
 */
function Stack<T extends React.ElementType = "div">({
  as,
  direction,
  gap,
  className,
  ...props
}: StackProps<T>) {
  const Comp: React.ElementType = as || "div"
  return <Comp className={cn(stackVariants({ direction, gap }), className)} {...props} />
}

/**
 * Props for `HStack`.
 *
 * Same as `StackProps`, except `direction` is fixed to `"row"`.
 */
type HStackProps<T extends React.ElementType = "div"> = Omit<StackProps<T>, "direction">

/**
 * A horizontal stack layout.
 *
 * `HStack` applies the same spacing system as `Stack`, with direction fixed to `"row"`. Use it when
 * the horizontal direction is part of the intended layout semantics.
 */
function HStack<T extends React.ElementType = "div">({
  as,
  gap,
  className,
  ...props
}: HStackProps<T>) {
  const Comp: React.ElementType = as || "div"
  return <Comp className={cn(stackVariants({ direction: "row", gap }), className)} {...props} />
}

/**
 * Props for `VStack`.
 *
 * Same as `StackProps`, except `direction` is fixed to `"column"`.
 */
type VStackProps<T extends React.ElementType = "div"> = Omit<StackProps<T>, "direction">

/**
 * A vertical stack layout.
 *
 * `VStack` applies the same spacing system as `Stack`, with direction fixed to `"column"`. Use it
 * when the vertical direction is part of the intended layout semantics.
 */
function VStack<T extends React.ElementType = "div">({
  as,
  gap,
  className,
  ...props
}: VStackProps<T>) {
  const Comp: React.ElementType = as || "div"
  return <Comp className={cn(stackVariants({ direction: "column", gap }), className)} {...props} />
}

export { Stack, HStack, VStack }

export type { StackProps, HStackProps, VStackProps }
