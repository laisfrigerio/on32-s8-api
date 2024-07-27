import { Injectable } from '@nestjs/common';
import { Address } from 'src/address/address.entity';
import { User } from './user.entity';
import { UserValidator } from './user.validator';
import { ViaCepService } from '../third-party/via-cep/via-cep.service';

@Injectable()
export class UserService {
  private users: User[] = [];

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
    }

    const user = new User(
      name,
      email,
      password,
      cpf,
      `${this.users.length + 1}`,
      address,
    );
    this.users.push(user);
    return user;
  }

  updateUser(
    id: string,
    name: string,
    email: string,
    password: string,
    cpf: string,
  ): User {
    UserValidator.verifyEmail(email);
    UserValidator.verifyPassword(password);
    UserValidator.checkEmailAlreadyInUse(this.users, email);
    UserValidator.checkCpfAlreadyInUse(this.users, cpf);
    UserValidator.verifyCpf(cpf);

    const user = this.users.find((user) => user.id === id);

    if (user) {
      user.name = name;
      user.email = email;
      user.password = password;
      user.cpf = cpf;
    }

    return user;
  }

  deleteUser(id: string): void {
    this.users = this.users.filter((user) => user.id !== id);
  }

  getUserById(id: string): User {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  listUsers(): User[] {
    return this.users;
  }
}
