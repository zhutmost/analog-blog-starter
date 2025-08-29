/* Generate by @shikijs/codegen */
import type {
  DynamicImportLanguageRegistration,
  DynamicImportThemeRegistration,
  HighlighterGeneric,
} from '@shikijs/types'
import {
  createSingletonShorthands,
  createdBundledHighlighter,
} from '@shikijs/core'
import { createOnigurumaEngine } from '@shikijs/engine-oniguruma'

type BundledLanguage =
  | 'c'
  | 'cpp'
  | 'c++'
  | 'java'
  | 'javascript'
  | 'js'
  | 'json'
  | 'make'
  | 'makefile'
  | 'markdown'
  | 'md'
  | 'python'
  | 'py'
  | 'scala'
  | 'shellscript'
  | 'bash'
  | 'sh'
  | 'shell'
  | 'zsh'
  | 'system-verilog'
  | 'tcl'
  | 'typescript'
  | 'ts'
  | 'verilog'
  | 'xml'
  | 'yaml'
  | 'yml'
type BundledTheme = 'one-dark-pro'
type Highlighter = HighlighterGeneric<BundledLanguage, BundledTheme>

const bundledLanguages = {
  c: () => import('@shikijs/langs/c'),
  cpp: () => import('@shikijs/langs/cpp'),
  'c++': () => import('@shikijs/langs/cpp'),
  java: () => import('@shikijs/langs/java'),
  javascript: () => import('@shikijs/langs/javascript'),
  js: () => import('@shikijs/langs/javascript'),
  json: () => import('@shikijs/langs/json'),
  make: () => import('@shikijs/langs/make'),
  makefile: () => import('@shikijs/langs/make'),
  markdown: () => import('@shikijs/langs/markdown'),
  md: () => import('@shikijs/langs/markdown'),
  python: () => import('@shikijs/langs/python'),
  py: () => import('@shikijs/langs/python'),
  scala: () => import('@shikijs/langs/scala'),
  shellscript: () => import('@shikijs/langs/shellscript'),
  bash: () => import('@shikijs/langs/shellscript'),
  sh: () => import('@shikijs/langs/shellscript'),
  shell: () => import('@shikijs/langs/shellscript'),
  zsh: () => import('@shikijs/langs/shellscript'),
  'system-verilog': () => import('@shikijs/langs/system-verilog'),
  tcl: () => import('@shikijs/langs/tcl'),
  typescript: () => import('@shikijs/langs/typescript'),
  ts: () => import('@shikijs/langs/typescript'),
  verilog: () => import('@shikijs/langs/verilog'),
  xml: () => import('@shikijs/langs/xml'),
  yaml: () => import('@shikijs/langs/yaml'),
  yml: () => import('@shikijs/langs/yaml'),
} as Record<BundledLanguage, DynamicImportLanguageRegistration>

const bundledThemes = {
  'one-dark-pro': () => import('@shikijs/themes/one-dark-pro'),
} as Record<BundledTheme, DynamicImportThemeRegistration>

const createHighlighter = /* @__PURE__ */ createdBundledHighlighter<
  BundledLanguage,
  BundledTheme
>({
  langs: bundledLanguages,
  themes: bundledThemes,
  engine: () => createOnigurumaEngine(import('shiki/wasm')),
})

const {
  codeToHtml,
  codeToHast,
  codeToTokensBase,
  codeToTokens,
  codeToTokensWithThemes,
  getSingletonHighlighter,
  getLastGrammarState,
} = /* @__PURE__ */ createSingletonShorthands<BundledLanguage, BundledTheme>(
  createHighlighter,
)

export {
  bundledLanguages,
  bundledThemes,
  codeToHast,
  codeToHtml,
  codeToTokens,
  codeToTokensBase,
  codeToTokensWithThemes,
  createHighlighter,
  getLastGrammarState,
  getSingletonHighlighter,
}
export type { BundledLanguage, BundledTheme, Highlighter }
