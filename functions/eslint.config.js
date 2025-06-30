// eslint.config.js
import { defineConfig } from "@eslint/config-helpers";
import globals from "globals";
import pluginImport from "eslint-plugin-import";

export default defineConfig({
  files: ["**/*.js"], // Specify files to apply this config to
  languageOptions: {
    globals: { ...globals.node, ...globals.es2021 }, // Combine node and es2021 environments
    parserOptions: { sourceType: "module", ecmaVersion: 2018 },
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  plugins: {pluginImport},
  rules: {
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    "quotes": ["error", "double", { "allowTemplateLiterals": true }],
    "import/extensions": "off",
    "import/no-unresolved": "error",
  },
});