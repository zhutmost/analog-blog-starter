'use client'

import siteConfig from '@/lib/site-config'

import GiscusComment from './giscus-comment'

export default function PostComment() {
  if (!siteConfig.comment.provider) {
    return null
  }

  if (siteConfig.comment.provider === 'giscus') {
    if (!siteConfig.comment.giscusConfig) {
      console.warn('Giscus comment configuration is missing.')
      return null
    }
    return <GiscusComment {...siteConfig.comment.giscusConfig} />
  } else {
    console.warn(`Unsupported comment provider: ${siteConfig.comment.provider}.`)
    return null
  }
}
