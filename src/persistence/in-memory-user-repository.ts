import {UserRepository} from "../domain/user-repository";
import {User} from "../domain/user";
import {randomUUID} from "node:crypto";

export class InMemoryUserRepository implements UserRepository {
  private users: Record<string, User> = {}

  createUser(username: string, password: string, about: string): User | undefined {
    if (this.users[username]) {
      return undefined
    }

    this.users[username] = {
      id: randomUUID(),
      username,
      about
    }
    return this.users[username];
  }
}