module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint",
    "example", // my custom plugin
  ],
  rules: {
    "no-alert": 1,
    "example/timeout-duration-bounds": [1, { min: 100, max: 1000 }],
  },
};
