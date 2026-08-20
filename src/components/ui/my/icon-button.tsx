import * as React from "react"

import { type VariantProps } from "class-variance-authority"

import { AutoLink, type AutoLinkProps } from "@/components/ui/my"
import { Button, buttonVariants } from "@/components/ui/shadcn/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/shadcn/tooltip"
import { cn } from "@/lib/utils"

type IconButtonSize = "icon" | "icon-xs" | "icon-sm" | "icon-lg"

type IconTooltipProps = {
  label: string
  tooltip?: React.ReactNode | null
  tooltipSide?: React.ComponentProps<typeof TooltipContent>["side"]
  tooltipAlign?: React.ComponentProps<typeof TooltipContent>["align"]
}

function withIconTooltip({
  trigger,
  tooltip,
  tooltipSide = "bottom",
  tooltipAlign = "center",
}: {
  trigger: React.ReactElement
  tooltip: React.ReactNode | null | undefined
  tooltipSide?: React.ComponentProps<typeof TooltipContent>["side"]
  tooltipAlign?: React.ComponentProps<typeof TooltipContent>["align"]
}) {
  if (!tooltip) {
    return trigger
  }

  return (
    <Tooltip>
      <TooltipTrigger render={trigger} />
      <TooltipContent side={tooltipSide} align={tooltipAlign}>
        {tooltip}
      </TooltipContent>
    </Tooltip>
  )
}

export type IconButtonProps = Omit<React.ComponentProps<typeof Button>, "children" | "size"> &
  IconTooltipProps & {
    children: React.ReactNode
    size?: IconButtonSize
  }

export function IconButton({
  label,
  tooltip = label,
  tooltipSide,
  tooltipAlign,
  children,
  variant = "ghost",
  size = "icon-sm",
  type = "button",
  ...props
}: IconButtonProps) {
  const button = (
    <Button type={type} variant={variant} size={size} aria-label={label} {...props}>
      {children}
    </Button>
  )

  return withIconTooltip({
    trigger: button,
    tooltip,
    tooltipSide,
    tooltipAlign,
  })
}

export type IconLinkButtonProps = Omit<AutoLinkProps, "children" | "className"> &
  VariantProps<typeof buttonVariants> &
  IconTooltipProps & {
    children: React.ReactNode
    className?: string
    size?: IconButtonSize
  }

export function IconLinkButton({
  label,
  tooltip = label,
  tooltipSide,
  tooltipAlign,
  children,
  variant = "ghost",
  size = "icon-sm",
  className,
  ...props
}: IconLinkButtonProps) {
  const link = (
    <AutoLink
      aria-label={label}
      title={tooltip ? undefined : label}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </AutoLink>
  )

  return withIconTooltip({
    trigger: link,
    tooltip,
    tooltipSide,
    tooltipAlign,
  })
}
