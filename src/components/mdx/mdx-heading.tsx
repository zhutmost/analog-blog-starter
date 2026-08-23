import React from "react"

import { HeadingAnchor } from "@/components/mdx/heading-anchor"
import { cn } from "@/lib/utils"

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

type MdxHeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  level: HeadingLevel
}

const headingClassNames = {
  h1: "text-4xl font-extrabold leading-tight",
  h2: "text-3xl font-semibold leading-tight",
  h3: "text-2xl font-semibold leading-snug",
  h4: "text-xl font-semibold leading-snug",
  h5: "text-lg font-semibold leading-snug",
  h6: "text-base font-semibold leading-normal",
} satisfies Record<HeadingLevel, string>

function MdxHeading({ level, id, className, children, ...props }: MdxHeadingProps) {
  const HeadingTag = level

  return (
    <HeadingTag
      id={id}
      data-slot="mdx-heading"
      data-level={level}
      className={cn(
        "group scroll-m-20 font-heading tracking-tight text-balance wrap-break-word text-foreground",
        "[&_code]:text-[0.9em]",
        headingClassNames[level],
        className
      )}
      {...props}
    >
      <span data-slot="mdx-heading-content">{children}</span>
      {id && <HeadingAnchor id={id} />}
    </HeadingTag>
  )
}

export function MdxH1(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <MdxHeading level={"h1"} {...props} />
}

export function MdxH2(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <MdxHeading level={"h2"} {...props} />
}

export function MdxH3(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <MdxHeading level={"h3"} {...props} />
}

export function MdxH4(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <MdxHeading level={"h4"} {...props} />
}

export function MdxH5(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <MdxHeading level={"h5"} {...props} />
}

export function MdxH6(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <MdxHeading level={"h6"} {...props} />
}
