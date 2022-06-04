const commonParserOptions = {
  ecmaFeatures: {
    jsx: true,
  },
  ecmaVersion: 2018,
  sourceType: 'module',
};

module.exports = {
  ...require('@mlp-vectorclub/config/eslint-preset'),
  parserOptions: {
    ...commonParserOptions,
    project: './tsconfig.json',
  },
  overrides: [
    {
      files: '*.test.ts',
      parserOptions: {
        ...commonParserOptions,
        project: './tsconfig.test.json',
      },
    },
  ],
};
