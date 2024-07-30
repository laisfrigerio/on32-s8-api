import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository } from 'src/domain/interface/user.interface';
import { User } from '../../domain/entity/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    // SELECT * FROM users;
    return await this.userRepository.find({ relations: ['address', 'images'] });
  }

  async findById(id: string): Promise<User | null> {
    // SELECT * FROM users WHERE id = ?;
    return this.userRepository.findOne({
      where: { id },
      relations: ['address', 'images'],
    });
  }

  async save(user: User): Promise<User> {
    // INSERT INTO users (name, email, password, cpf) VALUES (?, ?, ?, ?);
    return await this.userRepository.save(user);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return result.affected > 0;
  }
}
