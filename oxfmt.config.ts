import { defineConfig } from "oxfmt"

export default defineConfig({
  trailingComma: "es5",
  semi: false,

  sortImports: {
    customGroups: [
      {
        groupName: "react",
        elementNamePattern: ["react", "react-*"],
      },
      {
        groupName: "next",
        elementNamePattern: ["next", "next/**"],
      },
    ],
    groups: [
      ["react", "next"],
      "builtin",
      "external",
      ["internal", "subpath"],
      ["parent", "sibling", "index"],
      "style",
      "unknown",
    ],
  },

  sortTailwindcss: {
    functions: ["cn", "clsx", "cva", "twMerge"],
    stylesheet: "./src/app/globals.css",
  },

  jsdoc: true,
})
