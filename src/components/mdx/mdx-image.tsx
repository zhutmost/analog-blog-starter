import type * as React from 'react'
import { Image as ChakraImage, Text, VStack } from '@chakra-ui/react'

import NextImageWithBasePath from '@/components/common/next-image-with-base-path'

export default function MdxImage({
  src,
  alt,
  title,
  width,
  height,
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  if (!src) return null

  const imgTitle = title ?? alt ?? ''

  const imgWidth = typeof width === 'string' ? parseInt(width, 10) : width
  const imgHeight = typeof height === 'string' ? parseInt(height, 10) : height

  return (
    <VStack as="figure" my="1.625em">
      <ChakraImage asChild rounded="lg">
        <NextImageWithBasePath
          src={src as string}
          alt={alt ?? 'image'}
          width={imgWidth}
          height={imgHeight}
        />
      </ChakraImage>
      {imgTitle && (
        <Text fontSize="sm" color="fg.muted">
          {imgTitle}
        </Text>
      )}
    </VStack>
  )
}
