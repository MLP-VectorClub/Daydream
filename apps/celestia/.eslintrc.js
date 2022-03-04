module.exports = {
  ...require('@mlp-vectorclub/config/eslint-preset'),
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig*.json',
  },
};
