import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
    IsBoolean,
    IsDefined,
    IsNumber,
    IsOptional,
    IsString,
    Length,
} from 'class-validator';
import {
    TITLE_MAX_LENGTH,
    TITLE_MIN_LENGTH,
} from 'src/shared/constants/validator.constants';

export class CreateTaskDto {
    @ApiProperty({
        type: 'string',
        description: 'Título da tarefa',
    })
    @IsDefined({ message: 'Título é obrigatório' })
    @Length(TITLE_MIN_LENGTH, TITLE_MAX_LENGTH, {
        message: `Título deve ter no mínimo ${TITLE_MIN_LENGTH} e no máximo ${TITLE_MAX_LENGTH} caracteres`,
    })
    @Transform(({ value }) => value?.toString().trim().toLowerCase())
    title: string;

    @ApiProperty({
        type: 'string',
        description: 'Descrição da tarefa',
        required: false,
    })
    @IsOptional()
    @Transform(({ value }) => value?.toString().trim().toLowerCase())
    description?: string;

    @ApiProperty({
        type: 'boolean',
        description: 'Finalizada',
        required: false,
    })
    @IsOptional()
    @IsBoolean({ message: 'Finalizada deve ser um booleano' })
    finished?: boolean;

    @IsOptional()
    @IsNumber(
        { allowInfinity: false },
        { message: 'ID do usuário deve ser um número' },
    )
    userId?: number;
}
