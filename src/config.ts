export type Config = {
  port: number;
  logger: boolean;
};

export const defaultConfig: Config = {
  port: 3000,
  logger: true,
};
