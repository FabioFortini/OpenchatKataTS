import {User} from "./user";

export interface UserRepository {
  createUser(username: string, password: string, about: string): User | undefined
}