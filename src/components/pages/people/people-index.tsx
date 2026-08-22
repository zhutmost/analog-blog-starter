import NextLink from "next/link"
import * as React from "react"

import { IconUsers } from "@tabler/icons-react"

import { PersonAvatar, TextLink, TwemojifyText } from "@/components/ui/my"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/shadcn/empty"
import {
  type AlumniPeopleGroup,
  type AlumniPerson,
  type CurrentPeopleGroup,
  type CurrentPerson,
} from "@/lib/content"
import { cn } from "@/lib/utils"

type PeopleIndexProps = {
  current: CurrentPeopleGroup[]
  alumni: AlumniPeopleGroup[]
}

export function PeopleIndex({ current, alumni }: PeopleIndexProps) {
  if (current.length === 0 && alumni.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconUsers aria-hidden="true" />
          </EmptyMedia>
          <EmptyTitle>No people yet</EmptyTitle>
          <EmptyDescription>Current members and alumni will appear here.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  return (
    <div className="space-y-16 lg:space-y-20">
      {current.map((group, index) => (
        <CurrentPeopleSection
          key={group.role}
          headingId={`current-people-group-${index + 1}`}
          group={group}
        />
      ))}

      {alumni.length > 0 && <AlumniSection groups={alumni} />}
    </div>
  )
}

type CurrentPeopleSectionProps = {
  headingId: string
  group: CurrentPeopleGroup
}

function CurrentPeopleSection({ headingId, group }: CurrentPeopleSectionProps) {
  return (
    <section aria-labelledby={headingId}>
      <PeopleSectionHeader id={headingId} title={group.role} count={group.people.length} />

      <div className="grid min-w-0 gap-x-10 lg:grid-cols-2">
        {group.people.map((person) => (
          <CurrentPersonItem key={`${person.name}-${person.startYear}`} person={person} />
        ))}
      </div>
    </section>
  )
}

type AlumniSectionProps = {
  groups: AlumniPeopleGroup[]
}

function AlumniSection({ groups }: AlumniSectionProps) {
  const count = groups.reduce((total, group) => total + group.people.length, 0)

  return (
    <section aria-labelledby="alumni-heading">
      <PeopleSectionHeader id="alumni-heading" title="Alumni" count={count} />

      <div className="pt-2">
        {groups.map((group, index) => (
          <div key={group.role} className={cn(index > 0 && "mt-2 border-t pt-2")}>
            {group.people.map((person) => (
              <AlumniPersonItem
                key={`${person.name}-${person.startYear}-${person.endYear}`}
                person={person}
                role={group.role}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

type PeopleSectionHeaderProps = {
  id: string
  title: string
  count: number
}

function PeopleSectionHeader({ id, title, count }: PeopleSectionHeaderProps) {
  return (
    <header className="flex items-baseline justify-between gap-4 border-b pb-3">
      <h2 id={id} className="font-heading text-2xl font-semibold tracking-tight">
        <TwemojifyText text={title} />
      </h2>

      <span className="font-mono text-xs text-muted-foreground tabular-nums">{count}</span>
    </header>
  )
}

function CurrentPersonItem({ person }: { person: CurrentPerson }) {
  const href = person.author ? `/author/${person.author.slug}` : undefined

  return (
    <article className="grid min-w-0 grid-cols-[4rem_minmax(0,1fr)] gap-4 py-5">
      <CurrentPersonAvatar name={person.name} src={person.avatar} href={href} />

      <div className="min-w-0 self-center">
        <PersonIdentity name={person.name} href={href} github={person.github} />

        <div className="mt-0.5 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5 text-sm text-muted-foreground">
          <span>Since {person.startYear}</span>

          {person.cosupervisors.length > 0 && (
            <>
              <span aria-hidden="true">·</span>
              <CosupervisorList supervisors={person.cosupervisors} />
            </>
          )}
        </div>

        <p className="mt-2 text-sm leading-6 text-foreground/80">
          <TwemojifyText text={person.research.join(" · ")} />
        </p>
      </div>
    </article>
  )
}

function AlumniPersonItem({ person, role }: { person: AlumniPerson; role: string }) {
  const href = person.author ? `/author/${person.author.slug}` : undefined

  return (
    <article className="py-3">
      <div className="flex min-w-0 flex-wrap items-baseline justify-between gap-x-6 gap-y-0.5">
        <PersonIdentity name={person.name} href={href} github={person.github} />

        <div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-0.5 text-sm">
          <span className="font-medium whitespace-nowrap text-foreground">
            <TwemojifyText text={role} />
          </span>

          {person.cosupervisors.length > 0 && (
            <>
              <span aria-hidden="true" className="text-muted-foreground">
                ·
              </span>

              <span className="text-muted-foreground">
                <CosupervisorList supervisors={person.cosupervisors} />
              </span>
            </>
          )}

          <span aria-hidden="true" className="text-muted-foreground">
            ·
          </span>

          <span className="whitespace-nowrap text-muted-foreground tabular-nums">
            {person.startYear}–{person.endYear}
          </span>
        </div>
      </div>

      {person.description && (
        <p className="mt-0.5 text-sm leading-6 text-muted-foreground">
          <TwemojifyText text={person.description} />
        </p>
      )}
    </article>
  )
}

type PersonIdentityProps = {
  name: string
  href?: string
  github?: string
}

function PersonIdentity({ name, href, github }: PersonIdentityProps) {
  return (
    <div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-0.5">
      <h3 className="min-w-0 text-base leading-6 font-semibold tracking-tight">
        {href ? (
          <TextLink href={href} className="hover:text-primary">
            <TwemojifyText text={name} />
          </TextLink>
        ) : (
          <TwemojifyText text={name} />
        )}
      </h3>

      {github && (
        <TextLink
          href={`https://github.com/${github}`}
          className="text-sm font-normal text-muted-foreground hover:text-foreground"
        >
          @{github}
        </TextLink>
      )}
    </div>
  )
}

type CurrentPersonAvatarProps = {
  name: string
  src?: string
  href?: string
}

function CurrentPersonAvatar({ name, src, href }: CurrentPersonAvatarProps) {
  const avatar = <PersonAvatar name={name} src={src} />

  if (!href) {
    return avatar
  }

  return (
    <NextLink
      href={href}
      aria-label={`View ${name}'s profile`}
      className={cn(
        "self-start rounded-xl transition-opacity outline-none",
        "hover:opacity-80",
        "focus-visible:ring-[3px] focus-visible:ring-ring/50"
      )}
    >
      {avatar}
    </NextLink>
  )
}

type CosupervisorListProps = {
  supervisors: readonly CurrentPerson["cosupervisors"][number][]
}

function CosupervisorList({ supervisors }: CosupervisorListProps) {
  return (
    <span>
      Co-supervised by{" "}
      {supervisors.map((supervisor, index) => (
        <React.Fragment key={`${supervisor.name}:${supervisor.href ?? ""}`}>
          {index > 0 && (index === supervisors.length - 1 ? " and " : ", ")}

          {supervisor.href ? (
            <TextLink
              href={supervisor.href}
              variant="underline"
              className="text-foreground/80 hover:text-primary"
            >
              <TwemojifyText text={supervisor.name} />
            </TextLink>
          ) : (
            <span className="text-foreground/80">
              <TwemojifyText text={supervisor.name} />
            </span>
          )}
        </React.Fragment>
      ))}
    </span>
  )
}
