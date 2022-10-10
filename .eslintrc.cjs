/** @type {import("@types/eslint").Linter.BaseConfig} */
module.exports = {
  extends: "next/core-web-vitals",
  plugins: ["simple-import-sort"],
  rules: {
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",
  },
};
