import { PrismaService } from 'src/database/prisma.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Task } from '../entities/task.entity';
import { ITaskRepository } from './task.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaRepository implements ITaskRepository {
    constructor(private readonly prisma: PrismaService) {}

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

    async findUnique(id: number): Promise<Task | null> {
        return await this.prisma.task.findUnique({
            where: { id },
        });
    }

    async findMany(params: {
        userId: number;
        id?: number;
        title?: string;
        finished?: boolean;
        skip: number;
        take: number;
    }): Promise<Task[] | null> {
        const { userId, id, title, finished, skip, take } = params;

        return await this.prisma.task.findMany({
            skip,
            take,
            where: {
                userId,
                id,
                title: title ? { startsWith: `%${title}` } : title,
                finished,
            },
        });
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
}
