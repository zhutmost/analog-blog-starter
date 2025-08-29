import type * as React from 'react'
import { Icon, type LinkProps } from '@chakra-ui/react'
import { IconExternalLink } from '@tabler/icons-react'

import { isUrlExternal, Link } from '@/components/smart-link'

export default function MdxLink({
  href,
  children,
  ...rest
}: LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (!href) {
    console.warn("MdxLink component received an empty 'href' prop.")
  }

  return (
    <Link
      href={href}
      variant="underline"
      color="brand"
      overflowWrap="break-word"
      display="inline"
      css={{ '& strong': { color: 'inherit' } }}
      {...rest}
    >
      {children}
      {href && isUrlExternal(href) && (
        <Icon size="sm" ml="1">
          <IconExternalLink />
        </Icon>
      )}
    </Link>
  )
}
