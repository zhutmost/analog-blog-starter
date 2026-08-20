import * as React from "react"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn/table"
import { cn } from "@/lib/utils"

export function MdxTable({ className, ...props }: React.ComponentPropsWithoutRef<"table">) {
  return (
    <Table
      data-slot="mdx-table"
      className={cn("text-sm", "[&_code]:whitespace-nowrap", className)}
      {...props}
    />
  )
}

export function MdxTableHeader({ className, ...props }: React.ComponentPropsWithoutRef<"thead">) {
  return <TableHeader data-slot="mdx-table-header" className={cn(className)} {...props} />
}

export function MdxTableBody({ className, ...props }: React.ComponentPropsWithoutRef<"tbody">) {
  return <TableBody data-slot="mdx-table-body" className={cn(className)} {...props} />
}

export function MdxTableFooter({ className, ...props }: React.ComponentPropsWithoutRef<"tfoot">) {
  return <TableFooter data-slot="mdx-table-footer" className={cn(className)} {...props} />
}

export function MdxTableRow({ className, ...props }: React.ComponentPropsWithoutRef<"tr">) {
  return <TableRow data-slot="mdx-table-row" className={cn("align-top", className)} {...props} />
}

export function MdxTableHead({ className, ...props }: React.ComponentPropsWithoutRef<"th">) {
  return (
    <TableHead
      data-slot="mdx-table-head"
      className={cn("h-auto py-3 font-semibold whitespace-normal text-foreground", className)}
      {...props}
    />
  )
}

export function MdxTableCell({ className, ...props }: React.ComponentPropsWithoutRef<"td">) {
  return (
    <TableCell
      data-slot="mdx-table-cell"
      className={cn("py-3 leading-6 whitespace-normal", className)}
      {...props}
    />
  )
}

export function MdxTableCaption({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"caption">) {
  return (
    <TableCaption
      data-slot="mdx-table-caption"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}
