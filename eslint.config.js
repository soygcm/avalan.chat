import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "@eslint/config-helpers";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    plugins: {
      js,
    },
    languageOptions: {
      globals: globals.browser
    },
    rules: {
      ...js.configs.recommended.rules,
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          js: "always",
          ts: "never"
        }
      ],
      "import/no-unresolved": "off"
    }
  },
  // @ts-expect-error Type 'Config' is not assignable to type 'InfiniteArray<ConfigWithExtends>'.
  ...tseslint.configs.recommended
]);
