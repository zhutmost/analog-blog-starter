import { FlatCompat } from '@eslint/eslintrc'
import eslintJs from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintTs from 'typescript-eslint'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

export default eslintTs.config(
  eslintJs.configs.recommended,
  ...eslintTs.configs.strictTypeChecked,
  ...eslintTs.configs.stylisticTypeChecked,
  ...compat.extends('plugin:@next/next/core-web-vitals'),
  eslintConfigPrettier,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowAny: true,
          allowBoolean: true,
          allowNullish: true,
          allowNumber: true,
          allowRegExp: true,
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrors: 'none',
        },
      ],
      '@typescript-eslint/no-unnecessary-condition': [
        'error',
        { allowConstantLoopConditions: true, checkTypePredicates: true },
      ],
    },
  },
  {
    ignores: ['**/dist/', '**/node_modules/', '**/*.config.mjs', '**/.content-collections/'],
  }
)
