export type Config = {
  database_url: string;
};

export function fromEnv(): Config {
  return {
    database_url: process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/postgres',
  };
}
