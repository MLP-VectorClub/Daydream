require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'next',
    'prettier',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:eslint-comments/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  ignorePatterns: ['node_modules'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  plugins: ['@typescript-eslint', 'react', 'import-newlines'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-unnecessary-type-assertion': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    'arrow-parens': ['error', 'always'],
    camelcase: 'off',
    'consistent-return': 'off',
    'global-require': 'off',
    'implicit-arrow-linebreak': 'off',
    'import/extensions': 'off',
    'import/no-dynamic-require': 'off',
    'import/prefer-default-export': 'off',
    indent: 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'max-len': ['error', 140],
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error'],
      },
    ],
    'no-nested-ternary': 'off',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state'],
      },
    ],
    'no-plusplus': 'off',
    'no-restricted-globals': 'off',
    'no-shadow': 'off',
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    'no-void': 'off',
    'object-curly-newline': [
      'error',
      {
        multiline: true,
        consistent: true,
      },
    ],
    'padded-blocks': ['error', 'never'],
    'prefer-destructuring': 'off',
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.tsx', '.jsx', '.js'],
      },
    ],
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-array-index-key': 'off',
    'react/no-danger': 'off',
    'react/no-unescaped-entities': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-key': [
      'error',
      {
        checkFragmentShorthand: true,
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'react',
            importNames: ['default'],
          },
          {
            name: 'react-i18next',
            importNames: ['useTranslation', 'Trans', 'TFunction'],
            message: 'Import this from `next-i18next` instead for consistency',
          },
          {
            name: 'i18next',
            importNames: ['TFunction'],
            message: 'Import this from `next-i18next` instead for consistency',
          },
        ],
      },
    ],
    '@next/next/no-html-link-for-pages': 'off',
    'react/function-component-definition': 'off',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
    react: {
      version: 'detect',
    },
  },
};
