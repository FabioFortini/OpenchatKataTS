import { DB } from './types';
import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';

export type Database = Kysely<DB>;

export function initializeDatabase(url: string): Database {
  const dialect = new PostgresDialect({
    pool: new Pool({
      connectionString: url,
      max: 10,
    }),
  });

  return new Kysely<DB>({ dialect });
}
