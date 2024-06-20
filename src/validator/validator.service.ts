import { BadGatewayException, BadRequestException, Inject, Injectable } from '@nestjs/common';
import { cleanDto } from 'src/shared/utils/clean-dto';
import { EmailValidator } from './email-validator/email-validator.service';
import {
    EMAIL_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    PASSWORD_MAX_LENGTH,
    PHONE_LENGTH,
    NAME_MIN_LENGTH,
    NAME_MAX_LENGTH
} from './validator.constants';

@Injectable()
export class ValidatorService {
    constructor(
        @Inject('IEmailValidator')
        private readonly emailValidator: EmailValidator
    ) { }

    dto<T>(dto: T): T {
        const validatedDto = { ...dto }

        const keys = Object.keys(dto);
        keys.forEach(key => {
            if (dto[key])
                validatedDto[key] = this[key](dto[key])
        });

        return cleanDto(validatedDto);
    }

    email(email: string): string {
        if (email.length > EMAIL_MAX_LENGTH)
            throw new BadRequestException(`E-mail deve ter no máximo ${EMAIL_MAX_LENGTH} caracteres`);
        else if (!this.emailValidator.validate(email))
            throw new BadRequestException("E-mail inválido");

        return email.trim().toLowerCase();
    }

    password(password?: string): string {
        const validPasswordRegex = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~])(?=.*[0-9])(?=.*[A-Z]).+$/;
        const whiteSpaceRegex = /\s/;

        if (password.length < PASSWORD_MIN_LENGTH)
            throw new BadRequestException(`A senha deve ter no mínimo ${PASSWORD_MIN_LENGTH} caracteres`);
        else if (password.length > PASSWORD_MAX_LENGTH)
            throw new BadRequestException(`A senha deve ter no máximo ${PASSWORD_MAX_LENGTH} caracteres`);
        else if (whiteSpaceRegex.test(password))
            throw new BadRequestException("A senha não deve conter espaços em branco");
        else if (!validPasswordRegex.test(password))
            throw new BadRequestException("A senha deve conter no mínimo uma letra maiúscula, um número e um caracter especial");

        return password.trim();
    }

    phone(phone: string): string {
        const digits = phone.split("");

        if (digits.length !== PHONE_LENGTH)
            throw new BadRequestException(`Telefone deve ter ${PHONE_LENGTH} dígitos`);

        const numbers = digits.filter(digit => !isNaN(parseInt(digit)));
        if (numbers.length !== PHONE_LENGTH)
            throw new BadRequestException("Telefone inválido");

        return numbers.join("");
    }

    name(name: string): string {
        const invalidNameRegex = /[^a-zA-Z\s]/;

        if (name.length < NAME_MIN_LENGTH)
            throw new BadRequestException(`Nome deve ter no mínimo ${NAME_MIN_LENGTH} caracteres`);
        else if (name.length > NAME_MAX_LENGTH)
            throw new BadRequestException(`Nome deve ter no máximo ${NAME_MAX_LENGTH} caracteres`);
        else if (invalidNameRegex.test(name))
            throw new BadRequestException("Nome não deve conter números ou caracteres especiais");

        return name.trim().toLowerCase();
    }
}
