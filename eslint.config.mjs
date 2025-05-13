import { FlatCompat } from '@eslint/eslintrc'
import eslintJs from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import eslintTs from 'typescript-eslint'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

export default eslintTs.config(
  eslintJs.configs.recommended,
  eslintTs.configs.strictTypeChecked,
  eslintTs.configs.stylisticTypeChecked,
  eslintConfigPrettier,
  compat.extends('next/core-web-vitals'),
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrors: 'none',
        },
      ],
    },
  },
  {
    ignores: ['/node_modules/', '/.content-collections/', '/*.config.mjs'],
  }
)
