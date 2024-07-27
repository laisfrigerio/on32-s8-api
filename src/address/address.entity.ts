import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public street: string;

  @Column({ nullable: true })
  public complement?: string;

  @Column()
  public neighborhood: string;

  @Column()
  public city: string;

  @Column()
  public state: string;

  @Column()
  public zipCode: string;

  constructor(
    zipCode: string,
    street: string,
    neighborhood: string,
    city: string,
    state: string,
    complement?: string,
    id?: string,
  ) {
    this.zipCode = zipCode;
    this.street = street;
    this.neighborhood = neighborhood;
    this.city = city;
    this.state = state;

    if (complement) {
      this.complement = complement;
    }

    if (id) {
      this.id = id;
    }
  }
}
