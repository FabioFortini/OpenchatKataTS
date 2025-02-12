import axios, { AxiosInstance } from 'axios';
import { createApp } from '../../src/app';
import { Config, defaultCfg } from '../../src/config';

export async function runApp(
  config: Config = defaultCfg,
  test: (client: AxiosInstance) => Promise<void>,
): Promise<void> {
  const app = createApp({ ...config, logger: true });
  await app.start();
  try {
    const client = axios.create({
      baseURL: `http://localhost:${config.port}`,
      headers: { 'Content-Type': 'application/json' },
      validateStatus: () => true,
    });
    await test(client);
  } finally {
    await app.stop();
  }
}
