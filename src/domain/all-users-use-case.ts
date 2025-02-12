import { UserRepository } from './user-repository';

export class AllUsersUseCase {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async execute() {
    return await this.repository.allUsers();
  }
}
