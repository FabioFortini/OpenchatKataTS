import { after, before, beforeEach, describe, test } from 'node:test';
import { deepStrictEqual, equal } from 'node:assert';
import { runApp } from '../../helpers/app-runner';
import { RegisterUserRequest } from '../../../src/domain/register-user-request';
import { DatabaseContainer } from '../../helpers/database-container';

describe('users route', async () => {
  const database = new DatabaseContainer();
  before(() => database.start());
  beforeEach(() => database.restore());
  after(() => database.stop());

  test('register a new user', async (t) => {
    const client = await runApp(t);
    const request: RegisterUserRequest = { username: 'pino', password: 'dei palazzi', about: 'ciao morris' };

    const res = await client.post('/users', request);

    deepStrictEqual(res.status, 200);
    deepStrictEqual(res.data, { id: '1', username: 'pino', about: 'ciao morris' });
  });

  test('register an already existing user', async (t) => {
    const client = await runApp(t);
    const request: RegisterUserRequest = { username: 'pino', password: 'dei palazzi', about: 'ciao morris' };
    const firstResponse = await client.post('/users', request);

    const lastResponse = await client.post('/users', request);

    equal(firstResponse.status, 200);
    equal(lastResponse.status, 400);
    equal(lastResponse.data, 'Username already in use');
  });

  test('no users found', async (t) => {
    const client = await runApp(t);

    const res = await client.get('/users');

    deepStrictEqual(res.data, []);
  });
});
