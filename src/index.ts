import { defaultCfg } from './config';
import { createApp } from './app';

createApp(defaultCfg)
  .start()
  .catch(() => process.exit(1));
