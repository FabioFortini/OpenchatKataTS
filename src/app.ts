import {FastifyPluginAsync, FastifyServerOptions} from 'fastify';
import example from "./routes/example";
import root from "./routes/root";
import sensible from "@fastify/sensible";

export interface AppOptions extends FastifyServerOptions {
  exampleOption: string;
}
// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {
  exampleOption: " with options",
}

const app: FastifyPluginAsync<AppOptions> = async (
    fastify,
    opts
): Promise<void> => {
  void fastify.register(sensible)

  void fastify.register(root, opts)
  void fastify.register(example, opts)
};

export default app;
export { app, options }
