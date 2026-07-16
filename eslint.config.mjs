// @ts-check
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import importXPlugin from "eslint-plugin-import-x";
import nextPlugin from "@next/eslint-plugin-next";
import globals from "globals";

export default tseslint.config(
  // ─── 1. Global ignores ─────────────────────────────────────────────────
  {
    ignores: [".next/**", "dist/**", "node_modules/**", "next-env.d.ts", "public/**"],
  },

  // ─── 2. Language options ──────────────────────────────────────────────
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2022,
        ...globals.node,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // ─── 3. ESLint recommended + TypeScript (strict, type-aware) ──────────
  // ESLint core recommended rules (eqeqeq, no-undef, etc.)
  // TypeScript recommended rules with type-checking (no-floating-promises,
  // no-unsafe-argument, no-unsafe-assignment, await-thenable, etc.)
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  // ─── 4. React + React Hooks (JSX/TSX only) ──────────────────────────
  {
    files: ["**/*.{jsx,tsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      ...reactPlugin.configs.flat.recommended.rules,
      ...reactPlugin.configs.flat["jsx-runtime"].rules,
      ...reactHooksPlugin.configs.flat.recommended.rules,
      "react-hooks/exhaustive-deps": "warn",
      "react/no-array-index-key": "warn",
      "react/self-closing-comp": "warn",
      "react/jsx-no-target-blank": "error",
    },
    settings: {
      react: {
        version: "19.0",
      },
    },
  },

  // ─── 5. Next.js (all files) ───────────────────────────────────────────
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
    },
  },

  // ─── 6. Import plugin (all files) ─────────────────────────────────────
  {
    plugins: {
      import: importXPlugin,
    },
    rules: {
      "import/no-duplicates": "error",
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
    settings: {
      "import-x/resolver": {
        node: true,
      },
    },
  },

  // ─── 7. Project-specific rules (overrides all above) ──────────────────
  // These rules enforce the Garcia Platform code standards.
  {
    rules: {
      // ── General ──────────────────────────────────────────────────────
      "no-console": ["warn", { allow: ["warn", "error"] }],
      eqeqeq: "error",
      curly: "error",

      // ── TypeScript (strict additions beyond recommendedTypeChecked) ──
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/strict-boolean-expressions": "error",
      "@typescript-eslint/consistent-type-imports": ["error", { fixStyle: "inline-type-imports" }],

      // ── Naming conventions ──────────────────────────────────────────
      "@typescript-eslint/naming-convention": [
        "warn",
        { selector: "default", format: ["camelCase", "PascalCase"], leadingUnderscore: "allow" },
        {
          selector: "variable",
          format: ["camelCase", "UPPER_CASE", "PascalCase"],
          leadingUnderscore: "allow",
        },
        { selector: "typeLike", format: ["PascalCase"] },
        { selector: "enum", format: ["PascalCase", "UPPER_CASE"] },
        { selector: "function", format: ["camelCase", "PascalCase"] },
      ],
    },
  },
);
