import GiscusComponent from '@giscus/react'
import { useTheme } from 'next-themes'

export interface GiscusCommentProps {
  themeURL?: `https://${string}`
  theme?: string
  darkTheme?: string
  repo: `${string}/${string}`
  repoId: string
  category?: string
  categoryId?: string
  mapping?: 'url' | 'title' | 'og:title' | 'specific' | 'number' | 'pathname'
  term?: string
  strict?: '0' | '1'
  reactionsEnabled?: '0' | '1'
  emitMetadata?: '0' | '1'
  inputPosition?: 'top' | 'bottom'
  lang?: string
}

export default function GiscusComment({
  repo,
  repoId,
  category,
  categoryId,
  mapping = 'pathname',
  term = undefined,
  strict = '0',
  themeURL = undefined,
  theme = 'noborder_light',
  darkTheme = 'noborder_gray',
  reactionsEnabled = '1',
  emitMetadata = '0',
  inputPosition = 'bottom',
  lang = 'en',
}: GiscusCommentProps) {
  const { resolvedTheme } = useTheme()
  const commentsTheme = (themeURL ?? resolvedTheme !== 'dark') ? theme : darkTheme

  const COMMENTS_ID = 'comments-container'

  return (
    <GiscusComponent
      id={COMMENTS_ID}
      repo={repo}
      repoId={repoId}
      category={category}
      categoryId={categoryId}
      term={term}
      mapping={mapping}
      strict={strict}
      reactionsEnabled={reactionsEnabled}
      emitMetadata={emitMetadata}
      inputPosition={inputPosition}
      theme={commentsTheme}
      lang={lang}
      loading="lazy"
    />
  )
}
