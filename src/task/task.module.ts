import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaService } from 'src/database/prisma.service';
import { PrismaRepository } from './repository/prisma.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [TaskController],
    providers: [
        PrismaService,
        { provide: 'ITaskRepository', useClass: PrismaRepository },
        TaskService
    ],
})
export class TaskModule { }
