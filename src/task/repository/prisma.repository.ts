import { PrismaService } from 'src/database/prisma.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Task as TaskEntity } from '../entities/task.entity';
import { ITaskRepository } from './task.repository.interface';
import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { findIndex } from 'rxjs';
import { capitalize } from 'src/shared/utils/capitalize.util';

@Injectable()
export class PrismaRepository implements ITaskRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create({
        title,
        description,
        finished,
        userId,
    }: CreateTaskDto): Promise<void> {
        await this.prisma.task.create({
            data: {
                title,
                description,
                finished,
                userId,
            },
        });
    }

    async findUnique(id: number): Promise<TaskEntity | null> {
        const task = await this.prisma.task.findUnique({
            where: { id },
        });

        return this.fromDatabase(task);
    }

    async findMany(params: {
        userId: number;
        id?: number;
        title?: string;
        finished?: boolean;
        skip: number;
        take: number;
    }): Promise<{ registers: TaskEntity[]; total: number } | null> {
        const { userId, id, title, finished, skip, take } = params;

        const [registers, total] = await Promise.all([
            this.prisma.task.findMany({
                skip,
                take,
                where: {
                    userId,
                    id,
                    title: title ? { startsWith: `%${title}` } : title,
                    finished,
                },
            }),
            this.prisma.task.count(),
        ]);
        if (registers.length === 0) return null;

        return {
            registers: registers.map(register => this.fromDatabase(register)),
            total
        };
    }

    async update(id: number, dto: UpdateTaskDto): Promise<void> {
        await this.prisma.task.update({
            where: { id },
            data: dto,
        });
    }

    async delete(id: number): Promise<void> {
        await this.prisma.task.delete({
            where: { id },
        });
    }

    private fromDatabase({
        id,
        title,
        description,
        finished
    }: Task): TaskEntity {
        return new TaskEntity(id, capitalize(title), description, finished);
    }
}
