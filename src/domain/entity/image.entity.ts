import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column()
  public path: string;

  @ManyToOne(() => User, (user) => user.images)
  @JoinColumn({ name: 'user_id' })
  public user: User;

  constructor(name: string, path: string, user: User, id?: string) {
    this.name = name;
    this.path = path;
    this.user = user;
    if (!id) {
      this.id = id;
    }
  }
}
