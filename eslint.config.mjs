import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import react from 'eslint-plugin-react'
import importPlugin from 'eslint-plugin-import'
import perfectionist from 'eslint-plugin-perfectionist'
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

export default defineConfig([
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'coverage/**',
    '.vercel/**',
    'commitlint.config.js',
    'next-env.d.ts',
  ]),
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {
      react,
      '@typescript-eslint': tseslint.plugin,
      import: importPlugin,
      perfectionist,
    },
    settings: {
      react: {
        version: 'detect',
      },
      next: {
        rootDir: '.',
      },
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      ...nextVitals,
      ...nextTs,
      eslintConfigPrettier,
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    rules: {
      // Perfectionist - import sorting
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'natural',
          order: 'asc',
          newlinesBetween: 0,
        },
      ],
      'perfectionist/sort-union-types': [
        'error',
        {
          type: 'natural',
          order: 'asc',
          newlinesBetween: 0,
        },
      ],
      'perfectionist/sort-enums': [
        'error',
        {
          type: 'natural',
          order: 'asc',
          newlinesBetween: 0,
        },
      ],
      // Import rules
      'import/extensions': [
        'error',
        { css: 'always', json: 'always', scss: 'always', svg: 'always' },
      ],
      'import/no-duplicates': 'off',
      'import/order': 'off',
      'import/prefer-default-export': 'off',

      'no-unused-vars': 'off',
      'import/no-dynamic-require': 'warn',
      'import/no-nodejs-modules': 'warn',

      // React rules
      'react/button-has-type': 'error',
      'react/display-name': 'off',
      'react/jsx-boolean-value': ['error'],
      'react/jsx-curly-brace-presence': [
        'error',
        { children: 'ignore', propElementValues: 'always', props: 'always' },
      ],
      'react/void-dom-elements-no-children': ['error'],

      // Next rules
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'warn',
      '@next/next/no-sync-scripts': 'error',
    },
  },
])
