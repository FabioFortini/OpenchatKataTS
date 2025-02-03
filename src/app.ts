import {FastifyPluginAsync} from 'fastify';
import {usersRoutes} from "./routes/users-routes";
import {rootRoute} from "./routes/root-route";
import sensible from "@fastify/sensible";
import { RegisterUserUseCase } from './register-user-use-case';
import { InMemoryUserRepository } from './in-memory-user-repository';

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
