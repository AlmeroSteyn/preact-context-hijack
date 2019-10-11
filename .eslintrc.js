module.exports = {
  env: {
    browser: true,
  },

  plugins: ['prettier', 'react-hooks'],

  settings: {
    'import/resolver': 'webpack',
  },

  globals: {
    __webpack_public_path__: true,
    __BUILD__: true,
    __DEV__: true,
    process: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },

  extends: ['airbnb-base', 'prettier', 'plugin:react/recommended'],

  rules: {
    'default-case': 0,
    'func-names': 0,
    'global-require': 0,
    'import/extensions': ['error', { js: 'never', json: 'always' }],
    'import/prefer-default-export': 0,
    'no-case-declarations': 0,
    'no-console': 0,
    'no-else-return': 0,
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-prototype-builtins': 0,
    'no-restricted-properties': 0,
    'no-var': 'error',
    'no-param-reassign': ['error', { props: false }],
    'prefer-arrow-callback': 0,
    'prefer-const': 'error',
    'import/no-webpack-loader-syntax': 0,
    'prettier/prettier': ['error', require('./package.json').prettier],
    'react/jsx-no-bind': [2, { allowArrowFunctions: true }],
    'react/jsx-no-duplicate-props': 2,
    'react/self-closing-comp': 2,
    'react/prefer-es6-class': 2,
    'react/no-string-refs': 2,
    'react/require-render-return': 2,
    'react/no-find-dom-node': 2,
    'react/no-is-mounted': 2,
    'react/jsx-no-comment-textnodes': 2,
    'react/jsx-curly-spacing': 2,
    'react/jsx-no-undef': 2,
    'react/jsx-uses-react': 2,
    'react/jsx-uses-vars': 2,
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },

  overrides: [
    {
      // Overrides for old files without proper whitespace rules
      // Should enable this when possible.
      files: '',
      rules: {
        'dot-notation': 0,
        eqeqeq: 0,
        'prefer-template': 0,
        'prettier/prettier': 0,
      },
    },
  ],
}
