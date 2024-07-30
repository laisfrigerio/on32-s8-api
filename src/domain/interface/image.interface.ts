import { Image } from '../entity/image.entity';

export interface IImageRepository {
  save(image: Image): Promise<Image>;
  findAllByUserId(userId: string): Promise<Image[]>;
  delete(id: string): Promise<boolean>;
}
