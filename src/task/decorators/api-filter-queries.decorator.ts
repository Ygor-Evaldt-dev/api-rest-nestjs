import { applyDecorators } from "@nestjs/common";
import { ApiQuery } from "@nestjs/swagger";

export function ApiFilterQueries() {
    return applyDecorators(
        ApiQuery({ name: 'id', description: 'ID da tarefa', type: 'number', required: false }),
        ApiQuery({ name: 'title', description: 'Título da tarefa', type: 'string', required: false }),
        ApiQuery({ name: 'finished', description: 'Tarefa finalizada', type: 'boolean', required: false }),
    );
}