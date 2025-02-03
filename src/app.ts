import {FastifyPluginAsync} from 'fastify';
import {users} from "./routes/users";
import {root} from "./routes/root";
import sensible from "@fastify/sensible";

export const app: FastifyPluginAsync = async (fastify): Promise<void> => {
  // plugins
  void fastify.register(sensible)
  // routes
  void fastify.register(root)
  void fastify.register(users, { })
};

export default app;
