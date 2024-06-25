import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

export class SingInDto {
    @ApiProperty({
        type: 'string',
        description: 'E-mail do usuário cadastrado',
        required: true,
    })
    @IsDefined({ message: 'Informe o e-mail cadastrado' })
    email: string;

    @ApiProperty({
        type: 'string',
        description: 'Senha do usuário cadastrado',
        required: true,
    })
    @IsDefined({ message: 'Informe a senha' })
    password: string;
}
