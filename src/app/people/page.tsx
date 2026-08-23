import { type Metadata } from "next"
import { notFound } from "next/navigation"

import { CommentSystem } from "@/components/comment"
import { PageHeader } from "@/components/pages/basic/page-header"
import { PageShell } from "@/components/pages/basic/page-shell"
import { PeopleIndex } from "@/components/pages/people/people-index"
import { peopleConfig } from "@/lib/content"
import { buildPageMetadata } from "@/lib/site/metadata"

export function generateMetadata(): Metadata {
  if (!peopleConfig) {
    return {}
  }

  return buildPageMetadata({
    title: peopleConfig.title,
    description: peopleConfig.seo.description,
    pathname: "/people",
    noIndex: peopleConfig.seo.noIndex,
  })
}

export default function PeoplePage() {
  if (!peopleConfig) {
    notFound()
  }

  return (
    <PageShell.Root width="6xl">
      <PageShell.Top>
        <PageHeader title={peopleConfig.title} summary={peopleConfig.summary} />
      </PageShell.Top>

      <PageShell.Body>
        <PageShell.Content>
          <PeopleIndex current={peopleConfig.current} alumni={peopleConfig.alumni} />

          {peopleConfig.comment && <CommentSystem />}
        </PageShell.Content>
      </PageShell.Body>
    </PageShell.Root>
  )
}
