import * as path from 'node:path'
import NextImage, { type ImageProps as NextImageProps } from 'next/image'

import siteConfig from '@/lib/site-config'

export default function NextImageWithBasePath({ src, ...rest }: NextImageProps) {
  const imgSrc =
    typeof src === 'string' && !/https?:\/\//.test(src)
      ? path.join(siteConfig.siteUrl.pathname, src)
      : src

  return <NextImage src={imgSrc} {...rest} />
}
