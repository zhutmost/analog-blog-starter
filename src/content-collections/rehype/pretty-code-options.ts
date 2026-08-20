import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
  transformerRemoveNotationEscape,
} from "@shikijs/transformers"

export const prettyCodeOptions = {
  theme: {
    dark: "one-dark-pro",
    light: "one-light",
  },

  keepBackground: false,

  defaultLang: {
    block: "plaintext",
    inline: "plaintext",
  },

  transformers: [
    transformerNotationDiff(),
    transformerNotationHighlight(),
    transformerNotationWordHighlight(),
    transformerRemoveNotationEscape(),
  ],
}
