import type * as React from 'react'
import { Heading, type HeadingProps, Icon, Span } from '@chakra-ui/react'
import { IconLink } from '@tabler/icons-react'

import SmartLink from '@/components/smart-link'

function HeadingLinkIcon({
  children,
  id,
  ...rest
}: HeadingProps & React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <Heading id={id} color="fg" _hover={{ '& #link-icon': { opacity: 1 } }} {...rest}>
      {children}
      {id && (
        <Span id="link-icon" opacity={0} transition="opacity 0.3s ease">
          <SmartLink href={`#${id}`} aria-label={'Link to this section'}>
            <Icon ml={2} color="brand">
              <IconLink />
            </Icon>
          </SmartLink>
        </Span>
      )}
    </Heading>
  )
}

export function H2(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <HeadingLinkIcon
      as="h2"
      fontWeight="bold"
      fontSize="1.5em"
      letterSpacing="-0.02em"
      marginTop="1.6em"
      marginBottom="0.8em"
      lineHeight="1.4em"
      scrollMarginTop="calc(var(--header-height) + 1.5em)"
      css={{
        '& code': { fontSize: '0.9em' },
        '& + *': { marginTop: '0' },
        '& a': { font: 'inherit!' },
      }}
      {...props}
    />
  )
}

export function H3(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <HeadingLinkIcon
      as="h3"
      fontWeight="semibold"
      fontSize="1.285em"
      letterSpacing="-0.01em"
      marginTop="1.5em"
      marginBottom="0.4em"
      lineHeight="1.5em"
      scrollMarginTop="calc(var(--header-height) + 1.5em)"
      css={{
        '& code': { fontSize: '0.9em' },
        '& + *': { marginTop: '0' },
        '& a': { font: 'inherit!' },
      }}
      {...props}
    />
  )
}

export function H4(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <HeadingLinkIcon
      as="h4"
      fontWeight="semibold"
      marginTop="1.4em"
      marginBottom="0.5em"
      letterSpacing="-0.01em"
      lineHeight="1.5em"
      scrollMarginTop="calc(var(--header-height) + 1.5em)"
      css={{
        '& + *': { marginTop: '0' },
        '& a': { font: 'inherit!' },
      }}
      {...props}
    />
  )
}

export function H1(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <HeadingLinkIcon
      as="h1"
      fontWeight="bold"
      fontSize="2.15em"
      letterSpacing="-0.02em"
      marginTop="0"
      marginBottom="0.8em"
      lineHeight="1.2em"
      scrollMarginTop="calc(var(--header-height) + 1.5em)"
      {...props}
    />
  )
}
