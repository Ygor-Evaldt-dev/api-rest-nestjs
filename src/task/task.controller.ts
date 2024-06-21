import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Request, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FilterTasksDto } from './dto/filter-task.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Post()
    async create(
        @Body() createTaskDto: CreateTaskDto,
        @Request() req: any
    ) {
        await this.taskService.create({
            ...createTaskDto, userId: req.user?.sub
        });
    }

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

    @Delete(':id')
    async remove(@Param('id') id: string) {
        await this.taskService.remove(+id);
    }
}
