import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IImageRepository } from 'src/domain/interface/image.interface';
import { Image } from '../../domain/entity/image.entity';

@Injectable()
export class ImageRepository implements IImageRepository {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async findAllByUserId(userId: string): Promise<Image[]> {
    // SELECT * FROM images WHERE user_id = ?;
    return this.imageRepository.find({
      where: { user: { id: userId } },
      relations: ['user'], // Certifique-se de carregar a relação
    });
  }

  async save(image: Image): Promise<Image> {
    // INSERT INTO images (name, email, password, cpf) VALUES (?, ?, ?, ?);
    return await this.imageRepository.save(image);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.imageRepository.delete(id);
    return result.affected > 0;
  }
}
