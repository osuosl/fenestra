'use strict';

module.exports = {
  extends: [
    './eslint-rules/best-practice.js',
    './eslint-rules/errors.js',
    './eslint-rules/es6.js',
    './eslint-rules/style.js',
    './eslint-rules/variables.js',
  ],
  parserOptions: {
    ecmaVersion: 6,
  },
  env: {
    browser: true,
    jquery: true,
  },
  rules: {
    strict: ['error', 'global'],
  }
};
