import { Address } from 'src/address/address.entity';

export class User {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public cpf: string,
    public id?: string,
    public address?: Address,
  ) {}
}
