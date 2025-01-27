import type { Config } from '@jest/types';
import rootConfig from '@mapistry/take-home-challenge/jest.config';

const config: Config.InitialOptions = {
  ...rootConfig,
  displayName: 'client',
  name: 'client',
  roots: ['<rootDir>/packages/client'],
  setupFilesAfterEnv: ['<rootDir>/packages/client/jest.setup.ts'],
  testEnvironment: 'jsdom',
};

// eslint-disable-next-line import/no-default-export
export default config;
