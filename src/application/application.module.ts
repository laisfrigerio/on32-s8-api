import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { DomainModule } from '../domain/domain.module';

@Module({
  imports: [DomainModule], // Importa o módulo de domínio
  controllers: [UserController],
  providers: [],
})
export class ApplicationModule {}
