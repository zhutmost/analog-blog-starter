import React from "react"

import { MDXContent } from "@content-collections/mdx/react"
import { type MDXComponents } from "mdx/types"

import { GithubAlert } from "@/components/mdx/github-alert"
import { MdxBlockquote } from "@/components/mdx/mdx-blockquote"
import { MdxCode, MdxCodeBlock } from "@/components/mdx/mdx-code-highlight"
import { MdxH1, MdxH2, MdxH3, MdxH4, MdxH5, MdxH6 } from "@/components/mdx/mdx-heading"
import { MdxImage } from "@/components/mdx/mdx-image"
import { MdxImageViewer } from "@/components/mdx/mdx-image-viewer"
import { MdxLink } from "@/components/mdx/mdx-link"
import { MdxInput, MdxListItem, MdxOrderedList, MdxUnorderedList } from "@/components/mdx/mdx-list"
import {
  MdxTable,
  MdxTableBody,
  MdxTableCaption,
  MdxTableCell,
  MdxTableFooter,
  MdxTableHead,
  MdxTableHeader,
  MdxTableRow,
} from "@/components/mdx/mdx-table"
import { MdxDel, MdxEm, MdxParagraph, MdxStrong } from "@/components/mdx/mdx-text"
import { Timeline } from "@/components/mdx/timeline"
import { Kbd } from "@/components/ui/shadcn/kbd"
import { cn } from "@/lib/utils"

const mdxComponents = {
  a: MdxLink,
  blockquote: MdxBlockquote,

  h1: MdxH1,
  h2: MdxH2,
  h3: MdxH3,
  h4: MdxH4,
  h5: MdxH5,
  h6: MdxH6,

  p: MdxParagraph,
  strong: MdxStrong,
  em: MdxEm,
  del: MdxDel,

  ol: MdxOrderedList,
  ul: MdxUnorderedList,
  li: MdxListItem,
  input: MdxInput,

  table: MdxTable,
  thead: MdxTableHeader,
  tbody: MdxTableBody,
  tfoot: MdxTableFooter,
  tr: MdxTableRow,
  th: MdxTableHead,
  td: MdxTableCell,
  caption: MdxTableCaption,

  code: MdxCode,
  figure: MdxCodeBlock,

  img: MdxImage,

  Kbd,
  GithubAlert,
  Timeline,
} satisfies MDXComponents

type MdxProseProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "children" | "dangerouslySetInnerHTML"
> & {
  code: string
}

export function MdxProse({ code, className, ...props }: MdxProseProps) {
  return (
    <MdxImageViewer
      {...props}
      data-slot="mdx-prose"
      className={cn(
        "w-full",
        // Default spacing between top-level MDX blocks.
        "[&>*+*]:mt-6",

        // Larger spacing before a new section.
        "[&>h1]:mt-14",
        "[&>h2]:mt-12",
        "[&>h3]:mt-10",
        "[&>h4]:mt-8",
        "[&>h5]:mt-8",
        "[&>h6]:mt-6",

        // The first block should never have an artificial top margin.
        "[&>*:first-child]:mt-0",
        className
      )}
    >
      <MDXContent code={code} components={mdxComponents} />
    </MdxImageViewer>
  )
}
