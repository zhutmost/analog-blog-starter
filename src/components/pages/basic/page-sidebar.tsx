import * as React from "react"

import { cn } from "@/lib/utils"

function PageSidebarRoot({ className, ...props }: React.ComponentPropsWithoutRef<"nav">) {
  return <nav {...props} data-slot="page-sidebar" className={cn("min-w-0", className)} />
}

function PageSidebarGroup({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div {...props} data-slot="page-sidebar-group" className={cn("min-w-0", className)} />
}

function PageSidebarTitle({ className, ...props }: React.ComponentPropsWithoutRef<"p">) {
  return (
    <p
      {...props}
      data-slot="page-sidebar-title"
      className={cn("mb-4 text-sm font-medium tracking-tight text-foreground", className)}
    />
  )
}

function PageSidebarContent({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...props}
      data-slot="page-sidebar-content"
      className={cn("border-l border-border text-sm", className)}
    />
  )
}

export const PageSidebar = {
  Root: PageSidebarRoot,
  Group: PageSidebarGroup,
  Title: PageSidebarTitle,
  Content: PageSidebarContent,
}
