import { FastifyPluginAsync } from "fastify"
import {AppOptions} from "../app";

const example: FastifyPluginAsync<AppOptions> = async (fastify, opts): Promise<void> => {
  fastify.get('/example', async function (request, reply) {
    return 'this is an example' + opts.exampleOption
  })
}

export default example;
