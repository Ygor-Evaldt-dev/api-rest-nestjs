import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaService } from 'src/database/prisma.service';
import { PrismaRepository } from './repository/prisma.repository';

@Module({
    controllers: [TaskController],
    providers: [
        TaskService,
        PrismaService,
        { provide: 'ITaskRepository', useClass: PrismaRepository }
    ],
})
export class TaskModule { }
