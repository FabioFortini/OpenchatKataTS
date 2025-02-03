import { test, describe } from 'node:test'
import * as assert from 'node:assert'
import { runApp } from '../helper'

describe('users route', () => {
  test('no users found', async (t) => {
    const app = await runApp(t)

    const res = await app.inject({ method: 'GET', url: '/users' })

    assert.equal(res.payload, '[]')
  })
})
