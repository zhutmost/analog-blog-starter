import * as React from "react"

import { CodeBlockContent } from "@/components/mdx/code-block-content"
import { cn } from "@/lib/utils"

type MdxCodeBlockProps = React.ComponentPropsWithoutRef<"figure"> & {
  "data-rehype-pretty-code-figure"?: string
}

type PrettyCodeNodeProps = {
  children?: React.ReactNode
  "data-rehype-pretty-code-title"?: string
  "data-rehype-pretty-code-caption"?: string
}

type PrettyCodePreProps = React.ComponentPropsWithoutRef<"pre"> & {
  "data-language"?: string
  "data-theme"?: string
  "data-slot"?: string
}

const languageNames: Record<string, string> = {
  bash: "Bash",
  css: "CSS",
  html: "HTML",
  js: "JavaScript",
  javascript: "JavaScript",
  json: "JSON",
  jsx: "JSX",
  md: "Markdown",
  markdown: "Markdown",
  mdx: "MDX",
  plaintext: "Text",
  txt: "Text",
  text: "Text",
  shell: "Shell",
  sh: "Shell",
  ts: "TypeScript",
  tsx: "TSX",
  typescript: "TypeScript",
  yaml: "YAML",
  yml: "YAML",
}

function getNodeText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node)
  }

  if (Array.isArray(node)) {
    return node.map(getNodeText).join("")
  }

  if (
    React.isValidElement<{
      children?: React.ReactNode
    }>(node)
  ) {
    return getNodeText(node.props.children)
  }

  return ""
}

function hasPrettyCodeAttribute(
  node: React.ReactNode,
  attribute: "data-rehype-pretty-code-title" | "data-rehype-pretty-code-caption"
): node is React.ReactElement<PrettyCodeNodeProps> {
  return React.isValidElement<PrettyCodeNodeProps>(node) && Object.hasOwn(node.props, attribute)
}

function isPreElement(node: React.ReactNode): node is React.ReactElement<PrettyCodePreProps> {
  return React.isValidElement<PrettyCodePreProps>(node) && node.type === "pre"
}

function getLanguageName(language: string): string {
  return languageNames[language] ?? language.toUpperCase()
}

export function MdxCodeBlock({
  children,
  className,
  "data-rehype-pretty-code-figure": prettyCodeFigure,
  ...props
}: MdxCodeBlockProps) {
  // Preserve ordinary MDX figures.
  if (prettyCodeFigure === undefined) {
    return (
      <figure className={className} {...props}>
        {children}
      </figure>
    )
  }

  const nodes = React.Children.toArray(children)

  const titleNode = nodes.find((node) =>
    hasPrettyCodeAttribute(node, "data-rehype-pretty-code-title")
  )

  const captionNode = nodes.find((node) =>
    hasPrettyCodeAttribute(node, "data-rehype-pretty-code-caption")
  )

  const preNode = nodes.find(isPreElement)

  // Defensive fallback in case the plugin output changes.
  if (!preNode) {
    return (
      <figure data-rehype-pretty-code-figure="" className={className} {...props}>
        {children}
      </figure>
    )
  }

  const language = preNode.props["data-language"] ?? "plaintext"

  const languageName = getLanguageName(language)

  const title = titleNode ? getNodeText(titleNode.props.children) : undefined

  const code = getNodeText(preNode.props.children).replace(/\n$/, "")

  const lineCount = code.split("\n").length

  const highlightedPre = React.cloneElement(preNode, {
    "data-slot": "mdx-code-pre",
    className: cn(
      "m-0 overflow-x-auto bg-transparent py-4",
      "font-mono text-sm leading-6",
      preNode.props.className
    ),
  })

  return (
    <figure
      data-rehype-pretty-code-figure=""
      data-slot="mdx-code-block"
      className={cn("overflow-hidden rounded-lg border bg-card shadow-xs", className)}
      {...props}
    >
      <CodeBlockContent title={title} languageName={languageName} code={code} lineCount={lineCount}>
        {highlightedPre}
      </CodeBlockContent>

      {captionNode && (
        <figcaption
          data-slot="mdx-code-caption"
          className={cn("border-t bg-muted/20 px-4 py-2", "text-sm text-muted-foreground")}
        >
          {captionNode.props.children}
        </figcaption>
      )}
    </figure>
  )
}

export function MdxCode({ className, ...props }: React.ComponentPropsWithoutRef<"code">) {
  return <code data-slot="mdx-code" className={cn("font-mono", className)} {...props} />
}
