import { UserService } from './user.service';
import { ViaCepService } from '../third-party/via-cep/via-cep.service';
import { UserRepository } from './user.repository';

jest.mock('../third-party/via-cep/via-cep.service');

describe('Create User', () => {
  let userRepository: UserRepository;
  let userService: UserService;

  beforeEach(() => {
    userRepository = {
      save: jest.fn(),
    } as unknown as UserRepository;

    userService = new UserService(userRepository);
  });

  test('Deve criar um usuário com sucesso sem endereço', async () => {
    const name = 'Lais';
    const email = 'lais.frigerio@gmail.com';
    const password = 'T3st@123!';
    const cpf = '169.594.590-52';

    (userRepository.save as jest.Mock).mockResolvedValue({
      id: '1',
      name,
      email,
      password,
      cpf,
    });

    // const userService = new UserService();
    const esperado = await userService.createUser(name, email, password, cpf);
    expect(esperado).toEqual(
      expect.objectContaining({ name, email, cpf, password, id: '1' }),
    );
  });

  test('Deve criar um usuário com sucesso com endereço', async () => {
    const name = 'Lais';
    const email = 'lais.frigerio@gmail.com';
    const password = 'T3st@123!';
    const cpf = '169.594.590-52';
    const zipCode = '83314-010';

    const address = {
      zipCode,
      complement: '',
      street: 'Rua das Flores',
      neighborhood: 'Centro',
      city: 'Curitiba',
      state: 'PR',
    };

    const esperado = {
      id: '1',
      name,
      email,
      password,
      cpf,
      address,
    };

    (ViaCepService.getAddress as jest.Mock).mockResolvedValue(address);
    (userRepository.save as jest.Mock).mockResolvedValue({
      id: '1',
      name,
      email,
      password,
      cpf,
      address,
    });

    const retornado = await userService.createUser(
      name,
      email,
      password,
      cpf,
      zipCode,
    );

    expect(retornado).toEqual(expect.objectContaining(esperado));
  });

  test('Deve retornar erro ao criar um usuário com senha inválida', async () => {
    const name = 'Lais';
    const email = 'lais.frigerio@gmail.com';
    const password = 't3st@123!';
    const cpf = '457.153.530-92';

    await expect(
      userService.createUser(name, email, password, cpf),
    ).rejects.toThrow('Invalid password');
  });
});
