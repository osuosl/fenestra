/* global module */
'use strict';

module.exports = {
  rules: {
    /*
     * Rules relating to variable declarations and using variables. These
     * generally shouldn't be changed, but it's your choice.
     */

    // Allow `var` to declare but not initialize a variable
    'init-declarations': 'off',

    // Allow catch parameters to shadow scope variables
    'no-catch-shadow': 'off',

    // Disallow deleting variables (undefined behavior)
    'no-delete-var': 'error',

    // Disallow labels that have the same name as a variable or function
    'no-label-var': 'error',

    // Don't restrict any globals from being used
    'no-restricted-globals': 'off',

    // Disallow shadowing variables
    'no-shadow': 'error',

    // Disallow variables with the same name as keywords
    'no-shadow-restricted-names': 'error',

    // Disallow using variables which have not been declared
    'no-undef': 'error',

    // Allow variables to be initialized as undefined
    'no-undef-init': 'off',

    // Disallow using undefined as a variable (illegal in ES5 anyway!)
    'no-undefined': 'error',

    // Warn about variables that never get used
    'no-unused-vars': 'warn',

    // Disallow using variables before they're defined
    'no-use-before-define': 'error',
  },
};
