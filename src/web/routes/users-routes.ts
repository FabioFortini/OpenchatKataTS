import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import { FastifyInstance } from 'fastify/types/instance';
import { RegisterUserUseCase } from '../../domain/register-user-use-case';
import { RegisterUserRequest } from '../../domain/register-user-request';
import { User } from '../../domain/user';
import { AllUsersUseCase } from '../../domain/all-users-use-case';

type UsersDependencies = {
  registerUserUseCase: RegisterUserUseCase;
  allUsersUseCase: AllUsersUseCase;
};
type FastifyRegisterUserRequest = FastifyRequest<{ Body: RegisterUserRequest }>;

export const usersRoutes: FastifyPluginAsync<UsersDependencies> = async (fastify: FastifyInstance, deps) => {
  fastify.get('/users', async function (request: FastifyRequest, reply: FastifyReply) {
    return await deps.allUsersUseCase.execute();
  });

  fastify.post('/users', async function (request: FastifyRegisterUserRequest, reply: FastifyReply) {
    const createdUser: User | undefined = await deps.registerUserUseCase.execute(request.body);
    if (!createdUser) {
      reply.status(400).send('Username already in use');
    }

    return {
      id: '1',
      username: 'pino',
      about: 'ciao morris',
    };
  });
};
