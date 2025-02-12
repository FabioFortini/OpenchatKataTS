import Fastify, { FastifyPluginAsync } from 'fastify';
import { usersRoutes } from './web/routes/users-routes';
import { rootRoute } from './web/routes/root-route';
import sensible from '@fastify/sensible';
import { RegisterUserUseCase } from './domain/register-user-use-case';
import { Config } from './config';
import { AllUsersUseCase } from './domain/all-users-use-case';
import { initializeDatabase } from './persistence/database';
import { KyselyUserRepository } from './persistence/kysely-user-repository';

const plugins: FastifyPluginAsync = async (fastify) => {
  fastify.register(sensible);
};

const routes: FastifyPluginAsync = async (fastify) => {
  const db = initializeDatabase(process.env.DATABASE_URL!);
  fastify.addHook('onClose', () => db.destroy());

  const userRepository = new KyselyUserRepository(db);
  const registerUserUseCase = new RegisterUserUseCase(userRepository);
  const allUsersUseCase = new AllUsersUseCase(userRepository);

  fastify.register(rootRoute);
  fastify.register(usersRoutes, { registerUserUseCase, allUsersUseCase });
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
