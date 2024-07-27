import { User } from './user.entity';

export class UserValidator {
  public static ERROR_EMAIL_INVALID = 'Invalid email';
  public static ERROR_PASSWORD_INVALID = 'Invalid password';
  public static ERROR_EMAIL_ALREADY_IN_USE = 'Email already in use';
  public static ERROR_CPF_ALREADY_IN_USE = 'CPF already in use';

  static verifyEmail(email: string): void {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error(this.ERROR_EMAIL_INVALID);
    }
  }

  static verifyPassword(password: string): boolean {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!regex.test(password)) {
      throw new Error(this.ERROR_PASSWORD_INVALID);
    }

    return true;
  }

  static checkEmailAlreadyInUse(users: User[], email: string): boolean {
    if (users.some((user) => user.email === email)) {
      throw new Error(this.ERROR_EMAIL_ALREADY_IN_USE);
    }

    return true;
  }

  static checkCpfAlreadyInUse(users: User[], cpf: string): boolean {
    if (users.some((user) => user.cpf === cpf)) {
      throw new Error(this.ERROR_CPF_ALREADY_IN_USE);
    }

    return true;
  }

  static verifyCpf(cpf: string): boolean {
    if (!/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(cpf)) {
      throw new Error('Invalid CPF');
    }

    const cpfWithoutDots = cpf.replace(/[^\d]+/g, '');

    if (cpfWithoutDots.length !== 11) {
      throw new Error('Invalid CPF');
    }

    if (cpfWithoutDots.length !== 11) {
      throw new Error('Invalid CPF');
    }

    // Elimina CPFs conhecidos que são inválidos
    if (
      cpfWithoutDots === '00000000000' ||
      cpfWithoutDots === '11111111111' ||
      cpfWithoutDots === '22222222222' ||
      cpfWithoutDots === '33333333333' ||
      cpfWithoutDots === '44444444444' ||
      cpfWithoutDots === '55555555555' ||
      cpfWithoutDots === '66666666666' ||
      cpfWithoutDots === '77777777777' ||
      cpfWithoutDots === '88888888888' ||
      cpfWithoutDots === '99999999999'
    ) {
      throw new Error('Invalid CPF');
    }

    let sum = 0;
    let remainder: number;

    // Calcula o primeiro dígito verificador
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpfWithoutDots.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cpfWithoutDots.substring(9, 10))) {
      throw new Error('Invalid CPF');
    }

    sum = 0;

    // Calcula o segundo dígito verificador
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpfWithoutDots.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cpfWithoutDots.substring(10, 11))) {
      throw new Error('Invalid CPF');
    }

    return true;
  }
}
