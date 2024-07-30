import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import { User } from '../domain/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Configura o TypeORM para usar as entidades necessárias
  providers: [
    UserRepository,
    { provide: 'IUserRepository', useClass: UserRepository }, // Implementação da interface do domínio
  ],
  exports: ['IUserRepository'], // Exporta o token para outros módulos
})
export class InfrastructureModule {}
