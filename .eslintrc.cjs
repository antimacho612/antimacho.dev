/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
  ],
  rules: {
    'vue/require-default-prop': 'off',
    'vue/multi-word-component-names': 'off',
  },
};
