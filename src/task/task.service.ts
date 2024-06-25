import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ITaskRepository } from './repository/task.repository.interface';
import { Filter } from './types/filter.type';
import { FindAll } from './types/find-all.type';

@Injectable()
export class TaskService {
    constructor(
        @Inject('ITaskRepository')
        private readonly taskRepository: ITaskRepository,
    ) { }

    async create(createTaskDto: CreateTaskDto) {
        await this.taskRepository.create(createTaskDto);
    }

    async findAll({ page, take, userId }: FindAll) {
        const response = await this.taskRepository.findMany({
            take,
            skip: page * take,
            userId,
        });
        if (response === null)
            throw new NotFoundException('Nenhuma tarefa cadastrada');

        const { registers, total } = response;
        return {
            total,
            registers,
            page,
            take,
        };
    }

    async findUnique(id: number) {
        const task = await this.taskRepository.findUnique(id);
        if (!task) throw new NotFoundException('Tarefa não cadastrada');
    }

    async filter({ page, take, userId, id, title, finished }: Filter) {
        const response = await this.taskRepository.findMany({
            skip: page * take,
            take,
            userId,
            id,
            title,
            finished,
        });

        if (response === null)
            throw new NotFoundException('Nenhuma tarefa encontrada');

        const { registers, total } = response;
        return {
            total,
            registers,
            page,
            take,
        };
    }

    async update(id: number, updateTaskDto: UpdateTaskDto) {
        await this.findUnique(id);
        await this.taskRepository.update(id, updateTaskDto);
    }

    async remove(id: number) {
        await this.findUnique(id);
        await this.taskRepository.delete(id);
    }
}
