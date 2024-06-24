import { applyDecorators } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';

export function ApiPagination() {
    return applyDecorators(
        ApiParam({
            name: 'page',
            type: 'number',
            description: 'Adicione uma página a partir de zero',
            required: true,
        }),
        ApiParam({
            name: 'take',
            type: 'number',
            description: 'Quantidade de registros por página',
            required: true,
        }),
    );
}
