import { after, before, describe, test } from 'node:test';
import * as assert from 'node:assert';
import { runApp } from '../../helper';
import { RegisterUserRequest } from '../../../src/domain/register-user-request';
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { Migrate } from '@prisma/migrate';

describe('users route', async () => {
  let container: StartedPostgreSqlContainer;

  before(async () => {
    container = await new PostgreSqlContainer().start();
    process.env.DATABASE_URL = container.getConnectionUri();
    const migrate = new Migrate('prisma/schema.prisma');
    await migrate.applyMigrations();
    migrate.stop();
  });

  after(() => {
    container.stop();
  });

  test('register a new user', async (t) => {
    const app = await runApp(t);
    const request: RegisterUserRequest = {
      username: 'pino2',
      password: 'dei palazzi2',
      about: 'ciao morris2',
    };

    const res = await app.inject({
      method: 'POST',
      url: '/users',
      body: request,
    });

    assert.deepStrictEqual(JSON.parse(res.payload), {
      id: '1',
      username: 'pino',
      about: 'ciao morris',
    });
  });

  test('register an already existing user', async (t) => {
    const app = await runApp(t);
    const request: RegisterUserRequest = {
      username: 'pino',
      password: 'dei palazzi',
      about: 'ciao morris',
    };
    await app.inject({ method: 'POST', url: '/users', body: request });

    const res = await app.inject({
      method: 'POST',
      url: '/users',
      body: request,
    });

    assert.equal(res.statusCode, 400);
    assert.equal(res.payload, 'Username already in use');
  });

  test('no users found', async (t) => {
    const app = await runApp(t);

    const res = await app.inject({ method: 'GET', url: '/users' });

    assert.equal(res.payload, '[]');
  });
});
