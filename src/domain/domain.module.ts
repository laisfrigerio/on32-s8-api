import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './service/user.service';
import { User } from './entity/user.entity';
import { Address } from './entity/address.entity';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule, TypeOrmModule.forFeature([User, Address])],
  providers: [UserService],
  exports: [UserService],
})
export class DomainModule {}
