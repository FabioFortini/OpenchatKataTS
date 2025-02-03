import {FastifyPluginAsync} from 'fastify';
import {usersRoutes} from "./routes/users-routes";
import {rootRoute} from "./routes/root-route";
import sensible from "@fastify/sensible";

export const app: FastifyPluginAsync = async (fastify): Promise<void> => {
  // plugins
  void fastify.register(sensible)
  // routes
  void fastify.register(rootRoute)
  void fastify.register(usersRoutes, { })
};

export default app;
