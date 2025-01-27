import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  clearMocks: true,
  collectCoverage: true,
  preset: 'ts-jest/presets/js-with-ts-esm',
  projects: ['<rootDir>/packages/*'],
  transform: {
    '.+\\.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
  },
};

// eslint-disable-next-line import/no-default-export
export default config;
