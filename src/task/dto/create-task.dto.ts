import { Transform } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional, IsString, Length } from "class-validator";
import { TITLE_MAX_LENGTH, TITLE_MIN_LENGTH } from "src/shared/constants/validator.constants";

export class CreateTaskDto {
    @IsString({ message: 'Título deve ser um texto' })
    @Length(TITLE_MIN_LENGTH, TITLE_MAX_LENGTH, { message: `Título deve ter no mínimo ${TITLE_MIN_LENGTH} e no máximo ${TITLE_MIN_LENGTH} caracteres` })
    @Transform(({ value }) => value?.trim().toLowerCase())
    title: string;

    @IsOptional()
    @IsString({ message: 'Descrição deve ser um texto' })
    @Transform(({ value }) => value?.trim().toLowerCase())
    description?: string;

    @IsOptional()
    @IsBoolean({ message: 'Finalizada deve ser um booleano' })
    finished: boolean

    @IsNumber({ allowInfinity: false }, { message: 'ID do usuário deve ser um número' })
    userId: number
}
