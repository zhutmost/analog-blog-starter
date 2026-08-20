import * as React from "react"

import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const centerVariants = cva("flex", {
  variants: {
    inline: {
      true: "inline-flex",
      false: "flex",
    },
    axis: {
      both: "items-center justify-center",
      x: "justify-center",
      y: "items-center",
    },
  },
  defaultVariants: {
    inline: false,
    axis: "both",
  },
})

type CenterOwnProps<T extends React.ElementType = "div"> = VariantProps<typeof centerVariants> & {
  as?: T
  className?: string
}

type CenterProps<T extends React.ElementType = "div"> = CenterOwnProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof CenterOwnProps<T>>

function Center<T extends React.ElementType = "div">({
  as,
  inline,
  axis,
  className,
  ...props
}: CenterProps<T>) {
  const Comp: React.ElementType = as || "div"

  return <Comp className={cn(centerVariants({ inline, axis }), className)} {...props} />
}

export { Center }
export type { CenterProps }
