import js from "@eslint/js";
import globals from "globals";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig } from "eslint/config";

export default defineConfig([
  js.configs.recommended,

  {
    ignores: ["dist/**", "public/**"],
  },

  {
    files: ["src/**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      prettier: prettierPlugin,
      import: importPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs["recommended"].rules,
      ...reactRefresh.configs.vite.rules,
      "prettier/prettier": "error",
      "import/order": ["warn", { alphabetize: { order: "asc" } }],
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },

  prettierConfig,
]);
