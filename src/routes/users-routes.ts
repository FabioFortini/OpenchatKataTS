import {FastifyPluginAsync, FastifyReply, FastifyRequest} from "fastify"

type UsersDependencies = { }
export const usersRoutes: FastifyPluginAsync<UsersDependencies> = async (fastify, deps) => {

  fastify.get('/users', async function (request, reply) {
    return []
  })

  fastify.post('/users', async function (request: FastifyRequest, reply: FastifyReply) {
    return {
      id: "1",
      username: "pino",
      about: "ciao morris"
    }
  })

}
