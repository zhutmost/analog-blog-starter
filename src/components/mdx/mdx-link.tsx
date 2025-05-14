import * as React from 'react'
import { IconExternalLink } from '@tabler/icons-react'

import SmartLink from '@/components/smart-link'
import { cn } from '@/lib/utils'

export default function MdxLink({
  href,
  className,
  children,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isExternal = href && !(href.startsWith('/') || href.startsWith('#'))

  return (
    <SmartLink
      className={cn(
        'text-primary no-underline hover:text-primary/80 hover:underline hover:underline-offset-2',
        className
      )}
      href={href}
      {...rest}
    >
      {children}
      {isExternal && <IconExternalLink className="ml-1 inline size-[1em] shrink-0" />}
    </SmartLink>
  )
}
