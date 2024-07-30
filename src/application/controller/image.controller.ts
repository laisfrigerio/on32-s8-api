import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ImageService } from '../../domain/service/image.service';
import { UserService } from '../../domain/service/user.service';
import { CreateImageDto } from '../dto/image.dto';

@Controller('images')
export class ImageController {
  constructor(
    private readonly imageService: ImageService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async createImage(
    @Body()
    createImageDto: CreateImageDto,
  ) {
    try {
      const user = await this.userService.getUserById(createImageDto.userId);
      return this.imageService.createImage(
        createImageDto.name,
        createImageDto.path,
        user,
      );
    } catch (error) {
      throw new BadRequestException({ error: error.message });
    }
  }

  @Get(':userId')
  getImagesByUserId(@Param('userId') userId: string) {
    try {
      return this.imageService.getImagesByUserId(userId);
    } catch (error) {
      throw new NotFoundException({ error: error.message });
    }
  }

  @Delete(':id')
  deleteImage(@Param('id') id: string) {
    return this.imageService.deleteImage(id);
  }
}
