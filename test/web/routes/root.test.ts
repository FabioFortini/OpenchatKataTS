import { test } from 'node:test';
import * as assert from 'node:assert';
import { runApp } from '../../helpers/app-runner';

test('default root route', async (t) => {
  const client = await runApp(t);

  const res = await client.get('/');

  assert.deepStrictEqual(res.data, { root: true });
});
