import { UserRepository } from '../domain/user-repository';
import { User } from '../domain/user';
import { randomUUID } from 'node:crypto';

export class InMemoryUserRepository implements UserRepository {
  private users: Record<string, User> = {};

  async createUser(username: string, password: string, about: string): Promise<User | undefined> {
    if (this.users[username]) {
      return undefined;
    }

    this.users[username] = {
      id: randomUUID(),
      username,
      about,
    };
    return this.users[username];
  }
}
