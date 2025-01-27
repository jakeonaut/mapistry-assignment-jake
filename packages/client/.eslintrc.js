module.exports = {
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:react/jsx-runtime',
    '../../.eslintrc.js',
  ],
  env: {
    browser: true,
  },
  plugins: ['react-hooks'],
  rules: {
    'react/function-component-definition': 'off',
    'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.tsx'] }],
    // 'react/jsx-curly-newline': 'off',
    // 'react/jsx-indent-props': 'off',
    // 'react/jsx-one-expression-per-line': 'off',
    // 'react/jsx-props-no-spreading': 'off',
    // 'react-hooks/exhaustive-deps': 'warn',
    // 'react-hooks/rules-of-hooks': 'error',
  },
  overrides: [
    {
      files: ['*.test.js'],
      rules: {
        'jsx-a11y/control-has-associated-label': 'off',
      },
    },
  ],
};
