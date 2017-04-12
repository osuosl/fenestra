/* globals module */
'use strict';

module.exports = {
  rules: {
    /*
     * Rules regarding stylistic choices and readability. These are highly
     * subjective, and while they do conform to our style guide, you may choose
     * to change these as you see fit to match your style. This is also why
     * almost all rules cause warnings instead of errors.
     */

    // Disallow spaces inside array brackets
    'array-bracket-spacing': ['warn', 'never'],

    // Single-line blocks aren't allowed anyway, but require spaces anyway
    'block-spacing': ['warn', 'always'],

    // Enforce "one true brace style"
    'brace-style': ['warn', '1tbs'],

    // Require camelCase over snake_case, except in properties and all-caps
    camelcase: 'warn',

    // Require trailing commas on objects and arrays that span multiple lines
    'comma-dangle': ['warn', 'always-multiline'],

    // Require space after but not before commas
    'comma-spacing': ['warn', {before: false, after: true}],

    // Require commas to be before, not after, a newline
    'comma-style': ['warn', 'last'],

    // When trapping 'this' before a function, always call it 'self'
    'consistent-this': ['warn', 'self'],

    // Require a blank line at the end of a file
    'eol-last': ['error', 'unix'],

    // Prefer named functions
    'func-names': ['warn', 'always'],

    // Prefer function expressions over declarations
    'func-style': ['warn', 'expression'],

    // Don't prevent certain identifiers
    'id-blacklist': 'off',

    // Don't put explicit requirements on identifier length
    'id-length': 'off',

    // Don't put explicit requirements on identifier name format
    'id-match': 'off',

    // Require two-space indentation
    // This is probably the one you'll want to change
    // Everyone has their own opinions on indentation
    // Just don't complain to us about our choice, please
    // Be civil. Save your anger for emacs users.
    indent: ['error', 2],

    // Require a single space after a colon and none before in an object
    'key-spacing': ['warn', {
      beforeColon: false,
      afterColon: true,
      mode: 'strict',
    }],

    // Require space around keywords
    'keyword-spacing': ['warn', {before: true, after: true}],

    // Require Unix-style line endings
    'linebreak-style': ['error', 'unix'],

    // Don't require spaces around comments (although they're often preferred)
    'lines-around-comment': 'off',

    // Don't allow more than 8 nested if/else/for/while/try/catch blocks
    'max-depth': ['warn', 8],

    // We require line lengths of 80, but your mileage may vary
    'max-len': ['error', 80, 2, {ignoreUrls: true}],

    // Don't require files to be a certain length
    'max-lines': 'off',

    // Don't limit callback nesting (because Node almost requires craziness)
    'max-nested-callbacks': 'off',

    // Don't require a max number of function parameters (use common sense here)
    'max-params': 'off',

    // Don't limit the number of statements per function
    'max-statements': 'off',

    // Enforce one statement per line
    'max-statements-per-line': ['warn', {max: 1}],

    // Require constructors to be capitalized
    'new-cap': 'warn',

    // Always require parens, even on constructors without params
    'new-parens': 'error',

    // Don't require newlines after variable declarations
    'newline-after-var': 'off',

    // Require a newline before return statements
    'newline-before-return': 'warn',

    // Don't require a newline between chained method calls
    'newline-per-chained-call': 'off',

    // Disallow Array constructors
    'no-array-constructor': 'error',

    // Disallow bitwise operators, which are probably just mistyped
    'no-bitwise': 'warn',

    // Allow continue statements
    'no-continue': 'off',

    // Allow comments on the same line as code
    'no-inline-comments': 'off',

    // Disallow if statements alone inside else clauses (use `else if`)
    'no-lonely-if': 'warn',

    // Disallow mixing spaces and tabs for indentation (Ew. You monster.)
    'no-mixed-spaces-and-tabs': 'error',

    // Disallow more than 2 empty lines in a row
    'no-multiple-empty-lines': ['warn', {max: 2}],

    // Allow negated conditionals
    'no-negated-condition': 'off',

    // Disallow nested ternary operators
    'no-nested-ternary': 'warn',

    // Disallow calling `new Object()`
    'no-new-object': 'error',

    // Allow unary increment/decrement operators
    'no-plusplus': 'off',

    // Don't disallow certain syntax types
    'no-restricted-syntax': 'off',

    // Disallow spacing between functions and their parentheses
    'no-spaced-func': 'warn',

    // Allow ternary operators
    'no-ternary': 'off',

    // Disallow trailing whitespace
    'no-trailing-spaces': 'warn',

    // Disallow leading or trailing underscores
    'no-underscore-dangle': 'warn',

    // Warn about ternary operators where simpler options exist
    'no-unneeded-ternary': ['warn', {defaultAssignment: false}],

    // Disallow whitespace within object notation
    'no-whitespace-before-property': 'warn',

    // Disallow spaces within curly braces
    'object-curly-spacing': ['warn', 'never'],

    // Don't always require objects to span multiple lines
    'object-property-newline': 'off',

    // Require one variable per `var`, `let`, or `const` statement
    'one-var': 0,

    // Require newlines around variable declarations
    'one-var-declaration-per-line': ['warn', 'always'],

    // Require shorthand assignment operators where available
    'operator-assignment': ['warn', 'always'],

    // Require linebreaks to come after operators, not before
    'operator-linebreak': ['warn', 'after'],

    // Disallow padded blocks
    'padded-blocks': ['warn', 'never'],

    // Require quotes around object property names which need them
    'quote-props': ['warn', 'as-needed'],

    // Double quotes are like, twice as much quote as you need
    quotes: ['warn', 'single', {avoidEscape: true, allowTemplateLiterals: true}],

    // Don't require JSDoc comments
    'require-jsdoc': 'off',

    // Always require semicolons. I feel very adamant about this.
    semi: ['error', 'always'],

    // Require space/newline after semicolons but not before
    'semi-spacing': ['warn', {before: false, after: true}],

    // Don't require variables to be declared sorted
    'sort-vars': 'off',

    // Require a space before blocks
    'space-before-blocks': 'warn',

    // Disallow a space before a function declaration's parens
    'space-before-function-paren': ['warn', 'never'],

    // Disallow a space within parens
    'space-in-parens': ['warn', 'never'],

    // Require a space around infix operators
    'space-infix-ops': 'warn',

    // Require spaces around "word" unary operators and none around "nonword"s
    'space-unary-ops': ['warn', {
      words: true,
      nonwords: false,
    }],

    // Require a space before a comment
    'spaced-comment': ['warn', 'always'],

    // Make no requirements on Byte-Order Marks
    'unicode-bom': 'off',

    // Require parentheses around regex literals
    'wrap-regex': 'warn',
  },
};
