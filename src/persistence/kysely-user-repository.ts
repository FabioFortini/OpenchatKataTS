import { User } from '../domain/user';
import { UserRepository } from '../domain/user-repository';
import { Database } from './database';

export class KyselyUserRepository implements UserRepository {
  constructor(private db: Database) {}

  async createUser(username: string, password: string, about: string): Promise<User | undefined> {
    const found = await this.db.selectFrom('User').selectAll().where('username', '=', username).execute();

    if (found.length > 0) {
      return undefined;
    }

    const created = await this.db
      .insertInto('User')
      .values({ username, password, about })
      .returningAll()
      .executeTakeFirstOrThrow();

    return this.toUser(created);
  }

  async allUsers(): Promise<User[]> {
    const users = await this.db.selectFrom('User').selectAll().execute();

    return users.map((u) => this.toUser(u));
  }

  private toUser(u: any): User {
    return { id: u.id, username: u.username, about: u.about };
  }
}
