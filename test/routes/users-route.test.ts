import {describe, test} from 'node:test'
import * as assert from 'node:assert'
import {runApp} from '../helper'
import {RegisterUserRequest} from "../../src/register-user-request";


describe('users route', () => {
    test("register a new user", async (t) => {
        const app = await runApp(t)
        const request: RegisterUserRequest = {
            username: "pino",
            password: "dei palazzi",
            about: "ciao morris"
        }

        const res = await app.inject({method: 'POST', url: '/users', body: request})

        assert.deepStrictEqual(JSON.parse(res.payload), {
            id: "1",
            username: "pino",
            about: "ciao morris"
        })
    })

    test("register an already existing user", async (t) => {
        const app = await runApp(t)
        const request: RegisterUserRequest = {
            username: "pino",
            password: "dei palazzi",
            about: "ciao morris"
        }
        await app.inject({method: 'POST', url: '/users', body: request})

        const res = await app.inject({method: 'POST', url: '/users', body: request})

        assert.equal(res.statusCode, 400)
        assert.equal(res.payload, "Username already in use")
    })

    test('no users found', async (t) => {
        const app = await runApp(t)

        const res = await app.inject({method: 'GET', url: '/users'})

        assert.equal(res.payload, '[]')
    })
})

