import {
    IsEmail,
    IsNumber,
    IsOptional,
    IsPhoneNumber,
    IsString,
    IsStrongPassword,
    Length,
    MaxLength,
    MinLength,
} from 'class-validator';
import {
    EMAIL_MAX_LENGTH,
    NAME_MAX_LENGTH,
    NAME_MIN_LENGTH,
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_SYMBOLS,
    PASSWORD_MIN_LENGTH,
    PASSWORD_MIN_NUMBER,
    PASSWORD_MIN_UPPER,
    PHONE_LENGTH,
} from 'src/shared/validator.constants';

export class CreateUserDto {
    @IsOptional()
    @IsNumber({ allowInfinity: false }, { message: 'ID deve ser um número' })
    id?: number;

    @IsString({ message: 'E-mail deve ser um texto' })
    @IsEmail({}, { message: 'Email inválido' })
    @MaxLength(EMAIL_MAX_LENGTH, {
        message: `E-mail deve ter no máximo ${EMAIL_MAX_LENGTH} caracteres`,
    })
    email: string;

    @IsString({ message: 'Senha deve ser um texto' })
    @IsStrongPassword(
        {
            minUppercase: PASSWORD_MIN_UPPER,
            minNumbers: PASSWORD_MIN_NUMBER,
            minSymbols: PASSWORD_MIN_SYMBOLS,
        },
        {
            message:
                'Senha deve conter no mínimo uma letra maiúscula, um número e um caracter especial',
        },
    )
    @Length(PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH, {
        message: `Senha deve ter entre ${PASSWORD_MIN_LENGTH} e ${PASSWORD_MAX_LENGTH} caracteres`,
    })
    password: string;

    @IsOptional()
    @IsString({ message: 'Nome deve ser um texto' })
    @Length(NAME_MIN_LENGTH, NAME_MAX_LENGTH, {
        message: `Nome deve ter no mínimo ${NAME_MIN_LENGTH} e no máximo ${NAME_MAX_LENGTH} caracteres`,
    })
    name?: string;

    @IsOptional()
    @IsString({ message: 'Telefone deve ser um texto' })
    @IsPhoneNumber('BR', { message: 'Telefone inválido' })
    @Length(PHONE_LENGTH, PHONE_LENGTH, {
        message: `Telefone deve ter ${PHONE_LENGTH} dígitos`,
    })
    phone?: string;
}
