import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
    IsDefined,
    IsEmail,
    IsOptional,
    IsPhoneNumber,
    IsString,
    IsStrongPassword,
    Length,
    MaxLength,
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
} from 'src/shared/constants/validator.constants';

export class CreateUserDto {
    @ApiProperty({
        type: 'string',
        description: 'E-mail válido',
        required: true,
    })
    @IsDefined({ message: 'E-mail é obrigatório' })
    @IsEmail({}, { message: 'E-mail inválido' })
    @MaxLength(EMAIL_MAX_LENGTH, {
        message: `E-mail deve ter no máximo ${EMAIL_MAX_LENGTH} caracteres`,
    })
    @Transform(({ value }) => value?.toString().trim().toLowerCase())
    email: string;

    @ApiProperty({
        type: 'string',
        description: 'Senha forte',
        required: true,
    })
    @IsDefined({ message: 'Senha é obrigatória' })
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
    @Transform(({ value }) => value?.toString().trim())
    password: string;

    @ApiProperty({
        type: 'string',
        description: 'Nome do usuário',
        required: false,
    })
    @IsOptional()
    @Length(NAME_MIN_LENGTH, NAME_MAX_LENGTH, {
        message: `Nome deve ter no mínimo ${NAME_MIN_LENGTH} e no máximo ${NAME_MAX_LENGTH} caracteres`,
    })
    @Transform(({ value }) => value?.toString().trim().toLowerCase())
    name?: string;

    @ApiProperty({
        type: 'string',
        description: 'Telefone válido',
        required: false,
    })
    @IsOptional()
    @IsPhoneNumber('BR', { message: 'Telefone inválido' })
    @Length(PHONE_LENGTH, PHONE_LENGTH, {
        message: `Telefone deve ter ${PHONE_LENGTH} dígitos`,
    })
    @Transform(({ value }) => value?.toString().trim())
    phone?: string;
}
