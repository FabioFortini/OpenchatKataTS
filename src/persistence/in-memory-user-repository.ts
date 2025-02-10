import { UserRepository } from '../domain/user-repository';
import { User } from '../domain/user';

export class InMemoryUserRepository implements UserRepository {
  private users: Record<string, User> = {};
  private id = 0;

  async createUser(username: string, password: string, about: string): Promise<User | undefined> {
    if (this.users[username]) {
      return undefined;
    }

    this.users[username] = {
      id: this.nextId(),
      username,
      about,
    };
    return this.users[username];
  }

  private nextId(): number {
    return this.id++;
  }
}
