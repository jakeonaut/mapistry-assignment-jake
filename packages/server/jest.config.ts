import type { Config } from '@jest/types';
import rootConfig from '@mapistry/take-home-challenge/jest.config';

const config: Config.InitialOptions = {
  ...rootConfig,
  displayName: 'server',
  name: 'server',
  roots: ['<rootDir>/packages/server'],
};

// eslint-disable-next-line import/no-default-export
export default config;
