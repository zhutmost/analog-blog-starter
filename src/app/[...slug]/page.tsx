import { type Metadata } from "next"
import { notFound } from "next/navigation"

import { CommentSystem } from "@/components/comment"
import { MdxProse } from "@/components/mdx/mdx-prose"
import { PageHeader } from "@/components/pages/basic/page-header"
import { PageShell } from "@/components/pages/basic/page-shell"
import { getUserpageBySlug, userpages } from "@/lib/content"
import { buildPageMetadata } from "@/lib/site/metadata"

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  return userpages.map((page) => ({ slug: page.slug.split("/") }))
}

export async function generateMetadata(props: PageProps<"/[...slug]">): Promise<Metadata> {
  const { slug: paramSlug } = await props.params

  const userpage = getUserpageBySlug(paramSlug.join("/"))

  if (!userpage) {
    return {}
  }

  return buildPageMetadata({
    title: userpage.title,
    description: userpage.seo.description,
    pathname: `/${userpage.slug}` satisfies `/${string}`,
    noIndex: userpage.seo.noIndex,
  })
}

export default async function UserpagePage(props: PageProps<"/[...slug]">) {
  const { slug: paramSlug } = await props.params

  const userpage = getUserpageBySlug(paramSlug.join("/"))

  if (!userpage) {
    notFound()
  }

  return (
    <PageShell.Root as="article">
      <PageShell.Top>
        <PageHeader title={userpage.title} summary={userpage.summary} />
      </PageShell.Top>

      <PageShell.Body>
        <PageShell.Content>
          <MdxProse code={userpage.content} />

          {userpage.comment && <CommentSystem />}
        </PageShell.Content>
      </PageShell.Body>
    </PageShell.Root>
  )
}
