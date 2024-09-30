import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat();

export default tseslint.config(
  ...compat.extends('airbnb'),
  {
    rules: {
      'react/jsx-filename-extension': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/require-default-props': 'off',
      'react/prop-types': 'off',
      'import/no-unresolved': 'off',
      'react/jsx-props-no-spreading': 'off',
      'import/prefer-default-export': 'off'
    },
  },
  { ignores: ['dist', '**config.**'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
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
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
    settings: {
      'import/resolver': {
        node: {
          paths: ['src'],
          extensions: ['.ts', '.tsx'],
        },
      },
    },
  },
);
