/**
 * @see https://prettier.io/docs/en/configuration
 */
export default {
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
  printWidth: 100,
  bracketSpacing: true,
  arrowParens: "always",
  endOfLine: "lf",

  plugins: ["prettier-plugin-tailwindcss"],

  tailwindFunctions: ["cn", "clsx", "twMerge"],

  overrides: [
    {
      files: "*.md",
      options: { proseWrap: "always" },
    },
    {
      files: "*.json",
      options: { printWidth: 80 },
    },
  ],
};
