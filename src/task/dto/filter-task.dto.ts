import { IsOptional, IsString, IsBoolean, IsNumber } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class FilterTasksDto {
    @IsOptional()
    @IsNumber({}, { message: 'id deve ser um número' })
    @Type(() => Number)
    id?: number;

    @IsOptional()
    @IsString({ message: 'title deve ser um texto' })
    @Transform(({ value }) => value.toString().trim().toLowerCase())
    title?: string;

    @IsOptional()
    @IsBoolean({ message: 'finished deve ser um valor booleano' })
    @Transform(({ value }) =>
        value === 'true' ? true : value === 'false' ? false : value,
    )
    finished?: boolean;
}
