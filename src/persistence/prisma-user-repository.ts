import { PrismaClient } from '@prisma/client';
import { User } from '../domain/user';
import { UserRepository } from '../domain/user-repository';

export class PrismaUserRepository implements UserRepository {
  constructor(private client: PrismaClient) {}

  async createUser(username: string, password: string, about: string): Promise<User | undefined> {
    const found = await this.client.user.findUnique({ where: { username } });
    if (found) {
      return undefined;
    }

    const created = await this.client.user.create({
      data: { username, password, about },
    });

    return {
      id: created.id,
      username: created.username,
      about: created.about,
    };
  }
}
