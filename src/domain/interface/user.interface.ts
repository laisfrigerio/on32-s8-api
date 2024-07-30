import { User } from '../entity/user.entity';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  save(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  delete(id: string): Promise<boolean>;
}
