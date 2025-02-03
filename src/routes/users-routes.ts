import {FastifyPluginAsync, FastifyReply, FastifyRequest} from "fastify"
import {RegisterUserRequest} from "../register-user-request";
import {randomUUID} from "node:crypto";

type UsersDependencies = {}
type FastifyRegisterUserRequest = FastifyRequest<{ Body: RegisterUserRequest }>

interface UserRepository {
  createUser(username: string, password: string, about: string): User | undefined
}

class RegisterUserUseCase {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  execute(user: RegisterUserRequest) {
    return this.repository.createUser(user.username, user.password, user.about)
  }
}

class InMemoryUserRepository implements UserRepository {
  private users: Record<string, User> = {}
  createUser(username: string, password: string, about: string): User | undefined {
    if(this.users[username]) {
      return undefined
    }

    this.users[username] = {
      id: randomUUID(),
      username,
      about
    }
    return this.users[username];
  }
}

interface User {
  id: string;
  username: string;
  about: string;
}

export const usersRoutes: FastifyPluginAsync<UsersDependencies> = async (fastify, deps) => {
  const registerUserUseCase = new RegisterUserUseCase(new InMemoryUserRepository())

  fastify.get('/users', async function (request, reply) {
    return []
  })

  fastify.post('/users', async function (request: FastifyRegisterUserRequest, reply: FastifyReply) {

    const createdUser: User | undefined = registerUserUseCase.execute(request.body)

    if (!createdUser) {
      reply.status(400).send("Username already in use")
    }
    return {
      id: "1",
      username: "pino",
      about: "ciao morris"
    }
  })
}
