module.exports = {
  env: { browser: true, es2020: true, jest: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:compat/recommended",
    "plugin:storybook/recommended",
    "plugin:jest/recommended",
  ],
  plugins: ["react-refresh", "prettier", "@typescript-eslint"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "import/no-unresolved": "off",
    "@typescript-eslint/no-var-requires": "off",
    "no-undef": "off",
    "compat/compat": "warn",
  },
};
