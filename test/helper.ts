const helper = require('fastify-cli/helper.js')
import { FastifyInstance } from 'fastify/types/instance';
import * as path from 'node:path';
import * as test from 'node:test';

const AppPath = path.join(__dirname, '..', 'src', 'app.ts')

export async function runApp(t: TestContext): Promise<FastifyInstance> {
  // you can set all the options supported by the fastify CLI command
  const cliOptions = [AppPath]
  const app = await helper.build(cliOptions, { skipOverride: true })
  t.after(() => void app.close())
  return app
}

export type TestContext = {
  after: typeof test.after
};
