import { defaultConfig } from './config';
import { createApp } from './app';

createApp(defaultConfig)
  .start()
  .catch(() => process.exit(1));
