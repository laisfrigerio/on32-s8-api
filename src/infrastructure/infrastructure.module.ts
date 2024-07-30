import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import { ImageRepository } from './repository/image.repository';
import { Image } from '../domain/entity/image.entity';
import { User } from '../domain/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Image])], // Configura o TypeORM para usar as entidades necessárias
  providers: [
    UserRepository,
    { provide: 'IUserRepository', useClass: UserRepository }, // Implementação da interface do domínio
    ImageRepository,
    { provide: 'IImageRepository', useClass: ImageRepository },
  ],
  exports: ['IUserRepository', 'IImageRepository'], // Exporta o token para outros módulos
})
export class InfrastructureModule {}
