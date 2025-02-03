import {UserRepository} from "./user-repository";
import {RegisterUserRequest} from "./register-user-request";

export class RegisterUserUseCase {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  execute(user: RegisterUserRequest) {
    return this.repository.createUser(user.username, user.password, user.about)
  }
}