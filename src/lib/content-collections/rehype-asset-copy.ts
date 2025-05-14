import * as fs from 'fs'
import * as path from 'path'
import { Element } from 'hast'
import { Root } from 'mdast'
import { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

export interface rehypeAssetCopyOptions {
  assetPath: string
}

function copyFolder(src: string, dest: string): void {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true })
  }

  const items = fs.readdirSync(src)
  items.forEach((item) => {
    const srcPath = path.join(src, item)
    const destPath = path.join(dest, item)

    if (fs.lstatSync(srcPath).isDirectory()) {
      copyFolder(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  })
}

export function assetSourceRedirect(
  src: string | undefined,
  assetPath: string
): string | undefined {
  if (!src || src.startsWith('http') || src.startsWith('/')) {
    return src
  }
  return path.join('/_assets', assetPath, src)
}

const rehypeAssetCopy: Plugin<[rehypeAssetCopyOptions], Root> = ({ assetPath }) => {
  const srcFolder = path.join(assetPath)
  const destFolder = path.join('./public/_assets', assetPath)

  const srcExist = fs.existsSync(srcFolder) && fs.lstatSync(srcFolder).isDirectory()
  if (srcExist) {
    copyFolder(srcFolder, destFolder)
  }

  return (tree) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName === 'img') {
        node.properties.src = assetSourceRedirect(node.properties.src as string, assetPath)
      }
    })
  }
}

export default rehypeAssetCopy
