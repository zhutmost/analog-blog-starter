import * as React from "react"

import { IconMicroscope } from "@tabler/icons-react"

import { HomeSection } from "@/components/home/home-section"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/shadcn/empty"
import { cn } from "@/lib/utils"

type HomeSectionResearchArea = {
  title: string
  description: string
  keywords?: string[]
}

export type HomeSectionResearchProps = Omit<
  React.ComponentPropsWithoutRef<"section">,
  "children"
> & {
  areas: readonly HomeSectionResearchArea[]
  title: string
  summary: string
  href: string | null
  actionLabel: string
}

export function HomeSectionResearch({
  areas,
  title,
  summary,
  href,
  actionLabel,
  className,
  ...props
}: HomeSectionResearchProps) {
  return (
    <HomeSection.Root
      {...props}
      aria-labelledby="home-research-title"
      data-slot="home-research"
      className={className}
    >
      <HomeSection.Header>
        <HomeSection.Heading>
          <HomeSection.Title id="home-research-title">{title}</HomeSection.Title>

          <HomeSection.Description>{summary}</HomeSection.Description>
        </HomeSection.Heading>

        {href && <HomeSection.Action href={href}>{actionLabel}</HomeSection.Action>}
      </HomeSection.Header>

      <HomeSection.Content>
        {areas.length > 0 ? (
          <ol data-slot="home-research-list" className="space-y-8 sm:space-y-10">
            {areas.map((area, index) => (
              <li
                key={area.title}
                className={cn(
                  "grid min-w-0 gap-x-4 gap-y-3",
                  "sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-x-6",
                  "lg:grid-cols-[3rem_minmax(0,18rem)_minmax(0,1fr)]",
                  "lg:items-start lg:gap-x-8"
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn("pt-1 font-mono text-xs tabular-nums", "text-muted-foreground/45")}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3
                  className={cn(
                    "font-heading text-lg font-semibold tracking-tight",
                    "text-foreground sm:text-xl"
                  )}
                >
                  {area.title}
                </h3>

                <div className={cn("min-w-0", "col-start-2", "lg:col-start-3 lg:row-start-1")}>
                  <div
                    className={cn(
                      "max-w-2xl text-sm leading-6",
                      "text-muted-foreground",
                      "sm:text-base sm:leading-7"
                    )}
                  >
                    {area.description}
                  </div>

                  {area.keywords && area.keywords.length > 0 && (
                    <ul
                      aria-label={`${area.title} topics`}
                      className={cn(
                        "mt-3 flex flex-wrap items-center",
                        "text-xs leading-5 text-muted-foreground/65"
                      )}
                    >
                      {area.keywords.map((keyword, keywordIndex, keywords) => (
                        <li key={keyword}>
                          {keyword}

                          {keywordIndex < keywords.length - 1 && (
                            <span aria-hidden="true" className="mx-1.5 text-muted-foreground/35">
                              ·
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <Empty className="border">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <IconMicroscope aria-hidden="true" />
              </EmptyMedia>

              <EmptyTitle>Research in progress</EmptyTitle>

              <EmptyDescription>
                Research directions and ongoing work will appear here soon.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </HomeSection.Content>
    </HomeSection.Root>
  )
}
