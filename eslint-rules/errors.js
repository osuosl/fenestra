/* global module */
'use strict';

module.exports = {
  rules: {
    /*
     * Rules to prevent confusing syntax which may easily lead to syntax or
     * logic errors within code. These probably shouldn't be changed, but
     * you do what you want.
     */

    // Disallow conditionals with assignments without parentheses to mark them
    'no-cond-assign': ['error', 'except-parens'],

    // Warn about use of `console` (probably leftover from dev)
    'no-console': 'warn',

    // Warn on constant conditions (like `if (false)`, probably a dev artifact)
    'no-constant-condition': 'warn',

    // Disallow control characters in regexes (they're probably accidental)
    'no-control-regex': 'error',

    // Disallow use of `debugger`
    'no-debugger': 'error',

    // Disallow duplicate function argument names
    'no-dupe-args': 'error',

    // Disallow duplicate keys inside objects
    'no-dupe-keys': 'error',

    // Disallow duplicate switch cases
    'no-duplicate-case': 'error',

    // Disallow empty blocks
    'no-empty': 'error',

    // Disallow empty regex char classes (did you mean to escape your bracket?)
    'no-empty-character-class': 'error',

    // Disallow reassigning exceptions in `catch` clauses
    'no-ex-assign': 'error',

    // Allow double-negation boolean casts inside boolean context
    'no-extra-boolean-cast': 'off',

    // Warn about parentheses which do nothing, except in nested expressions
    // (e.g. nesting 'or' and 'and' operators where precedence can be confusing)
    'no-extra-parens': ['warn', 'all', {
      nestedBinaryExpressions: false,
    }],

    // Disallow multiple semicolons, etc.
    'no-extra-semi': 'error',

    // Disallow reassigning function declarations
    'no-func-assign': 'error',

    // Disallow function declarations outside top-level
    // (ES5 and lower technically doesn't even allow declarations inside blocks
    // but some parsers allow it, so just throw an error in case)
    'no-inner-declarations': 'error',

    // Disallow regex constructors with invalid regexes
    'no-invalid-regexp': 'error',

    // Disallow strange whitespacce outside of strings and comments
    'no-irregular-whitespace': 'error',

    // Disallow negating left side of `in` (use parens to negate the expression)
    'no-negated-in-lhs': 'error',

    // Disallow calling Math and JSON as functions
    'no-obj-calls': 'error',

    // Disallow multiple consecutive spaces in regexes (use `{n}`)
    'no-regex-spaces': 'error',

    // Disallow sparse arrays (e.g. `x = [1, , , 2, , , , 3, , 4]`)
    'no-sparse-arrays': 'error',

    // Disallow multiline statements that might look like two statements
    'no-unexpected-multiline': 'error',

    // Disallow unreachable code
    'no-unreachable': 'error',

    // Disallow return, break, etc. inside of finally statements
    'no-unsafe-finally': 'error',

    // Require isNaN() (because ` == NaN` will always return false!)
    'use-isnan': 'error',

    // If JSDoc comments are used, require them to be valid
    'valid-jsdoc': 'error',

    // Disallow comparing typeof to nonexistent types
    'valid-typeof': 'error',
  },
};
