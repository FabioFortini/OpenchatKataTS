import { FastifyPluginAsync } from "fastify"

type UsersDependencies = { }
export const usersRoutes: FastifyPluginAsync<UsersDependencies> = async (fastify, deps) => {

  fastify.get('/users', async function (request, reply) {
    return []
  })

}
