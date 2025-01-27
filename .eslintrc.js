module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    jest: true,
    node: true,
  },
  plugins: ['@typescript-eslint', 'react', 'jest'],
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:jest/recommended',
    'prettier',
  ],
  settings: {
    'import/resolver': {
      typescript: {
        project: 'packages/*/tsconfig.json',
      },
    },
  },
  rules: {
    'class-methods-use-this': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'test/**', // tape, common npm pattern
          'tests/**', // also common npm pattern
          'spec/**', // mocha, rspec-like pattern
          '**/__tests__/**', // jest pattern
          '**/__mocks__/**', // jest pattern
          'test.{js,jsx}', // repos with a single test file
          'test-*.{js,jsx}', // repos with multiple top-level test files
          '**/*{.,_}{test,spec}.{js,jsx}', // tests where the extension or filename suffix denotes that it is a test
          '**/jest.config.ts', // jest config
          '**/webpack.config.js',
        ],
        optionalDependencies: false,
      },
    ],
    // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
    'import/no-default-export': 'warn',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': [
      'error',
      {
        allowAfterSuper: true,
        allowAfterThis: true,
        enforceInMethodNames: true,
        enforceInClassFields: true,
      },
    ],

    '@typescript-eslint/no-shadow': 'error',
    'no-shadow': 'off',

    '@typescript-eslint/no-useless-constructor': 'error',
    'no-useless-constructor': 'off',
  },
};
