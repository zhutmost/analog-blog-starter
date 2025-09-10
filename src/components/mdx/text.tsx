import { Box, type BoxProps, Code as ChakraCode } from '@chakra-ui/react'

export function P(props: BoxProps) {
  return (
    <Box
      as="p"
      lineHeight="1.7"
      mt="1em"
      mb="1em"
      css={{
        _first: { mt: '0' },
        _last: { mb: '0' },
      }}
      {...props}
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
