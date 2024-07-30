import { Module } from '@nestjs/common';
// import { UserModule } from './users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './domain/entity/address.entity';
import { User } from './domain/entity/user.entity';
import { ApplicationModule } from './application/application.module';
import { DomainModule } from './domain/domain.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'users',
      username: 'lais',
      password: 'Users123',
      entities: [User, Address],
      synchronize: true,
    }),
    ApplicationModule,
    DomainModule,
    InfrastructureModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
