import * as React from 'react'
import { IconLink } from '@tabler/icons-react'

import { cn } from '@/lib/utils'

interface HeadingLinkIconProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6
}

export default function HeadingLinkIcon({
  level,
  id,
  children,
  className,
  ...rest
}: HeadingLinkIconProps): React.ReactElement<HTMLHeadingElement> {
  const HeadingTag = `h${level.toString()}` as Extract<
    keyof React.JSX.IntrinsicElements,
    'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  >

  return (
    <HeadingTag
      {...rest}
      id={id}
      className={cn('group relative hover:[&_a]:opacity-100', className)}
    >
      {children}
      {id && (
        <a
          href={`#${id}`}
          className="ml-2 inline-block align-middle text-primary/0 transition-opacity hover:text-primary/80 group-hover:text-primary/60"
          aria-label="Jump to this heading"
          tabIndex={-1}
        >
          <IconLink className="size-[1em]" />
        </a>
      )}
    </HeadingTag>
  )
}
