import type { Root } from 'hast'
import { type VisitorResult, visit } from 'unist-util-visit'

export interface RehypeCodeLanguageStatsOptions {
  codeLanguages: Set<string>
}

export default function rehypeCodeLanguageStats({ codeLanguages }: RehypeCodeLanguageStatsOptions) {
  return (tree: Root) => {
    visit(tree, 'element', (node): VisitorResult => {
      // return
      if (node.tagName === 'pre') {
        // get 'language' property directly (assuming rehype-pre-language has run)
        const lang = (node.properties?.language as string) || 'plaintext'

        // update global statics
        codeLanguages.add(lang)
      }
    })
  }
}
