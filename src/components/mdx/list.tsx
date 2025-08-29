import { Box, type BoxProps } from '@chakra-ui/react'

export function Ol(props: BoxProps) {
  return (
    <Box
      as="ol"
      color="fg.muted"
      marginTop="1em"
      marginBottom="1em"
      paddingInlineStart="1.5em"
      css={{
        '& > li': {
          paddingInlineStart: '0.4em',
          listStyleType: 'decimal',
          '&::marker': {
            color: 'fg.subtle',
          },
          '& > p:first-of-type': {
            marginTop: '1em',
          },
          '& > p:last-of-type': {
            marginBottom: '1em',
          },
        },
        '& ol, & ul': {
          marginTop: '0.5em',
          marginBottom: '0.5em',
        },
      }}
      {...props}
    />
  )
}

export function Ul(props: BoxProps) {
  return (
    <Box
      as="ul"
      color="fg.muted"
      marginTop="1em"
      marginBottom="1em"
      paddingInlineStart="1.5em"
      css={{
        '& > li': {
          paddingInlineStart: '0.4em',
          listStyleType: 'disc',
          '&::marker': {
            color: 'fg.subtle',
          },
          '& > p:first-of-type': {
            marginTop: '1em',
          },
          '& > p:last-of-type': {
            marginBottom: '1em',
          },
        },
        '& ol, & ul': {
          marginTop: '0.5em',
          marginBottom: '0.5em',
        },
      }}
      {...props}
    />
  )
}

export function Li(props: BoxProps) {
  return <Box as="li" marginY="0.8em" {...props} />
}
