import { Injectable, Inject } from '@nestjs/common';
import { Address } from '../entity/address.entity';
import { User } from '../entity/user.entity';
import { UserValidator } from '../validator/user.validator';
import { ViaCepService } from '../../infrastructure/external-service/via-cep/via-cep.service';
import { IUserRepository } from '../interface/user.interface';

@Injectable()
export class UserService {
  private users: User[] = [];

  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

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

    const user = new User(name, email, password, cpf);
    user.address = address;
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

  async deleteUser(id: string): Promise<boolean> {
    return await this.userRepository.delete(id);
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
