import { test } from 'node:test'
import * as assert from 'node:assert'
import { runApp } from '../helper'

test('example is loaded', async (t) => {
  const app = await runApp(t)

  const res = await app.inject({ url: '/example' })

  assert.equal(res.payload, 'this is an example with options')
})
