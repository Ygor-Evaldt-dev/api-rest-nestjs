import { IsOptional, IsString, IsBoolean, IsNumber } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class FilterTasksDto {
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    id?: number;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim().toLowerCase())
    title?: string;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) =>
        value === 'true' ? true : value === 'false' ? false : value,
    )
    finished?: boolean;
}
