import {FastifyPluginAsync, FastifyReply, FastifyRequest} from "fastify"
import {RegisterUserRequest} from "../register-user-request";
import {User} from "../user";
import {RegisterUserUseCase} from "../register-user-use-case";
import {FastifyInstance} from "fastify/types/instance";

type UsersDependencies = { registerUserUseCase: RegisterUserUseCase }
type FastifyRegisterUserRequest = FastifyRequest<{ Body: RegisterUserRequest }>

export const usersRoutes: FastifyPluginAsync<UsersDependencies> = async (fastify: FastifyInstance, deps) => {

  fastify.get('/users', async function (request: FastifyRequest, reply: FastifyReply) {
    return []
  })

  fastify.post('/users', async function (request: FastifyRegisterUserRequest, reply: FastifyReply) {
    const createdUser: User | undefined = deps.registerUserUseCase.execute(request.body)
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
