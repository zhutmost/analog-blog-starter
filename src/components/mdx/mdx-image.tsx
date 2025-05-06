import * as React from 'react'

import SmartImage from '@/components/smart-image'
import { cn } from '@/lib/utils'

export default function MdxImage({
  src,
  alt,
  title,
  className,
  width,
  height,
  ...rest
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  if (!src) return null
  const imgTitle = title ?? alt ?? ''
  return (
    <figure className="relative mx-auto h-auto max-w-3xl">
      <SmartImage
        className={cn('mx-auto h-auto max-w-full rounded-lg object-fill', className)}
        src={src as string}
        alt={alt ?? 'image'}
        width={parseInt(width! as string)}
        height={parseInt(height! as string)}
        placeholder={'empty'}
        {...rest}
      />
      {imgTitle && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {imgTitle}
        </figcaption>
      )}
    </figure>
  )
}
