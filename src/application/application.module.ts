import { Module } from '@nestjs/common';
import { ImageController } from './controller/image.controller';
import { UserController } from './controller/user.controller';
import { DomainModule } from '../domain/domain.module';

@Module({
  imports: [DomainModule], // Importa o módulo de domínio
  controllers: [UserController, ImageController],
  providers: [],
})
export class ApplicationModule {}
