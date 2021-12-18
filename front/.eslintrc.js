module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
  },
  extends: [],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [],
  root: true,
  rules: {
    indent: [
      'error',
      2
    ],
    quotes: [
      'error',
      'single'
    ]
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
