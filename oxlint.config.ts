import { defineConfig } from "oxlint"

export default defineConfig({
  plugins: [
    "eslint",
    "unicorn",
    "typescript",
    "oxc",

    "react",
    "import",
    "jsx-a11y",
    "nextjs",
    "promise",
    "node",
  ],
  options: {
    reportUnusedDisableDirectives: "warn",
    respectEslintDisableDirectives: false,
    typeCheck: true,
    typeAware: true,
  },
  categories: {
    correctness: "error",
    suspicious: "warn",
    perf: "warn",

    style: "off",
    pedantic: "off",
    restriction: "off",
    nursery: "off",
  },
  env: {
    browser: true,
    node: true,
    builtin: true,
  },
  settings: {
    next: {
      rootDir: ".",
    },
    react: {
      version: "19.0.0",
      linkComponents: ["Link"],
    },
    "jsx-a11y": {
      components: {
        Link: "a",
        Button: "button",
      },
    },
  },
  rules: {
    "react/react-in-jsx-scope": "off",

    "no-console": "warn",
    "typescript/no-explicit-any": "warn",
    "no-var": "error",

    eqeqeq: ["error", "smart"],
    "prefer-const": ["warn", { destructuring: "all" }],

    "import/no-unassigned-import": [
      "warn",
      {
        allow: ["**/*.css", "server-only"],
      },
    ],

    curly: "error",
    "object-shorthand": "warn",
    "prefer-template": "warn",
    "prefer-object-has-own": "warn",

    "sort-imports": [
      "error",
      {
        ignoreMemberSort: false,
        ignoreCase: true,
        // inter-line sorting is determined by oxfmt
        ignoreDeclarationSort: true,
      },
    ],

    "typescript/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "import/consistent-type-specifier-style": ["error", "prefer-inline"],

    "react/jsx-boolean-value": ["warn", "never"],
    "react/self-closing-comp": "warn",

    // `_meta` is the default key for file info in content-collection.
    "no-underscore-dangle": ["error", { allow: ["_meta"] }],
  },
})
