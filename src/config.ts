export type Config = {
  port: number;
  logger: boolean;
};

export const defaultCfg: Config = {
  port: 3000,
  logger: true,
};
