import { User } from '../domain/user';
import { UserRepository } from '../domain/user-repository';

import { eq } from 'drizzle-orm';
import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

export class DrizzleUserRepository implements UserRepository {
  private client: NodePgDatabase;

  constructor(pool: Pool) {
    this.client = drizzle(pool);
  }

  async createUser(username: string, password: string, about: string): Promise<User | undefined> {
    const userExists = await this.client.$count(usersTable, eq(usersTable.username, username));
    if (userExists) {
      return undefined;
    }

    const created = await this.client.insert(usersTable).values({ username, password, about });
    return this.toUser(created);
  }

  async allUsers(): Promise<User[]> {
    const rows = await this.client.select().from(usersTable);
    return rows.map((u) => this.toUser(u));
  }

  private toUser(u: any): User {
    return { id: u.id, username: u.username, about: u.about };
  }
}

const usersTable = pgTable('User', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  about: varchar({ length: 255 }).notNull(),
});
