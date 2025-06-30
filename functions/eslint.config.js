// eslint.config.js
import { defineConfig } from "eslint/config";
import globals from "globals";
import eslintPluginImport from "eslint-plugin-import";
import js from "@eslint/js";

export default defineConfig([
  eslintPluginImport.flatConfigs.recommended,
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
      },
    },
    rules: {
      // Custom rules
      "no-restricted-globals": ["error", "name", "length"],
      "prefer-arrow-callback": "error",
      "quotes": ["error", "double", { "allowTemplateLiterals": true }],
      "import/extensions": "off",
      "import/no-unresolved": "error",

      // Google style guide rules (key ones)
      "indent": ["error", 2],
      "linebreak-style": ["error", "unix"],
      "semi": ["error", "always"],
      "comma-dangle": ["error", "always-multiline"],
      "max-len": ["error", { "code": 80 }],
      "camelcase": "error",
      "new-cap": "error",
      "no-var": "error",
      "prefer-const": "error",
    },
  }]);