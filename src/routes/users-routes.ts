import {FastifyPluginAsync, FastifyReply, FastifyRequest} from "fastify"
import {RegisterUserRequest} from "../register-user-request";

type UsersDependencies = { }
type FastifyRegisterUserRequest = FastifyRequest<{Body: RegisterUserRequest}>

export const usersRoutes: FastifyPluginAsync<UsersDependencies> = async (fastify, deps) => {

  fastify.get('/users', async function (request, reply) {
    return []
  })

  fastify.post('/users', async function (request: FastifyRegisterUserRequest, reply: FastifyReply) {
    return {
      id: "1",
      username: "pino",
      about: "ciao morris"
    }
  })

}
