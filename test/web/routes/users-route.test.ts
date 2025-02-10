import { after, before, describe, beforeEach, test } from 'node:test';
import { deepStrictEqual, equal } from 'node:assert';
import { runApp } from '../../helper';
import { RegisterUserRequest } from '../../../src/domain/register-user-request';
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { Migrate } from '@prisma/migrate';

describe('users route', async () => {
  let container: StartedPostgreSqlContainer;
  let migrate: Migrate;

  before(async () => {
    container = await new PostgreSqlContainer().start();
    process.env.DATABASE_URL = container.getConnectionUri();
    migrate = new Migrate('prisma/schema.prisma');
  });

  beforeEach(async () => {
    await migrate.reset();
    await migrate.applyMigrations();
  });

  after(() => {
    migrate.stop();
    container.stop();
  });

  test('register a new user', async (t) => {
    const app = await runApp(t);
    const request: RegisterUserRequest = { username: 'pino', password: 'dei palazzi', about: 'ciao morris' };

    const res = await app.inject({ method: 'POST', url: '/users', body: request });

    deepStrictEqual(JSON.parse(res.payload), { id: '1', username: 'pino', about: 'ciao morris' });
  });

  test('register an already existing user', async (t) => {
    const app = await runApp(t);
    const request: RegisterUserRequest = { username: 'pino', password: 'dei palazzi', about: 'ciao morris' };
    const firstResponse = await app.inject({ method: 'POST', url: '/users', body: request });

    const lastResponse = await app.inject({ method: 'POST', url: '/users', body: request });

    equal(firstResponse.statusCode, 200);
    equal(lastResponse.statusCode, 400);
    equal(lastResponse.payload, 'Username already in use');
  });

  test('no users found', async (t) => {
    const app = await runApp(t);

    const res = await app.inject({ method: 'GET', url: '/users' });

    equal(res.payload, '[]');
  });
});
