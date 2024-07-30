import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './service/user.service';
import { ImageService } from './service/image.service';
import { User } from './entity/user.entity';
import { Address } from './entity/address.entity';
import { Image } from './entity/image.entity';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';

@Module({
  imports: [
    InfrastructureModule,
    TypeOrmModule.forFeature([User, Image, Address]),
  ],
  providers: [UserService, ImageService],
  exports: [UserService, ImageService],
})
export class DomainModule {}
