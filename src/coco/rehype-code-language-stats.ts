import type { Root } from 'hast'
import type { MdxJsxAttribute, MdxJsxFlowElement } from 'mdast-util-mdx-jsx'
import { is } from 'unist-util-is'
import { type VisitorResult, visit } from 'unist-util-visit'

export interface RehypeCodeLanguageStatsOptions {
  codeLanguages: Set<string>
}

export default function rehypeCodeLanguageStats({ codeLanguages }: RehypeCodeLanguageStatsOptions) {
  return (tree: Root) => {
    visit(tree, (node): VisitorResult => {
      if (is(node, { type: 'mdxJsxFlowElement', name: 'pre' })) {
        // After the <pre> block is processed by rehypeMdxCodeProps, it will be converted to MdxJsxFlowElement
        const preNode = node as MdxJsxFlowElement

        const lang =
          (preNode.attributes.find((attr) => (attr as MdxJsxAttribute).name === 'language')
            ?.value as string) ?? 'plaintext'

        codeLanguages.add(lang)
      } else if (is(node, { type: 'element', tagName: 'pre' })) {
        // For raw <pre> blocks
        const lang = (node.properties?.language as string) || 'plaintext'
        codeLanguages.add(lang)
      }
    })
  }
}
