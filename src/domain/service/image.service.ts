import { Injectable, Inject } from '@nestjs/common';
import { Image } from '../entity/image.entity';
import { User } from '../entity/user.entity';
import { IImageRepository } from '../interface/image.interface';

@Injectable()
export class ImageService {
  constructor(
    @Inject('IImageRepository')
    private readonly imageRepository: IImageRepository,
  ) {}

  async createImage(name: string, path: string, user: User): Promise<Image> {
    const image = new Image(name, path, user);
    return await this.imageRepository.save(image);
  }

  async deleteImage(id: string): Promise<boolean> {
    return await this.imageRepository.delete(id);
  }

  async getImagesByUserId(userId: string): Promise<Image[]> {
    return await this.imageRepository.findAllByUserId(userId);
  }
}
