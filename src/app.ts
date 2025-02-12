import Fastify, { FastifyPluginAsync } from 'fastify';
import { usersRoutes } from './web/routes/users-routes';
import { rootRoute } from './web/routes/root-route';
import sensible from '@fastify/sensible';
import { RegisterUserUseCase } from './domain/register-user-use-case';
// import { PrismaClient } from '@prisma/client';
// import { PrismaUserRepository } from './persistence/prisma-user-repository';
import { Config } from './config';
import { AllUsersUseCase } from './domain/all-users-use-case';
import { DrizzleUserRepository } from './persistence/drizzle-user-repository';

import { Pool } from 'pg';

const plugins: FastifyPluginAsync = async (fastify) => {
  fastify.register(sensible);
};

const routes: FastifyPluginAsync = async (fastify) => {
  // const client = new PrismaClient();
  // const prismaUserRepository = new PrismaUserRepository(client);

  const pool = createPostgresPool();
  const drizzleUserRepository = new DrizzleUserRepository(pool);
  const registerUserUseCase = new RegisterUserUseCase(drizzleUserRepository);
  const allUsersUseCase = new AllUsersUseCase(drizzleUserRepository);

  fastify.register(rootRoute);
  fastify.register(usersRoutes, { registerUserUseCase, allUsersUseCase });

  fastify.addHook('onClose', async () => {
    await pool.end();
  })
};

export function createApp(config: Config) {
  const fastify = Fastify({ logger: config.logger });
  fastify.register(plugins);
  fastify.register(routes);

  return {
    async start() {
      return fastify
        .listen({ port: config.port, host: '0.0.0.0' })
        .then(() => {})
        .catch((err) => fastify.log.error(err));
    },
    async stop() {
      return fastify.close();
    },
  };
}

function createPostgresPool(): Pool {
  return new Pool({
    connectionString: process.env.DATABASE_URL,
    // other pool config
  });
}
