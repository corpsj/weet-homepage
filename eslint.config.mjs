import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

export default [
  {
    ignores: ['.next/**', 'out/**', 'build/**', 'node_modules/**'],
  },
  ...nextCoreWebVitals,
  {
    rules: {
      'react/no-unescaped-entities': 'off',
    },
  },
];
