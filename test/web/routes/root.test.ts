import { describe, expect, it } from 'vitest';
import { runApp } from '../../helpers/app-runner';
import { defaultCfg } from '../../../src/config';

describe('/', async () => {
  it('default root route', async () => {
    await runApp(defaultCfg, async (client) => {
      const res = await client.get('/');

      expect(res.data).toStrictEqual({ root: true });
    });
  });
});
