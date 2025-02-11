import Fastify from 'fastify';
import { usersRoutes } from './web/routes/users-routes';
import { rootRoute } from './web/routes/root-route';
import sensible from '@fastify/sensible';
import { RegisterUserUseCase } from './domain/register-user-use-case';
import { PrismaClient } from '@prisma/client';
import { PrismaUserRepository } from './persistence/prisma-user-repository';
import { Config } from './config';

export type App = {
  start: () => Promise<void>;
  stop: () => Promise<void>;
};

export function createApp(config: Config): App {
  const fastify = Fastify({ logger: config.logger });
  const client = new PrismaClient();
  const userRepository = new PrismaUserRepository(client);
  const registerUserUseCase = new RegisterUserUseCase(userRepository);

  // plugins
  fastify.register(sensible);

  //routes
  fastify.register(rootRoute);
  fastify.register(usersRoutes, { registerUserUseCase });

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
