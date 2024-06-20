import { BadGatewayException, BadRequestException, Inject, Injectable } from '@nestjs/common';
import { EmailValidator } from './email-validator/email-validator.service';

@Injectable()
export class ValidatorService {
    constructor(
        @Inject('IEmailValidator')
        private readonly emailValidator: EmailValidator
    ) { }

    email(email: string): boolean {
        if (this.emailValidator.validate(email)) return true;
        throw new BadRequestException("E-mail inválido");
    }

    password(password: string): boolean {
        const min = 6;
        const max = 60;
        const regex = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~])(?=.*[0-9])(?=.*[A-Z]).+$/;

        if (password.length < min)
            throw new BadRequestException(`A senha deve ter no mínimo ${min} caracteres`);
        else if (password.length > max)
            throw new BadRequestException(`A senha deve ter no máximo ${max} caracteres`);

        const validPassword = regex.test(password);
        if (!validPassword)
            throw new BadRequestException("A senha deve conter no mínimo uma letra maiúscula, um número e um caracter especial");

        return true;
    }
}
