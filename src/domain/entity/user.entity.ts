import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Address } from './address.entity';
import { Image } from './image.entity';

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

  @OneToOne(() => Address, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'address_id' })
  public address: Address;

  @OneToMany(() => Image, (image) => image.user)
  @JoinColumn()
  public images?: Image[];

  constructor(
    name: string,
    email: string,
    password: string,
    cpf: string,
    id?: string,
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.cpf = cpf;

    if (!id) {
      this.id = id;
    }
  }
}
