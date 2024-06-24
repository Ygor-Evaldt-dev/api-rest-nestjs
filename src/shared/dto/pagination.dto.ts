import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class PaginationDto {
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    page?: number = 0;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    take?: number = 10;
}
