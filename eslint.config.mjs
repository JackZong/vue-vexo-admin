import eslint from '@eslint/js';
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginSimpleImportSort from "eslint-plugin-simple-import-sort"
import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';

import autoImportConfig from "./.eslintrc-auto-import.json" with { type: 'json' };

export default defineConfig([
  {
    ignores: [
      '*.d.ts',
      '**/coverage',
      '**/dist',
      '.vitepress',
      'src/components/flt/**', // flt的不检查，即使有问题应该到组件库去修改，再同步过来
    ],
  },
  { 
    files: ["**/*.{ts,vue}"], 
    languageOptions: {
      // 导入变量
      globals: {
        ...autoImportConfig.globals, // 自动导入的全局变量
      }, 
    }, 
  },
  {
    extends: [
      eslint.configs.recommended,
      ...typescriptEslint.configs.recommended,
      ...eslintPluginVue.configs['flat/recommended'],
    ],
    files: ['**/*.{ts,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        parser: typescriptEslint.parser,
      },
    },
    rules: {
      // your rules
      // 'vue/multi-word-component-names': [
      //   'error',
      //   {
      //     ignores: ['Index', 'demo', 'create', 'edit', 'Main', '403', '404'], // 忽略特殊页面不采用大小写命名
      //   },
      // ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'vue/html-self-closing': 'off',
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'no-undef': 'off',
      'vue/prefer-import-from-vue': 'off',
      'no-prototype-builtins': 'off',
      'prefer-spread': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
      '@typescript-eslint/no-explicit-any': 'off', // 总要使用any
    },
  },
  {
    plugins: {
        // key "simple-import-sort" is the plugin namespace
        "simple-import-sort": pluginSimpleImportSort
    },
    rules: {
        "simple-import-sort/imports": [
            "error"
        ]
    }
  },
  eslintConfigPrettier,
]);
