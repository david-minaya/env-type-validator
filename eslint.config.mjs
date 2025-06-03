import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';
import jsdoc from 'eslint-plugin-jsdoc';


export default defineConfig([
  { 
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'], 
    plugins: { js }, 
    extends: ['js/recommended'] },
  { 
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'], 
    languageOptions: { globals: globals.node } 
  },
  tseslint.configs.recommended,
  jsdoc.configs['flat/recommended-typescript'],
  {
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      '@stylistic/indent': ['warn', 2],
      '@stylistic/quotes': ['warn', 'single'],
      '@stylistic/semi': ['warn', 'always'],
      '@stylistic/eol-last': ['warn', 'always'],
      '@stylistic/object-curly-spacing': ['warn', 'always'],
      '@stylistic/no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off'
    }
  },
  {
    files: ['**/*.ts'],
    plugins: {
      jsdoc,
    },
    rules: {
      'jsdoc/tag-lines': 'off',
      'jsdoc/require-jsdoc': 'off'
    }
  }
]);
