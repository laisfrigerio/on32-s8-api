import { ViaCEPAddress } from './via-cep.entity';
import { Address } from '../../address/address.entity';

export class ViaCepadapter {
  static convertViaCEPAddress(address: ViaCEPAddress): Address {
    return new Address(
      address.cep,
      address.logradouro,
      address.bairro,
      address.localidade,
      address.uf,
      address.complemento,
    );
  }
}
