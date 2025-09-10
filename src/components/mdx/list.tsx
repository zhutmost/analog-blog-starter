import { Box, type BoxProps } from '@chakra-ui/react'

export function Ol(props: BoxProps) {
  return (
    <Box
      as="ol"
      color="fg.muted"
      mt="1em"
      mb="1em"
      paddingInlineStart="1.5em"
      css={{
        '& > li': {
          paddingInlineStart: '0.4em',
          listStyleType: 'decimal',
          '&::marker': {
            color: 'fg.subtle',
          },
          '& > p:first-of-type': {
            mt: '1em',
          },
          '& > p:last-of-type': {
            mb: '1em',
          },
        },
        '& ol, & ul': {
          mt: '0.5em',
          mb: '0.5em',
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
      mt="1em"
      mb="1em"
      paddingInlineStart="1.5em"
      css={{
        '& > li': {
          paddingInlineStart: '0.4em',
          listStyleType: 'disc',
          '&::marker': {
            color: 'fg.subtle',
          },
          '& > p:first-of-type': {
            mt: '1em',
          },
          '& > p:last-of-type': {
            mb: '1em',
          },
        },
        '& ol, & ul': {
          mt: '0.5em',
          mb: '0.5em',
        },
      }}
      {...props}
    />
  )
}

export function Li(props: BoxProps) {
  return <Box as="li" my="0.8em" {...props} />
}
