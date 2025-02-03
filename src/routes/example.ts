import { FastifyPluginAsync } from "fastify"

type ExampleOptions = { exampleOption: string }
const example: FastifyPluginAsync<ExampleOptions> = async (fastify, opts): Promise<void> => {
  fastify.get('/example', async function (request, reply) {
    return 'this is an example' + opts.exampleOption
  })
}

export default example;
