import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    // SELECT * FROM users;
    return await this.userRepository.find({ relations: ['address'] });
  }

  async findById(id: string): Promise<User | null> {
    // SELECT * FROM users WHERE id = ?;
    return this.userRepository.findOne({
      where: { id },
      relations: ['address'],
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
