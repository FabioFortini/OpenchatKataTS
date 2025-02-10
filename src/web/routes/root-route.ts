import { FastifyPluginAsync } from 'fastify';

export const rootRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', async function (request, reply) {
    return { root: true };
  });
};
