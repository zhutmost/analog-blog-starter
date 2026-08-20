import * as React from "react"

import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const containerVariants = cva("mx-auto w-full", {
  variants: {
    size: {
      prose: "max-w-3xl",
      content: "max-w-6xl",
      wide: "max-w-7xl",
      full: "max-w-none",
    },
    gutter: {
      none: "",
      sm: "px-4",
      md: "px-4 sm:px-6",
      lg: "px-4 sm:px-6 lg:px-8",
    },
  },
  defaultVariants: {
    size: "content",
    gutter: "lg",
  },
})

type ContainerOwnProps<T extends React.ElementType = "div"> = VariantProps<
  typeof containerVariants
> & {
  as?: T
  className?: string
}

type ContainerProps<T extends React.ElementType = "div"> = ContainerOwnProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof ContainerOwnProps<T>>

function Container<T extends React.ElementType = "div">({
  as,
  size,
  gutter,
  className,
  ...props
}: ContainerProps<T>) {
  const Comp: React.ElementType = as || "div"

  return <Comp className={cn(containerVariants({ size, gutter }), className)} {...props} />
}

export { Container }
export type { ContainerProps }
