module.exports = {
  env: {
    browser: true,
    webextensions: true,
    es6: true,
    "jest/globals": true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended", "plugin:jest/recommended"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["prettier", "jest"],
  rules: { "prettier/prettier": "error" },
};
