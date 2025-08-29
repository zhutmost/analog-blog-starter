import type * as React from 'react'
import { Text, VStack } from '@chakra-ui/react'

import SmartImage from '@/components/smart-image'

export default function MdxImage({
  src,
  alt,
  title,
  width,
  height,
  ...rest
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  if (!src) return null

  const imgTitle = title ?? alt ?? ''

  return (
    <VStack as="figure" my="1.625em">
      <SmartImage
        src={src as string}
        alt={alt ?? 'image'}
        rounded="lg"
        htmlHeight={height}
        htmlWidth={width}
        {...rest}
      />
      {imgTitle && (
        <Text fontSize="sm" color="fg.muted">
          {imgTitle}
        </Text>
      )}
    </VStack>
  )
}
