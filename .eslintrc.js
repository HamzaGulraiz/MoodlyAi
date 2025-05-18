module.exports = {
  root: true,
  extends: ['universe', 'universe/shared/typescript-analysis'],
  ignorePatterns: ['**/__test__/*', 'node_modules/', 'dist/'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
  rules: {
    'linebreak-style': 0,
    'no-unused-expressions': 0,
    'no-param-reassign': 0,
    'import/named': 0,
    'no-restricted-syntax': 0,
    'no-async-promise-executor': 0,
    'import/no-extraneous-dependencies': 0,
    'no-undef': 0,
    'no-underscore-dangle': 0,
    'object-shorthand': 0,
    'no-var': 0,
    'no-console': 'warn',
    '@typescript-eslint/quotes': 0,
    'comma-dangle': 0,
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
  },
  env: {
    jest: true,
  },
}
