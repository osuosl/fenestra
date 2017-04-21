/* global module */
'use strict';

module.exports = {
  rules: {
    /*
     * Rules which are specific to ECMAScript 6 compatible code. Because these
     * fit across the other categories, you may want to feel free to change
     * some of these in your own configs, but make sure you know what they are
     * first.
     */

    // Require braces around all lambda functions
    'arrow-body-style': ['error', 'always'],

    // Only require parentheses when using multiple lambda arguments
    'arrow-parens': ['error', 'as-needed'],

    // Require spacing around lambda arrows
    'arrow-spacing': ['error', {before: true, after: true}],

    // Always require a call to super() in constructors that extend from another
    'constructor-super': 'error',

    // Require the generator star to be pinned to `function`
    'generator-star-spacing': ['error', 'after'],

    // Disallow redefinining variables that point to classes
    'no-class-assign': 'error',

    // Warn about arrow functions that may be confusing
    'no-confusing-arrow': 'warn',

    // Disallow redefining constants (I mean...duh?)
    'no-const-assign': 'error',

    // Disallow multiple class members with the same name
    'no-dupe-class-members': 'error',

    // Disallow importing the same module multiple times
    'no-duplicate-imports': 'error',

    // Disallow `new Symbol()`
    'no-new-symbol': 'error',

    // Don't restrict individual modules
    'no-restricted-imports': 'off',

    // Require super() to come first in constructors
    'no-this-before-super': 'error',

    // Disallow computed keys that don't need to be computed
    'no-useless-computed-key': 'error',

    // Disallow unnecessary constructors, such as empty ones
    'no-useless-constructor': 'error',

    // Disallow importing or exporting on an existing name
    'no-useless-rename': 'error',

    // Require `let` or `const` over var
    'no-var': 'error',

    // Prefer shorthand object syntax
    'object-shorthand': ['warn', 'always'],

    // Prefer to use lambdas for callbacks instead of functions
    'prefer-arrow-callback': 'warn',

    // If a variable is never reassigned, prefer const over let
    'prefer-const': 'warn',

    // Prefer to call Reflect over the old ways
    'prefer-reflect': 'warn',

    // Prefer parameter expansion over using the `arguments` variable
    'prefer-rest-params': 'error',

    // Prefer spread operator over using apply()
    'prefer-spread': 'error',

    // Prefer template literals over string concatenation
    'prefer-template': 'error',

    // Disallow generator functions that don't yield
    'require-yield': 'error',

    // No spacing around rest/spread operators
    'rest-spread-spacing': ['error', 'never'],

    // Don't require imports to be sorted alphabetically
    'sort-imports': 'off',

    // No spacing within template curly braces
    'template-curly-spacing': ['error', 'never'],

    // Require the yield star to be pinned to `yield`
    'yield-star-spacing': ['error', 'after'],
  },
};
