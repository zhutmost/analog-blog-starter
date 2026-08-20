import { icons } from "@tabler/icons-react"

import { Wrap } from "@/components/ui/layout"
import { IconLinkButton, PersonAvatar } from "@/components/ui/my"
import { type AuthorMeta } from "@/lib/content"
import { cn } from "@/lib/utils"

type AuthorProfileProps = Omit<React.ComponentPropsWithoutRef<"header">, "children"> & {
  author: AuthorMeta
}

export function AuthorProfile({ author, className, ...props }: AuthorProfileProps) {
  return (
    <header {...props} data-slot="author-profile" className={cn("min-w-0", className)}>
      <div className="flex items-center gap-4 lg:block">
        <PersonAvatar name={author.name} src={author.avatar} size="xl" />

        <h1
          data-slot="author-name"
          className={cn(
            "min-w-0 font-heading text-3xl leading-tight font-semibold tracking-tight",
            "text-balance wrap-break-word",
            "sm:text-4xl",
            "lg:mt-6 lg:text-3xl"
          )}
        >
          {author.name}
        </h1>
      </div>

      {author.summary && (
        <p
          data-slot="author-summary"
          className="mt-4 text-sm leading-relaxed text-muted-foreground"
        >
          {author.summary}
        </p>
      )}

      {author.info.length > 0 && (
        <dl
          data-slot="author-info"
          className={cn(
            "mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm",
            "sm:grid-cols-3",
            "lg:block lg:space-y-3"
          )}
        >
          {author.info.map((item) => (
            <div key={item.label} className="min-w-0">
              <dt className="text-xs text-muted-foreground">{item.label}</dt>

              <dd className="mt-0.5 wrap-break-word text-foreground/85">{item.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {author.socials.length > 0 && (
        <Wrap data-slot="author-socials" gap="sm" className="mt-5">
          {author.socials.map(({ label, href, icon }) => {
            const IconSvg =
              // oxlint-disable-next-line typescript/no-unsafe-type-assertion
              icon && icon in icons ? icons[icon as keyof typeof icons] : icons.IconFileUnknown

            return (
              <IconLinkButton key={label} label={label} href={href}>
                <IconSvg aria-hidden="true" className="size-5" />
              </IconLinkButton>
            )
          })}
        </Wrap>
      )}
    </header>
  )
}
