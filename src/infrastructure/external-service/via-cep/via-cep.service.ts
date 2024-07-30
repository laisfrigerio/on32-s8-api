import fetch from 'node-fetch';
import { ViaCepValidator } from './via-cep.validator';
import { ViaCepadapter } from './via-cep.adapter';
import { Address } from '../../../domain/entity/address.entity';

export class ViaCepService {
  public static ERROR_CEP_NOT_FOUND: string = 'ZipCode not found';
  public static ERROR_UNEXPECTED: string = 'Error in request to ViaCEP';

  static async getAddress(zipCode: string): Promise<Address> {
    const zipCodeAdapted = zipCode?.toString().replace(/\D+/g, '');
    ViaCepValidator.cepHasMinCharacters(zipCodeAdapted);

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${zipCodeAdapted}/json`,
      );

      const data = await response.json();

      if (data?.erro === true) {
        throw data;
      }

      return ViaCepadapter.convertViaCEPAddress(data);
    } catch (error) {
      if (error?.erro === true) {
        throw new Error(this.ERROR_CEP_NOT_FOUND);
      }

      throw new Error(this.ERROR_UNEXPECTED);
    }
  }
}
