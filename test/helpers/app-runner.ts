import axios, { AxiosInstance } from 'axios';
import { createApp } from '../../src/app';
import { Config, defaultConfig } from '../../src/config';
import * as test from 'node:test';

export async function runApp(t: TestContext, config: Config = defaultConfig): Promise<AxiosInstance> {
  const app = createApp({ ...config, logger: false });
  t.after(() => app.stop());
  await app.start();
  return axios.create({
    baseURL: `http://localhost:${config.port}`,
    headers: { 'Content-Type': 'application/json' },
    validateStatus: () => true,
  });
}

export type TestContext = {
  after: typeof test.after;
};
