import { Box, type BoxProps, Code as ChakraCode } from '@chakra-ui/react'

export function P(props: BoxProps) {
  return (
    <Box
      as="p"
      {...props}
      lineHeight="1.7"
      marginTop="1em"
      marginBottom="1em"
      css={{
        _first: { marginTop: '0' },
        _last: { marginBottom: '0' },
      }}
    />
  )
}

export function Strong(props: BoxProps) {
  return <Box as="strong" fontWeight="semibold" color="fg" {...props} />
}

export function Code({ children }: BoxProps) {
  return (
    <ChakraCode variant="subtle" size="md">
      {children}
    </ChakraCode>
  )
}
