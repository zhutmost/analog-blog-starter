import NextImage, { type ImageProps as NextImageProps } from 'next/image'

import siteConfig from '@/lib/site-config'
import { joinUrlPath } from '@/lib/utils'

export default function NextImageWithBasePath({ src, ...rest }: NextImageProps) {
  const imgSrc =
    typeof src === 'string' && !/https?:\/\//.test(src)
      ? joinUrlPath(siteConfig.siteUrl.pathname, src)
      : src

  return <NextImage src={imgSrc} {...rest} />
}
