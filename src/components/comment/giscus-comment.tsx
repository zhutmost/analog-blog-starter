"use client"

import Giscus, { type GiscusProps, type Theme } from "@giscus/react"
import { useThemeValue } from "@wrksz/themes/client"

export type GiscusCommentProps = Pick<
  GiscusProps,
  "repo" | "repoId" | "category" | "categoryId" | "mapping" | "term" | "inputPosition" | "lang"
> & {
  strict?: boolean
  reactionsEnabled?: boolean
  emitMetadata?: boolean
  theme?: Theme
  darkTheme?: Theme
}

export function GiscusComment({
  repo,
  repoId,
  category,
  categoryId,
  mapping,
  term,
  strict = false,
  reactionsEnabled = true,
  emitMetadata = false,
  inputPosition = "bottom",
  lang = "en",
  theme = "noborder_light",
  darkTheme = "noborder_gray",
}: GiscusCommentProps) {
  const resolvedTheme = useThemeValue({
    light: theme,
    dark: darkTheme ?? theme,
  })

  return (
    <Giscus
      repo={repo}
      repoId={repoId}
      category={category}
      categoryId={categoryId}
      term={term}
      mapping={mapping}
      strict={strict ? "1" : "0"}
      reactionsEnabled={reactionsEnabled ? "1" : "0"}
      emitMetadata={emitMetadata ? "1" : "0"}
      inputPosition={inputPosition}
      theme={resolvedTheme}
      lang={lang}
      loading="lazy"
    />
  )
}
