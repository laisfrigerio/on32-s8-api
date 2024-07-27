import { ViaCEPAddress } from './via-cep.entity';
import { Address } from '../../address/address.entity';

export class ViaCepadapter {
  static convertViaCEPAddress(address: ViaCEPAddress): Address {
    return {
      zipCode: address.cep,
      street: address.logradouro,
      complement: address.complemento,
      neighborhood: address.bairro,
      city: address.localidade,
      state: address.uf,
    };
  }
}
