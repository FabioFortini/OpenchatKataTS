import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { runApp } from '../../helpers/app-runner';
import { RegisterUserRequest } from '../../../src/domain/register-user-request';
import { DatabaseContainer } from '../../helpers/database-container';
import { defaultCfg } from '../../../src/config';

describe('/users', async () => {
  const database = new DatabaseContainer();
  beforeAll(() => database.start());
  beforeEach(() => database.restore());
  afterAll(() => database.stop());

  it('register a new user', async () => {
    await runApp(defaultCfg, async (client) => {
      const request: RegisterUserRequest = { username: 'pino', password: 'dei palazzi', about: 'ciao morris' };

      const res = await client.post('/users', request);

      expect(res.status).toBe(200);
      expect(res.data).toStrictEqual({ id: '1', username: 'pino', about: 'ciao morris' });
    });
  });

  it('register an already existing user', async () => {
    await runApp(defaultCfg, async (client) => {
      const request: RegisterUserRequest = { username: 'pino', password: 'dei palazzi', about: 'ciao morris' };
      const firstResponse = await client.post('/users', request);

      const lastResponse = await client.post('/users', request);

      expect(firstResponse.status).toBe(200);
      expect(lastResponse.status).toBe(400);
      expect(lastResponse.data).toStrictEqual('Username already in use');
    });
  });

  it('no users found', async () => {
    await runApp(defaultCfg, async (client) => {
      const res = await client.get('/users');

      expect(res.status).toBe(200);
      expect(res.data).toStrictEqual([]);
    });
  });

  it('some users found', async () => {
    await runApp(defaultCfg, async (client) => {
      await client.post('/users', { username: 'user1', password: 'pwd', about: 'about1' });
      await client.post('/users', { username: 'user2', password: 'pwd', about: 'about2' });
      const res = await client.get('/users');

      expect(res.status).toBe(200);
      expect(res.data).toStrictEqual([
        { id: 1, username: 'user1', about: 'about1' },
        { id: 2, username: 'user2', about: 'about2' },
      ]);
    });
  });
});
