import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { FlatCompat } from '@eslint/eslintrc';
import eslintConfigPrettier from 'eslint-config-prettier';

const compat = new FlatCompat();

export default tseslint.config(
  ...compat.extends('airbnb'),
  {
    rules: {
      'react/jsx-filename-extension': 'off', // using tsx
      'react/react-in-jsx-scope': 'off', // we don't need it in new vers of React
      'react/require-default-props': 'off', // using default parameters + ts instead (also it's deprecated)
      'react/prop-types': 'off', // using ts instead
      'react/jsx-props-no-spreading': 'off',
      'import/prefer-default-export': 'off',
      'no-param-reassign': 'off',
      'jsx-a11y/heading-has-content': 'off',
    },
  },
  { ignores: ['dist', '**config.**'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      eslintConfigPrettier,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
    settings: {
      'import/resolver': {
        alias: {
          map: [
            ['@', './src'],
            ['@shared', './src/components/shared'],
            ['@store', './src/store'],
          ],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        node: {
          paths: ['src'],
          extensions: ['.ts', '.tsx'],
        },
      },
    },
  },
);
