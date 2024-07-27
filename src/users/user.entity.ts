import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from 'src/address/address.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;

  @Column({ unique: true })
  public cpf: string;

  public address: Address;

  constructor(
    name: string,
    email: string,
    password: string,
    cpf: string,
    id?: string,
    address?: Address,
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.cpf = cpf;
    this.id = id;
    this.address = address;
  }
}
