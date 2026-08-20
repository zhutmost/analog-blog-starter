import { parse as parseEmoji } from "@twemoji/parser"
import { type Element, type Root, type Text } from "hast"
import { CONTINUE, visit } from "unist-util-visit"

export type RehypeTwemojiSize = "default" | "lg" | "2x" | "3x" | "4x" | "5x"

export interface RehypeTwemojiOptions {
  /**
   * Base URL of the Twemoji repository or CDN.
   *
   * The default uses jdecked/twemoji because it is the actively maintained Twemoji fork and
   * provides current Unicode/Emoji support.
   */
  source?: string

  /** Image format to use. */
  format?: "svg" | "png"

  /** CSS size variant. This maps to `twemoji-${size}`. */
  size?: RehypeTwemojiSize

  /** Additional class name applied to each generated emoji image. */
  className?: string

  /**
   * Emoji characters that should not be converted.
   *
   * This is useful for symbols such as ©, ®, ™, ↩, etc., where replacing them with image emoji may
   * be visually surprising in technical writing.
   */
  ignore?: readonly string[]

  /** Whether generated emoji images should be draggable. */
  draggable?: boolean

  /**
   * Treat emojis as decorative images.
   *
   * Keep this false for normal prose, headings, and list content.
   */
  decorative?: boolean
}

const skippedTagNames = new Set(["code", "pre", "kbd", "samp", "script", "style", "textarea"])

function shouldSkip(node: Root | Element): boolean {
  return node.type === "element" && skippedTagNames.has(node.tagName)
}

export function rehypeTwemoji(options: RehypeTwemojiOptions = {}) {
  const {
    source = "https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest",
    format = "svg",
    size = "default",
    className,
    ignore = ["©", "®", "™", "℗", "↩"],
    draggable = false,
    decorative = false,
  } = options

  const ignored = new Set(ignore)
  const extension = format === "svg" ? "svg" : "png"
  const normalizedSource = source.replace(/\/$/, "")

  return function transformer(tree: Root) {
    visit(tree, "text", (node: Text, index, parent) => {
      if (typeof index !== "number" || !parent || !("children" in parent) || shouldSkip(parent)) {
        return CONTINUE
      }

      const entities = parseEmoji(node.value).filter((entity) => !ignored.has(entity.text))

      if (entities.length === 0) {
        return CONTINUE
      }

      const children = parent.children
      const replacement = splitTextNode(node.value, entities, {
        source: normalizedSource,
        extension,
        size,
        className,
        draggable,
        decorative,
      })

      children.splice(index, 1, ...replacement)

      return index + replacement.length
    })
  }
}

interface TwemojiEntity {
  url: string
  indices: readonly [number, number]
  text: string
}

interface SplitTextNodeOptions {
  source: string
  extension: "svg" | "png"
  size: RehypeTwemojiSize
  className?: string
  draggable: boolean
  decorative: boolean
}

function splitTextNode(text: string, entities: TwemojiEntity[], options: SplitTextNodeOptions) {
  const nodes: Array<Text | Element> = []
  let lastIndex = 0

  for (const entity of entities) {
    const [start, end] = entity.indices

    if (start > lastIndex) {
      nodes.push({
        type: "text",
        value: text.slice(lastIndex, start),
      })
    }

    nodes.push(createTwemojiElement(entity, options))

    lastIndex = end
  }

  if (lastIndex < text.length) {
    nodes.push({
      type: "text",
      value: text.slice(lastIndex),
    })
  }

  return nodes
}

function createTwemojiElement(entity: TwemojiEntity, options: SplitTextNodeOptions): Element {
  const codepoint = getCodepointFromEntity(entity)
  const className = ["twemoji", `twemoji-${options.size}`, options.className].filter(
    (value): value is string => Boolean(value)
  )

  return {
    type: "element",
    tagName: "img",
    properties: {
      src: `${options.source}/assets/${options.extension}/${codepoint}.${options.extension}`,
      alt: options.decorative ? "" : entity.text,
      ariaHidden: options.decorative ? "true" : undefined,
      className,
      dataTwemoji: "",
      draggable: options.draggable ? "true" : "false",
    },
    children: [],
  }
}

function getCodepointFromEntity(entity: TwemojiEntity) {
  const filename = entity.url.split("/").at(-1)

  if (!filename) {
    return entity.text.codePointAt(0)?.toString(16).toLowerCase()
  }

  return filename.replace(/\.(svg|png)$/i, "")
}
