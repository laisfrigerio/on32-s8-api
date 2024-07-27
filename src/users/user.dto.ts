export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  cpf: string;
  zipCode?: string;
}

export class UpdateUserDto {
  id: string;
  name: string;
  email: string;
  password: string;
  cpf: string;
  zipCode?: string;
}
