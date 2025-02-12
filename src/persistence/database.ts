import { Database } from './types'; // this is the Database interface we defined earlier
import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';

export function buildDatabase(url: string): Kysely<Database> {
  const dialect = new PostgresDialect({
    pool: new Pool({
      connectionString: url,
      max: 10,
    }),
  });

  // Database interface is passed to Kysely's constructor, and from now on, Kysely
  // knows your database structure.
  // Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
  // to communicate with your database.
  return new Kysely<Database>({ dialect });
}
