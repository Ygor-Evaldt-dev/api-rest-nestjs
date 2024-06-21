import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Request, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FilterTasksDto } from './dto/filter-task.dto';
import { PaginationDto } from './dto/pagination.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @ApiOperation({ summary: 'Cadastrar tarefa' })
    @Post()
    async create(
        @Body() createTaskDto: CreateTaskDto,
        @Request() req: any
    ) {
        await this.taskService.create({
            ...createTaskDto, userId: req.user?.sub
        });
    }

    @ApiOperation({ summary: 'Buscar tarefas' })
    @Get(':page/:take')
    async findAll(
        @Param() { page, take }: PaginationDto,
        @Request() req: any
    ) {
        return await this.taskService.findAll({
            page,
            take,
            userId: req.user?.sub
        });
    }

    @ApiOperation({ summary: 'Filtrar tarefas' })
    @Get('filter/:page/:take')
    @UsePipes(new ValidationPipe({ transform: true }))
    async filter(
        @Query() { id, title, finished }: FilterTasksDto,
        @Param() { page, take }: PaginationDto,
        @Request() req: any,
    ) {
        return await this.taskService.filter({
            page,
            take,
            userId: req.user?.sub,
            id,
            title,
            finished
        });
    }

    @ApiOperation({ summary: 'Atualizar tarefa' })
    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateTaskDto: UpdateTaskDto,
        @Request() req: any
    ) {
        await this.taskService.update(+id, {
            ...updateTaskDto,
            userId: req.user?.sub
        });
    }

    @ApiOperation({ summary: 'Excluir tarefas' })
    @Delete(':id')
    async remove(@Param('id') id: string) {
        await this.taskService.remove(+id);
    }
}
