import {FastifyPluginAsync} from 'fastify';
import {example} from "./routes/example";
import {root} from "./routes/root";
import sensible from "@fastify/sensible";

export const app: FastifyPluginAsync = async (fastify): Promise<void> => {
  // plugins
  void fastify.register(sensible)
  // routes
  void fastify.register(root)
  void fastify.register(example, { exampleOption: " with options" })
};

export default app;
