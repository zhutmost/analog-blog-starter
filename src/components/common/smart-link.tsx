import type * as React from 'react'
import { Link as ChakraLink, type LinkProps } from '@chakra-ui/react'
import NextLink from 'next/link'

export function isUrlExternal(url: string): boolean {
  return !url.startsWith('/') && !url.startsWith('#')
}

// Unstyled link component that handles internal and external links.
// It uses Next.js Link for internal links and a regular anchor tag for external links.
export default function SmartLink({
  href,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (href?.startsWith('/')) {
    // internal page
    return <NextLink href={href} {...rest} />
  } else if (href?.startsWith('#')) {
    // internal anchor link
    return <a href={href} {...rest} />
  } else {
    // external link
    return <a target="_blank" rel="noopener noreferrer" href={href} {...rest} />
  }
}

export function Link({
  href,
  children,
  ...rest
}: LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <ChakraLink asChild {...rest}>
      <SmartLink href={href}>{children}</SmartLink>
    </ChakraLink>
  )
}
