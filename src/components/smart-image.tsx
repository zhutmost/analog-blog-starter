import * as path from 'node:path'
import { Image as ChakraImage, type ImageProps as ChakraImageProps } from '@chakra-ui/react'
import NextImage from 'next/image'

import siteConfig from '@/lib/site-config'

export default function SmartImage({ src, alt, htmlHeight, htmlWidth, ...rest }: ChakraImageProps) {
  const imgPath =
    typeof src === 'string' && !src.startsWith('http')
      ? path.join(siteConfig.siteRoot ?? '', src)
      : (src as string)

  const imgWidth = typeof htmlWidth === 'string' ? parseInt(htmlWidth, 10) : htmlWidth
  const imgHeight = typeof htmlHeight === 'string' ? parseInt(htmlHeight, 10) : htmlHeight
  const imgHasSize = imgWidth !== undefined && imgHeight !== undefined

  return (
    <ChakraImage asChild {...rest}>
      {imgHasSize ? (
        <NextImage src={imgPath} alt={alt ?? ''} height={imgHeight} width={imgWidth} />
      ) : (
        <NextImage
          src={imgPath}
          alt={alt ?? ''}
          fill // If no width and height are provided, fill the parent container
        />
      )}
    </ChakraImage>
  )
}
