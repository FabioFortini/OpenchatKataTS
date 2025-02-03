import {describe, test} from 'node:test'
import * as assert from 'node:assert'
import {runApp} from '../helper'
import {RegisterUserRequest} from "../../src/register-user-request";


describe('users route', () => {
  // registra un utente che non esiste -> ritorna l'utente con id
  // registra un utente che esiste -> ritorna 400 Username already in use
  test("register a new user", async (t) => {
    const app = await runApp(t)
    const request: RegisterUserRequest = {
      username: "pino",
      password: "dei palazzi",
      about: "ciao morris"
    }

    const res = await app.inject({ method: 'POST', url: '/users',  body: request })

    assert.deepStrictEqual(JSON.parse(res.payload), {
      id: "1",
      username: "pino",
      about: "ciao morris"
    })
  })

  test('no users found', async (t) => {
    const app = await runApp(t)

    const res = await app.inject({ method: 'GET', url: '/users' })

    assert.equal(res.payload, '[]')
  })
})

