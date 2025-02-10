import { FastifyPluginAsync } from 'fastify';
import { usersRoutes } from './web/routes/users-routes';
import { rootRoute } from './web/routes/root-route';
import sensible from '@fastify/sensible';
import { RegisterUserUseCase } from './domain/register-user-use-case';
// import { PrismaClient } from '@prisma/client';
// import { PrismaUserRepository } from './persistence/prisma-user-repository';
import { InMemoryUserRepository } from './persistence/in-memory-user-repository';

export const app: FastifyPluginAsync = async (fastify): Promise<void> => {
  // const client = new PrismaClient()
  // const userRepository = new PrismaUserRepository(client)
  const userRepository = new InMemoryUserRepository();
  const registerUserUseCase = new RegisterUserUseCase(userRepository);
  console.log('test');
  // plugins
  void fastify.register(sensible);
  // routes
  void fastify.register(rootRoute);
  void fastify.register(usersRoutes, { registerUserUseCase });
};

export default app;
