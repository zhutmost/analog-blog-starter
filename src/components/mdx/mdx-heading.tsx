import React from "react"

import { IconLink } from "@tabler/icons-react"

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
      {children}
      {id && (
        <a
          href={`#${id}`}
          aria-label="Link to this section"
          data-slot="mdx-heading-anchor"
          className={cn(
            "ml-2 inline-flex align-middle text-muted-foreground opacity-0 transition-opacity",
            "group-hover:opacity-100 hover:text-primary",
            "focus-visible:opacity-100 focus-visible:outline-none",
            "focus-visible:ring-2 focus-visible:ring-ring",
            "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "motion-reduce:transition-none print:hidden"
          )}
        >
          <IconLink aria-hidden />
        </a>
      )}
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
