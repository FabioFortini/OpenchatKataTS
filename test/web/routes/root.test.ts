import { test } from 'node:test';
import * as assert from 'node:assert';
import { runApp } from '../../helpers/app-runner';

test('default root route', async (t) => {
  const app = await runApp(t);

  const res = await app.inject({ url: '/' });

  assert.deepStrictEqual(JSON.parse(res.payload), { root: true });
});
