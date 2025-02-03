import { test } from 'node:test'
import * as assert from 'node:assert'
import { runApp } from '../../helper'

test('default root route', async (t) => {
  const app = await runApp(t)

  const res = await app.inject({ url: '/'})

  assert.deepStrictEqual(JSON.parse(res.payload), { root: true })
})
