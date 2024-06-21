import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ITaskRepository } from './repository/task.repository.interface';
import { Filter } from './types/filter.type';
import { FindAll } from './types/find-all.type';

@Injectable()
export class TaskService {
    constructor(
        @Inject('ITaskRepository')
        private readonly taskRepository: ITaskRepository
    ) { }

    async create(createTaskDto: CreateTaskDto) {
        await this.taskRepository.create(createTaskDto);
    }

    async findAll({
        page,
        take,
        userId
    }: FindAll) {
        return await this.taskRepository.findMany({
            take,
            skip: page * take,
            userId
        });
    }

    async findUnique(id: number) {
        return await this.taskRepository.findUnique(id);
    }

    async filter({
        page,
        take,
        userId,
        id,
        title,
        finished
    }: Filter) {
        return await this.taskRepository.findMany({
            skip: (page * take),
            take,
            userId,
            id,
            title,
            finished
        });
    }

    async update(id: number, updateTaskDto: UpdateTaskDto) {
        await this.taskRepository.update(id, updateTaskDto);
    }

    async remove(id: number) {
        await this.taskRepository.delete(id);
    }
}
