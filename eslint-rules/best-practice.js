/* global module */
'use strict';

module.exports = {
  rules: {
    /*
     * Generally agreed upon best practices, which improve overall readability
     * and idiomatic quality, and which should be fairly general to most
     * coders, but which can be changed as necessary
     */

    // We don't use accessors, so don't enforce them
    'accessor-pairs': 'off',

    // Require callbacks to return inside array mutators like .map()
    'array-callback-return': 'error',

    // Warn when `var` variables are used outside of their lexical scope
    'block-scoped-var': 'warn',

    // Don't enforce a cyclomatic complexity at this time
    complexity: 'off',

    // Always require curly braces on blocks
    curly: ['error', 'all'],

    // Require default case in switches
    'default-case': 'error',

    // Require dots to be on the same line as their object
    'dot-location': ['error', 'object'],

    // Require dot notation whenever possible
    'dot-notation': 'error',

    // Require triple-equals over the confusing and weird double-equals
    eqeqeq: ['error', 'allow-null'],

    // Iterating over JSON objects means ifs are usually unnecessary in for-in
    'guard-for-in': 'off',

    // alert, prompt, and confirm are considered outdated and too intrusive
    'no-alert': 'warn',

    // Disallow arguments.caller and arguments.callee, which are deprecated
    'no-caller': 'error',

    // Require braces on cases with lexical declarations
    'no-case-declarations': 'error',

    // Disallow unescaped division operators at the beginning of a regex
    'no-div-regex': 'error',

    // Disallow else after a return (just go to upper scope)
    'no-else-return': 'error',

    // Disallow empty functions
    'no-empty-function': ['error', {
      allow: [
        'arrowFunctions',
        'functions',
        'methods',
      ],
    }],

    // Allow comparisons to null and undefined
    'no-eq-null': 'off',

    // Always disallow eval(). Seriously. It's evil. Never use it.
    'no-eval': 'error',

    // Disallow modifying/extending native types, which breaks
    // cross-compatibility and prevents optimization
    'no-extend-native': 'error',

    // Disallow calls to .bind() which mean nothing
    'no-extra-bind': 'error',

    // Disallow labels which don't do anything
    'no-extra-label': 'error',

    // Warn about fallthrough on switch statements
    'no-fallthrough': 'warn',

    // Disallow leading or trailing decimals (which can be misinterpreted)
    'no-floating-decimal': 'error',

    // Allow shorthand type conversion
    'no-implicit-conversion': 'off',

    // Allow implicit globals (the rule is useful for browsers but not for node)
    'no-implicit-globals': 'off',

    // Disallow string arguments to setTimeout, etc, which call eval()
    'no-implied-eval': 'error',

    // Disallow `this` outside classes (which is likely `undefined`)
    'no-invalid-this': 'error',

    // Disallow `__iterator__` which is not cross-compatibile
    'no-iterator': 'error',

    // Warn about using labels in code (there are valid use cases, but are you
    // really going to argue you actually use them instead of just mistyping?)
    'no-labels': ['warn', {allowLoop: false, allowSwitch: false}],

    // Disallow blocks which serve no purpose
    'no-lone-blocks': 'error',

    // Disallow function declarations in loops (it won't do what you think!)
    'no-loop-func': 'error',

    // Disallow magic numbers; prefer constants
    'no-magic-numbers': [0, {
      ignore: [1],
      ignoreArrayIndexes: true,
      enforceConst: true,
      detectObjects: false,
    }],

    // Disallow multiple spaces in a row within a statement
    'no-multi-spaces': 'error',

    // Disallow multiline strings (more trouble than they're worth)
    'no-multi-str': 'error',

    // Disallow reassigning native objects (really?)
    'no-native-reassign': 'error',

    // Disallow `new` which doesn't create an object to be used
    'no-new': 'error',

    // Disallow `new Function()` (WHY WOULD YOU EVER WANT THIS?!)
    // (This is the kind of rule that makes me wish there was a level above
    // 'error'; maybe something to slap you across the face, or automatically
    // remove the line as you type it. Seriously. I'm not even kidding.)
    'no-new-func': 'error',

    // Disallow wrapping native types (e.g. `new Boolean()`)
    'no-new-wrappers': 'error',

    // Warn about using octal literals (which can be confusing)
    'no-octal': 'warn',

    // Disallow octal escape characters (use Unicode escapes instead)
    'no-octal-escape': 'error',

    // Disallow reassigning function parameters
    'no-param-reassign': ['error', {props: true}],

    // Disallow accessing the __proto__ property
    'no-proto': 'error',

    // Disallow re-declaring `var` variables
    'no-redeclare': 'error',

    // Disallow assigning variables within return statements (just split it!)
    'no-return-assign': 'error',

    // Disallow `javascript:` urls (they need to be destroyed)
    'no-script-url': 'error',

    // Disallow assigning something to itself
    'no-self-assign': 'error',

    // Disallow comparing something to itself
    'no-self-compare': 'error',

    // Disallow comma operators (Just...don't. Please.)
    'no-sequences': 'error',

    // Disallow throwing literals (we have Error for a reason!)
    'no-throw-literal': 'error',

    // Disallow unmodified loop conditions
    // E.g. `let x = ...; for (x != null) { doSomething(); }` (x is unmodified)
    'no-unmodified-loop-condition': 'error',

    // Warn about statements which don't do anything (e.g. `x + 3;`)
    'no-unused-expressions': 'warn',

    // Disallow labels which are never used
    'no-unused-labels': 'error',

    // Disallow .call() and .apply() where just calling directly works just fine
    'no-useless-call': 'error',

    // Disallow concatenating two literals, etc.
    'no-useless-concat': 'error',

    // Disallow escaping characters that don't need to be
    'no-useless-escape': 'error',

    // Disallow the void operator (it has NO purpose in ES5)
    'no-void': 'error',

    // Allow TODO, FIXME, etc. in comments
    'no-warning-comments': 'off',

    // Disallow with (it muddies the scope in a confusing way)
    'no-with': 'error',

    // Require a radix in parseInt()
    radix: 'error',

    // Require `var` to be at the top of its scope to prevent hoisting
    'vars-on-top': 'error',

    // Always wrap parentheses around function expressions which are IIFEs
    'wrap-iife': ['error', 'inside'],

    // Disallow "yoda" conditions (e.g. `if (3 === x)`)
    yoda: ['error', 'never'],
  },
};
