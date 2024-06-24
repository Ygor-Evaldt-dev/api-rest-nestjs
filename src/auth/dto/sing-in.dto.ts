import { ApiProperty } from '@nestjs/swagger';

export class SingInDto {
    @ApiProperty({
        type: 'string',
        description: 'E-mail do usuário cadastrado',
        required: true,
    })
    email: string;

    @ApiProperty({
        type: 'string',
        description: 'Senha do usuário cadastrado',
        required: true,
    })
    password: string;
}
