import NextLink from "next/link"

import { IconMoodWrrr } from "@tabler/icons-react"

import { buttonVariants } from "@/components/ui/shadcn/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/shadcn/empty"

export default function NotFound() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconMoodWrrr />
        </EmptyMedia>
        <EmptyTitle>Page not found</EmptyTitle>
        <EmptyDescription>
          The page may have moved, or the address may be incorrect.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <NextLink href="/" className={buttonVariants({ variant: "default" })}>
          Back home
        </NextLink>
        <NextLink href="/posts" className={buttonVariants({ variant: "outline" })}>
          Browse articles
        </NextLink>
      </EmptyContent>
    </Empty>
  )
}
