import { Injectable } from '@nestjs/common';
import { Address } from 'src/address/address.entity';
import { User } from './user.entity';
import { UserValidator } from './user.validator';
import { ViaCepService } from '../third-party/via-cep/via-cep.service';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  private users: User[] = [];

  constructor(private readonly userRepository: UserRepository) {}

  async createUser(
    name: string,
    email: string,
    password: string,
    cpf: string,
    zipCode?: string,
  ): Promise<User> {
    UserValidator.verifyEmail(email);
    UserValidator.verifyPassword(password);
    UserValidator.checkEmailAlreadyInUse(this.users, email);
    UserValidator.checkCpfAlreadyInUse(this.users, cpf);
    UserValidator.verifyCpf(cpf);

    let address: Address = null;

    if (zipCode) {
      address = await ViaCepService.getAddress(zipCode);
      console.log(address);
    }

    const user = new User(name, email, password, cpf);
    this.users.push(user);
    return await this.userRepository.save(user);
  }

  async updateUser(
    id: string,
    name: string,
    email: string,
    password: string,
    cpf: string,
  ): Promise<User | null> {
    UserValidator.verifyEmail(email);
    UserValidator.verifyPassword(password);
    UserValidator.checkEmailAlreadyInUse(this.users, email);
    UserValidator.checkCpfAlreadyInUse(this.users, cpf);
    UserValidator.verifyCpf(cpf);

    const user = await this.getUserById(id);

    if (user) {
      user.name = name;
      user.email = email;
      user.password = password;
      user.cpf = cpf;

      return await this.userRepository.save(user);
    }

    return null;
  }

  deleteUser(id: string): void {
    this.users = this.users.filter((user) => user.id !== id);
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async listUsers(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}
