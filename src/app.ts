import {FastifyPluginAsync} from 'fastify';
import {usersRoutes} from "./web/routes/users-routes";
import {rootRoute} from "./web/routes/root-route";
import sensible from "@fastify/sensible";
import { RegisterUserUseCase } from './domain/register-user-use-case';
import { InMemoryUserRepository } from './persistence/in-memory-user-repository';

export const app: FastifyPluginAsync = async (fastify): Promise<void> => {
  const userRepository = new InMemoryUserRepository()
  const registerUserUseCase = new RegisterUserUseCase(userRepository)

  // plugins
  void fastify.register(sensible)
  // routes
  void fastify.register(rootRoute)
  void fastify.register(usersRoutes, { registerUserUseCase })
};

export default app;
