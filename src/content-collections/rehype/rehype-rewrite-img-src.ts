import path from "node:path"

import { type Element, type Root } from "hast"
import { visit } from "unist-util-visit"

export type RehypeRewriteImgSrcOptions = {
  /**
   * Public URL prefix for assets colocated with the current MDX file.
   *
   * @example
   *   "/posts/nextjs/image-test"
   */
  assetDirPath: string
}

export function normalizePublicUrl(baseUrl: string, src?: string): string | undefined {
  if (!src) {
    return undefined
  }

  if (
    /^https?:\/\//i.test(src) ||
    src.startsWith("/") ||
    src.startsWith("data:") ||
    src.startsWith("blob:")
  ) {
    return src
  }

  const normalizedBase = `/${baseUrl}`
    .replaceAll("\\", "/")
    .replace(/^\/+/, "/")
    .replace(/\/+$/, "")

  const normalizedRelativePath = src
    .replaceAll("\\", "/")
    .replace(/^\.\/+/, "")
    .replace(/^\/+/, "")

  const result = path.posix.normalize(path.posix.join(normalizedBase, normalizedRelativePath))

  if (result !== normalizedBase && !result.startsWith(`${normalizedBase}/`)) {
    throw new Error(`Image path escapes its asset directory: ${src}`)
  }

  return result
}

export function rehypeRewriteImageSrc({ assetDirPath }: RehypeRewriteImgSrcOptions) {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "img") {
        return
      }

      const src = node.properties.src

      if (typeof src !== "string" || !src) {
        return
      }

      node.properties.src = normalizePublicUrl(assetDirPath, src)
    })
  }
}
